// api/_lib/checkSecret.js
// Shared X-App-Secret enforcement for the Vercel proxy.
// Both /api/ask and /api/rachio call this as the first thing inside their handler
// (after CORS setup but before any external call).
//
// Behavior:
//  - If APP_SHARED_SECRET env var is NOT set on Vercel, the check is skipped (fail-open).
//    This is deliberate: it lets you deploy this code BEFORE setting the env var without
//    breaking everything. The moment you set the env var, the gate activates.
//  - If APP_SHARED_SECRET is set, the request must include header X-App-Secret with
//    the same value. Otherwise the helper writes a 403 to the response and returns false
//    so the caller can early-return.
//
// Usage in api/ask.js or api/rachio.js:
//   import { checkSecret } from "./_lib/checkSecret.js";
//   if (req.method !== "OPTIONS" && !checkSecret(req, res)) return;
//
// Killswitch:
//   To revoke all client access immediately, rotate APP_SHARED_SECRET on Vercel to a
//   new value. The old native app builds will start getting 403s. Ship a new app build
//   with the new secret embedded to restore service.
export function checkSecret(req, res) {
  const expected = process.env.APP_SHARED_SECRET;
  if (!expected) {
    // No env var set — fail open so the proxy keeps working until you flip the switch.
    return true;
  }
  // Vercel normalizes header names to lowercase
  const got = req.headers["x-app-secret"];
  if (got !== expected) {
    res.status(403).json({ error: "Forbidden: invalid or missing X-App-Secret header." });
    return false;
  }
  return true;
}
