// api/ask.js — Anthropic API proxy for One Stop Lawn
// Forwards requests from the OSL client to Anthropic's /v1/messages endpoint, injecting
// the API key from Vercel env var ANTHROPIC_API_KEY (so the key never appears in the
// client bundle).
//
// v222: Now enforces X-App-Secret header via the shared checkSecret helper. When
// APP_SHARED_SECRET is set on Vercel, only requests carrying the matching header succeed.
// CORS Allow-Headers expanded to permit X-App-Secret on browser preflight.
import { checkSecret } from "./_lib/checkSecret.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  // v222: include X-App-Secret in the allowed headers so browser preflight permits it.
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-App-Secret");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  // v222: gate behind shared secret. checkSecret writes the 403 response itself if the
  // header is missing/wrong, so we just bail.
  if (!checkSecret(req, res)) return;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
}
