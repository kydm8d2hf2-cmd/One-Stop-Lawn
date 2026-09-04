// api/version.js — current app version, per platform.
//
// Why this exists: the app cannot know a newer build shipped without being told, and
// hardcoding "latest" in the app is circular — you would need a new release to tell
// people about the new release. This endpoint is the one place that knows, and it is
// editable without shipping anything: change the numbers below, push, and every user
// sees the prompt on their next launch.
//
// Read-only and public by design. It returns no user data and takes no input, so
// unlike /api/event it does not sit behind the shared secret -- a version number is
// not worth gating, and gating it would mean an old build with a rotated secret could
// never be told to update.
//
// TO PUBLISH A NEW VERSION: edit LATEST below and push. That is the whole job.

const LATEST = {
  ios: "1.10",
  android: "1.10"
};

// Optional. Absent by design.
//
// Setting MIN makes the prompt NON-DISMISSIBLE for anyone below it -- no "Not now".
// Reserve it for a build that is genuinely broken (data loss, an API change that
// leaves old clients unable to work). Do not use it to hurry people onto a release
// that merely adds features: forcing an update on someone whose app is working fine
// can strand them on a bad connection or a full device, which is worse than the lag.
//
// When you do need it, set it to the version ABOVE the broken one.
const MIN = null;

// Optional one-line note shown inside the prompt. Normally null -- the app has its own
// generic copy, which is the point: it does not need rewriting every release.
const NOTE = null;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-App-Secret");
  // Five minutes at the edge. Long enough that this costs nothing at any volume,
  // short enough that a release reaches everyone the same day.
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).end();

  return res.status(200).json({
    ios: LATEST.ios,
    android: LATEST.android,
    min: MIN,
    note: NOTE
  });
}
