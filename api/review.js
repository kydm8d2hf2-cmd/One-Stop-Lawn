// api/review.js — server-side validation of the app's access code (reviewer unlock).
// The app POSTs { code }; this compares it to the REVIEW_CODE env var set in Vercel and,
// on an exact match, returns { ok: true, tier: "enterprise" }. The secret code never ships
// in the client bundle. Gated behind the same X-App-Secret check as ask.js. The submitted
// code is never logged.
import { checkSecret } from "./_lib/checkSecret.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-App-Secret");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  // Same shared-secret gate as ask.js. checkSecret writes the 403 itself if missing/wrong.
  if (!checkSecret(req, res)) return;

  try {
    const expected = process.env.REVIEW_CODE || "";
    const body = req.body || {};
    const code = typeof body.code === "string" ? body.code.trim() : "";
    // Require a configured env var AND a non-empty submitted code, so a missing/blank
    // REVIEW_CODE can never accidentally grant access.
    if (expected && code && code === expected) {
      return res.status(200).json({ ok: true, tier: "enterprise" });
    }
    return res.status(200).json({ ok: false });
  } catch (err) {
    return res.status(500).json({ ok: false, error: { message: err.message } });
  }
}
