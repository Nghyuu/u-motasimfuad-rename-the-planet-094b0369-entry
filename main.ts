import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Jupiter is now The Grudge, because its Great Red Spot is a single storm that has been raging for 300 years and still won't let it go.";

function safeChmod(path: string, mode: number): void {
  try {
    chmodSync(path, mode);
  } catch {
    // Best effort only: the grader may run as a different user.
  }
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  const text = LINE + "\n";
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, text, "utf8");
  // File only, never the output dir: the grader runs as uid 65534 and
  // /output is owned by root, so chmodding the dir itself throws EPERM.
  safeChmod(outFile, 0o644);
}

main();
