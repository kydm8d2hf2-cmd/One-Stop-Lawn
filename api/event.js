// api/event.js — anonymous analytics collector for One Stop Lawn
//
// Receives a single event name from the client and writes one row to the Supabase
// `events` table. Deliberately minimal: no batching, no queue, no retry, no reads.
//
// Why this file exists at all: the Supabase service role key must never ship inside
// index.html, because anyone can unpack the app bundle and read it. That key can
// delete the whole table. So the client posts here, and this endpoint -- running on
// Vercel where the key lives in an env var -- does the insert server-side.
//
// Privacy: no user IDs, no device IDs, no IP address, no request body beyond the
// event name. Rows cannot be tied to a person or joined to each other. This is what
// keeps the App Store declaration at "not linked to the user / not used for tracking".
//
// Matches api/ask.js and api/rachio.js: ESM, same CORS setup, same checkSecret gate.
import { checkSecret } from "./_lib/checkSecret.js";

// Whitelist. An event name not on this list is dropped without an insert.
// This is the main defence against junk rows -- the endpoint is public, and at 40
// installs a single script pointed at it could bury the real numbers. Adding a new
// event later means adding it here first, on purpose.
const ALLOWED_EVENTS = new Set([
  "onboarding_started",
  "onboarding_completed",
  "explore_started",
  "paywall_shown",
  "explore_expired",
  "trial_started",
  // v1.7 -- AI usage. Photo requests route to Sonnet and text to Haiku, so the split
  // maps directly onto spend. Milestones are per calendar month, matching the tier
  // caps: 15 (Plus), 100 (Premium), 150 (Pro). 25 is the explore-window cap.
  "ai_query_text",
  "ai_query_photo",
  "ai_milestone_1",
  "ai_milestone_5",
  "ai_milestone_15",
  "ai_milestone_25",
  "ai_milestone_50",
  "ai_milestone_75",
  "ai_milestone_100",
  "ai_milestone_150",
  // v1.8 -- paywall clarity. paywall_shown could not tell the post-onboarding upsell
  // apart from the blocking wall at expiry; those are very different signals.
  // paywall_shown is kept one more version so the new data stays comparable.
  "paywall_upsell",
  "paywall_blocking",
  "paywall_dismissed",
  // v1.8 -- ai_query_* only fires on a COMPLETED request, so someone who opens the AI
  // and backs out looked identical to someone who never found it.
  "ai_screen_opened"
]);

// Defensive cap on the two free-text fields. Nothing legitimate approaches this.
function clean(v) {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, 32);
  return s.length ? s : null;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-App-Secret");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  // Same gate as /api/ask and /api/rachio. checkSecret writes its own 403 and returns
  // false; it fails open while APP_SHARED_SECRET is unset on Vercel.
  if (!checkSecret(req, res)) return;

  // ?debug=1 returns what actually happened instead of a bare 204. For your curl test
  // during setup only -- the app never sends it. Leaking nothing sensitive either way,
  // but without it a failed insert is invisible and you would be debugging an empty
  // table with no signal.
  const debug = req.query && (req.query.debug === "1" || req.query.debug === "true");
  const done = (status, payload) =>
    debug ? res.status(200).json({ ok: status === "inserted", status, ...payload })
          : res.status(204).end();

  try {
    const body = req.body || {};
    const event = clean(body.event);

    if (!event || !ALLOWED_EVENTS.has(event)) {
      // Unknown or missing event name. Silently dropped, no insert, no error to the
      // client -- analytics must never surface a problem to the user.
      return done("rejected_event_name", { received: event });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SERVICE_KEY) {
      // Env vars not set yet. Deploy-before-configure stays safe, matching the
      // fail-open spirit of checkSecret.js.
      console.error("[event] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set");
      return done("not_configured", {});
    }

    // Insert via Supabase's PostgREST endpoint. Plain fetch on purpose: no supabase-js,
    // so there is no dependency to install and no package.json needed in the web repo.
    // created_at and day are left to the column defaults -- the client is never trusted
    // with time, which also means a device with a wrong clock cannot skew the data.
    const url = SUPABASE_URL.replace(/\/+$/, "") + "/rest/v1/events";
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_KEY,
        "Authorization": "Bearer " + SERVICE_KEY,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        event: event,
        platform: clean(body.platform),
        app_version: clean(body.app_version)
      })
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("[event] supabase insert failed", r.status, detail);
      return done("insert_failed", { supabase_status: r.status, detail: detail.slice(0, 300) });
    }

    return done("inserted", { event });
  } catch (err) {
    // Never throw, never 500. A broken analytics pipe must not produce anything the
    // client could interpret as a real failure.
    console.error("[event] unexpected error", err && err.message);
    return done("error", { message: err && err.message });
  }
}
