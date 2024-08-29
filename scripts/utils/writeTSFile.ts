// ./scripts/utils/writeTSFile.ts
//
// Generic utility function to write a TypeScript file with given data.

// Node.js native module imports.
import path from "node:path";

import fs from "fs-extra";
// Zod and fs-extra essential imports.
import type { ZodSchema } from "zod";

// biome-ignore format: added alignment for clarity.
export interface WriteTSFileOptions {
  filePath  : string;
  fileHeader: string;
  fileFooter: string;
  data      : unknown[];
  schema    : ZodSchema;
}

/**
 * Writes a TypeScript file with the given data, header, and footer.
 *
 * This function validates the provided data against a Zod schema,
 * formats it as a JSON string, and writes it to a specified file path
 * with a header and footer.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.filePath - The path where the TypeScript file will be written.
 * @param {string} params.fileHeader - The header content to be included at the top of the file.
 * @param {string} params.fileFooter - The footer content to be included at the bottom of the file.
 * @param {unknown[]} params.data - The data to be validated and written to the file.
 * @param {ZodSchema} params.schema - The Zod schema to validate the data against.
 *
 * @returns {Promise<void>} A promise that resolves to void when the file has been written.
 *
 * @throws {Error} If there is an error writing the file.
 * @throws {ZodError} If the data validation fails.
 */
export default async function writeTSFile({
  filePath,
  fileHeader,
  fileFooter,
  data,
  schema,
}: WriteTSFileOptions): Promise<void> {
  // Resolve out file path.
  const resolvedFilePath: string = path.resolve(filePath);

  // Validate data against schema.
  // const validatedData = schema.array().parse(data);
  const validatedData = [];
  for (const dataPoint of data) {
    validatedData.push(schema.parse(dataPoint));
  }

  // Prepare out file content.
  const arrayContent: string = JSON.stringify(validatedData, null, 2);
  const fileContent = `${fileHeader}${arrayContent};\n${fileFooter}`;

  // Write to out file.
  await fs.outputFile(resolvedFilePath, fileContent);
  console.log(
    `\x1b[36m[${writeTSFile.name}]\x1b[0m \x1b[32mSuccessfully\x1b[0m wrote file: ${resolvedFilePath}.`,
  );
}
