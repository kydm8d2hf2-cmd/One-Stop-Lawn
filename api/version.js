// api/version.js — current app version, per platform.
//
// Why this exists: the app cannot know a newer build shipped without being told, and
// hardcoding "latest" in the app is circular — you would need a new release to tell
// people about the new release.
//
// iOS is now AUTOMATIC. Apple publishes a lookup endpoint returning the version that
// is actually live on the App Store, so this asks Apple rather than trusting a number
// typed here. That fixes a real problem: the number used to be updated when a build
// was SUBMITTED, so users on the previous version were prompted to update to something
// that did not exist yet — tapping Update took them to a store page still showing the
// old build.
//
// Android stays manual: Google publishes no equivalent public endpoint.
//
// TO PUBLISH A NEW ANDROID VERSION: edit LATEST.android below and push, AFTER it is
// live on Play. iOS needs no action at all.

const APPLE_APP_ID = "6779743536";

const LATEST = {
  // Fallback only — used when the Apple lookup fails, times out or returns nothing.
  // Keep it at the last KNOWN-LIVE version. A stale value here means the prompt
  // appears late, which is harmless. A value ahead of the store means prompting for a
  // build nobody can download, which is the failure this file exists to prevent.
  ios: "1.14",
  android: "1.17"
};

// Optional. Absent by design.
//
// Setting MIN makes the prompt NON-DISMISSIBLE for anyone below it — no "Not now".
// Reserve it for a build that is genuinely broken (data loss, an API change that
// leaves old clients unable to work). Do not use it to hurry people onto a release
// that merely adds features: forcing an update on someone whose app works fine can
// strand them on a bad connection or a full device, which is worse than the lag.
//
// When you do need it, set it to the version ABOVE the broken one.
const MIN = null;

// Optional one-line note shown inside the prompt. Normally null — the app has its own
// generic copy, which is the point: it does not need rewriting every release.
const NOTE = "Fixes for adding equipment with a receipt, a Camera button in Wall of Fame, and buttons at the bottom of the screen no longer sitting under the navigation bar.";

// Cached across warm invocations so a burst of launches does not hammer Apple; their
// docs carry a rate-limit note and this is hit on every cold start.
let _cache = { version: null, at: 0 };
const CACHE_MS = 30 * 60 * 1000;

async function appleLiveVersion() {
  const now = Date.now();
  if (_cache.version && (now - _cache.at) < CACHE_MS) return _cache.version;
  try {
    // Two seconds is generous for a cached CDN response, and this must never be the
    // reason an app launch feels slow — every failure path falls back.
    const ctl = new AbortController();
    const timer = setTimeout(function () { ctl.abort(); }, 2000);
    const r = await fetch(
      "https://itunes.apple.com/lookup?id=" + APPLE_APP_ID + "&country=us&t=" + now,
      { signal: ctl.signal }
    );
    clearTimeout(timer);
    if (!r.ok) return null;
    const d = await r.json();
    const v = d && d.results && d.results[0] && d.results[0].version;
    // Must look like a version number. Anything unexpected from Apple falls through to
    // the hardcoded value rather than propagating nonsense to every client.
    if (typeof v === "string" && /^\d+(\.\d+)*$/.test(v)) {
      _cache = { version: v, at: now };
      return v;
    }
    return null;
  } catch (e) {
    // Timeout, network, bad JSON — all handled identically: fall back.
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-App-Secret");
  // Five minutes at the edge: costs nothing at any volume, and a release still reaches
  // everyone the same day.
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).end();

  const live = await appleLiveVersion();

  return res.status(200).json({
    ios: live || LATEST.ios,
    android: LATEST.android,
    min: MIN,
    note: NOTE,
    // Visible in a browser so you can tell at a glance whether the lookup is working or
    // the fallback is carrying it. Costs nothing and saves guessing later.
    iosSource: live ? "appstore" : "fallback"
  });
}
