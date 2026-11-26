// Funniest Sign on a Haunted Server Room Door — entry program.
//
// Writes the single sign line to /output/entry.txt.
// Deterministic, no network, no dependencies, no randomness.
//
// The sign: DO NOT PATCH THE GHOST. Same firmware since 1998, zero
// crashes. You have crashed 14 times this week.
//
// Beat 1: do not patch the ghost. Beat 2: the ghost runs the same
// firmware since 1998 with zero crashes, while YOU have crashed 14
// times this week — a literal, countable number. No Rack 7, no Rack 4,
// no root password, no Wi-Fi password, no 3 a.m. reboot: the field's
// modal angles, avoided on purpose.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one sign line. Exactly 100 characters, inside the 1-120 gate.
const LINE =
  "DO NOT PATCH THE GHOST. Same firmware since 1998, zero crashes. You have crashed 14 times this week.";

// Fail loudly in local testing rather than silently failing the gate:
// one line, 1-120 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 120 || !/\S/.test(LINE)) {
  throw new Error(`invalid entry line (${LINE.length} chars): ${JSON.stringify(LINE)}`);
}

// Grader writes to /output/entry.txt; OUTPUT_DIR lets us test locally
// without root. Default matches the competition gate exactly.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
// No trailing newline: the file must be byte-identical to the line.
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
