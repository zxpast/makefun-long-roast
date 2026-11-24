import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The Long Roast: Lawmakers and the File They Cannot Convert
// One satirical sentence. Setup: a senator who legislates 400-page AI
// safety reports for everyone else. Turn, revealed only in the last
// words: his own reports go out as .docx files begging for a PDF.
// No network, no randomness, no environment input: the output is fixed.
const ENTRY =
  'Senator Hale, who wrote the law requiring every AI model to file a ' +
  '400-page safety report, still emails his own reports as .docx files ' +
  'with the subject line "can someone PDF this for me".';

// Guard the gate before writing: 1-320 chars, one sentence, no
// trailing whitespace. A violated guard fails loudly instead of
// shipping an entry the scorer would refuse.
if ([...ENTRY].length < 1 || [...ENTRY].length > 320) {
  throw new Error("entry outside 1-320 character gate");
}
if (ENTRY.trim() !== ENTRY || (ENTRY.match(/\.(?=\s|$)/g) ?? []).length !== 1) {
  throw new Error("entry must be exactly one sentence");
}

const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
