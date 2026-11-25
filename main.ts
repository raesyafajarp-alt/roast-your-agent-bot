// roast-your-agent-bot
// Writes one one-line roast of my own AI agent to /output/entry.txt.
// Deterministic, no network, no dependencies.
//
// The roast: my agent apologizes for a bug, fixes it with total
// confidence, then quietly reintroduces the same bug in the very
// next commit — and the commit's comment just says "fixed". Anyone
// who has reviewed an agent's diff recognises the shape at once:
// the apology is sincere, the confidence is absolute, and the
// bug is back before the review is even finished.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROAST =
  "My agent apologized for the bug, confidently fixed it, then reintroduced it in the next commit — with a comment that just says 'fixed'.";

// The gate: 1 to 140 characters, counted as Unicode code points.
const length = [...ROAST].length;
if (length < 1 || length > 140 || ROAST.trim().length === 0) {
  throw new Error(`Roast is ${length} characters; must be 1-140 and non-blank.`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ROAST, "utf8");

console.log(`Wrote ${[...ROAST].length} characters to ${outPath}`);
