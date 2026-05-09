// api/rachio.js — Rachio API proxy for One Stop Lawn
// Forwards requests from the browser (which can't always call api.rach.io directly due
// to CORS) to Rachio's public API, injecting the user's Authorization header. The
// user's Rachio API key is supplied per-request in the request body — not stored on
// Vercel.
//
// v222: Now enforces X-App-Secret header via the shared checkSecret helper. CORS
// Allow-Headers expanded to permit X-App-Secret on browser preflight.
import { checkSecret } from "./_lib/checkSecret.js";

export default async function handler(req, res) {
  // CORS headers so the browser can call this endpoint
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  // v222: include X-App-Secret in the allowed headers so browser preflight permits it.
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-App-Secret");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  // v222: gate behind shared secret.
  if (!checkSecret(req, res)) return;

  try {
    const { path, method = "GET", apiKey, body } = req.body || {};
    if (!apiKey) {
      res.status(400).json({ error: "Missing apiKey in request body." });
      return;
    }
    if (!path || typeof path !== "string" || !path.startsWith("/")) {
      res.status(400).json({ error: "Missing or invalid path. Must start with /." });
      return;
    }
    // Whitelist: only allow paths under /1/public/ for safety
    if (!path.startsWith("/1/public/")) {
      res.status(400).json({ error: "Path must start with /1/public/" });
      return;
    }
    const rachioUrl = "https://api.rach.io" + path;
    const fetchOpts = {
      method: method.toUpperCase(),
      headers: {
        "Authorization": "Bearer " + String(apiKey).trim(),
        "Content-Type": "application/json",
      },
    };
    if (body && (fetchOpts.method === "POST" || fetchOpts.method === "PUT")) {
      fetchOpts.body = typeof body === "string" ? body : JSON.stringify(body);
    }
    const rachioRes = await fetch(rachioUrl, fetchOpts);
    const text = await rachioRes.text();
    // Try to parse as JSON; if it fails, return the raw text
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }
    res.status(rachioRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error: " + (err?.message || String(err)) });
  }
}
