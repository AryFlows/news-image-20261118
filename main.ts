// Frost Front Page — news-image-20261118
// The entry image is drawn at build time and ships in this repository.
// This program only places a copy where the harness reads it.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = resolve(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const before = statSync(source);
const after = statSync(target);
if (after.size !== before.size) {
  console.error(
    `size mismatch: ${source} is ${before.size} bytes but ${target} is ${after.size} bytes`,
  );
  process.exit(1);
}
console.log(`wrote ${target} (${after.size} bytes)`);
