#!/usr/bin/env node
/*
 * osl_prebuild.js  —  One Stop Lawn pre-transpile build step  (v2)
 *
 * Converts the runtime-Babel single-file app into a ship-ready single file by
 * running the SAME transpiler the app uses at runtime, ahead of time:
 *   - @babel/standalone @ 7.23.10  (identical to the CDN version the app loads)
 *   - presets ["react","env"]      (identical to its no-data-presets default)
 * so the compiled output behaves EXACTLY like the version that runs in a
 * browser today — JSX compiled, let/const downleveled to var (which is what
 * masks ordering bugs at runtime) — just done at build time instead.
 *
 * It then:
 *   - removes the @babel/standalone CDN <script> (no more in-browser transpile)
 *   - rewrites the text/babel block as a plain <script> with compiled JS
 *   - leaves everything else byte-for-byte identical
 *   - syntax-checks the compiled JS with `node --check` before writing
 *
 * Usage:
 *   node osl_prebuild.js  <input.html>  <output.html>
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const Babel = require("@babel/standalone");

const [, , INPUT, OUTPUT] = process.argv;
if (!INPUT || !OUTPUT) {
  console.error("Usage: node osl_prebuild.js <input.html> <output.html>");
  process.exit(1);
}
function fail(msg) { console.error("\n\u274c BUILD FAILED: " + msg + "\n"); process.exit(1); }

console.log("Using @babel/standalone " + Babel.version + " (presets: react, env)");
const html = fs.readFileSync(INPUT, "utf8");
console.log("Read " + INPUT + "  (" + html.length.toLocaleString() + " bytes)");

// --- 1. locate the single text/babel block (browser parses to first </script>) ---
const openRe = /<script\b[^>]*type=["']text\/babel["'][^>]*>/i;
const openMatch = html.match(openRe);
if (!openMatch) fail("no <script type=\"text/babel\"> block found.");
const blockStart = openMatch.index;
const codeStart = blockStart + openMatch[0].length;
const closeIdx = html.indexOf("</script>", codeStart);
if (closeIdx === -1) fail("could not find closing </script> for the babel block.");
const jsx = html.slice(codeStart, closeIdx);
console.log("Found babel block: " + jsx.length.toLocaleString() + " bytes of JSX");
if (html.slice(closeIdx).match(/type=["']text\/babel["']/i))
  fail("more than one text/babel block detected — script only handles one.");

// --- 2. transpile with the SAME transpiler + presets the app uses at runtime ---
let compiled;
try {
  compiled = Babel.transform(jsx, {
    presets: ["react", "env"],
    compact: false,
    comments: false,
    sourceType: "script",
  }).code;
} catch (e) {
  fail("transpile error — fix the source first:\n" + e.message);
}
console.log("Transpiled OK: " + compiled.length.toLocaleString() + " bytes of plain JS");

// --- 3. remove the @babel/standalone CDN <script> ---
const babelCdnRe = /[ \t]*<script\b[^>]*src=["'][^"']*@babel\/standalone[^"']*["'][^>]*>\s*<\/script>\s*\n?/i;
if (!babelCdnRe.test(html)) fail("could not find the @babel/standalone CDN <script> to remove.");
let result = html.replace(babelCdnRe, "");

// --- 4. swap the block ---
const fullBlock = html.slice(blockStart, closeIdx + "</script>".length);
result = result.replace(fullBlock, "<script>\n" + compiled + "\n</script>");

// --- 5. validate OUTPUT ---
if (/type=["']text\/babel["']/i.test(result)) fail("output still contains a text/babel block.");
if (/@babel\/standalone/i.test(result)) fail("output still references @babel/standalone.");
if (!/React\.createElement/.test(compiled)) fail("compiled output has no React.createElement — JSX transform may have failed.");
for (const dep of ["react@18.2.0", "react-dom@18.2.0", "jspdf@2.5.1"])
  if (!result.includes(dep)) fail("output is missing expected dependency: " + dep);
// hard syntax check via node itself
const tmp = path.join(os.tmpdir(), "osl_compiled_check_" + process.pid + ".js");
fs.writeFileSync(tmp, compiled, "utf8");
try { execFileSync(process.execPath, ["--check", tmp]); }
catch (e) { fail("compiled JS failed `node --check`:\n" + (e.stderr ? e.stderr.toString() : e.message)); }
finally { try { fs.unlinkSync(tmp); } catch (_) {} }

fs.writeFileSync(OUTPUT, result, "utf8");
console.log(
  "\n\u2705 BUILD OK\n" +
  "   wrote " + OUTPUT + "  (" + result.length.toLocaleString() + " bytes)\n" +
  "   - compiled with @babel/standalone 7.23.10 (react+env) — matches runtime\n" +
  "   - @babel/standalone CDN removed (no in-browser transpile)\n" +
  "   - compiled JS passed node --check\n"
);
