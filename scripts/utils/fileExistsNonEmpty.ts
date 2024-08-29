// ./scripts/utils/fileExistsNonEmpty.ts
//
// Generic utility function to check if a file exists and is non-empty.

// Node.js native module imports.
import path from "node:path";

// File I/O essential imports.
import fs from "fs-extra";

export default async function fileExistsNonEmpty(
  filePath: string,
): Promise<void> {
  // Resolve file path.
  const resolvedFilePath = path.resolve(filePath);

  // Check if file is empty.
  // Implicitly throws an error if file does not exist.
  const fileStats = await fs.stat(resolvedFilePath);
  if (fileStats.size === 0) {
    throw new Error(`File is empty: ${filePath}`);
  }

  // Explicitly resovles to void (undefined) if file exists and is non-empty.
  console.log(
    `\x1b[36m[${fileExistsNonEmpty.name}]\x1b[0m \x1b[32mSuccessfully\x1b[0m verified given file exists and is non-empty: ${resolvedFilePath}.`,
  );
  return;
}
