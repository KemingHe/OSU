// ./scripts/utils/parseCSVFile.ts
//
// Generic utility function to parse a CSV file with given headers
// and to validate its contents with a given Zod schema.

// Node.js native path module imports.
import path from "node:path";

import csv from "csv-parser";
import fs from "fs-extra";
// Zod, csv-parser, and fs-extra essential imports.
import type { ZodSchema } from "zod";

// biome-ignore format: added alignment for clarity.
export interface ParseCSVFileOptions {
  filePath  : string;
  csvHeaders: string[];
  schema    : ZodSchema;
}

/**
 * Parses a CSV file with the given headers and validates its contents with a given Zod schema.
 *
 * This function reads a CSV file, parses its contents, and validates each row against the provided Zod schema.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.filePath - The path to the CSV file to be parsed.
 * @param {string[]} params.csvHeaders - The headers to be used for parsing the CSV file.
 * @param {ZodSchema} params.schema - The Zod schema to validate each row of the CSV file.
 *
 * @returns {Promise<unknown[]>} A promise that resolves to an array of validated data objects.
 *
 * @throws {Error} If there is an error reading the file.
 * @throws {ZodError} If the data validation fails.
 */
export default async function parseCSVFile({
  filePath,
  csvHeaders,
  schema,
}: ParseCSVFileOptions): Promise<unknown[]> {
  // Resolve file path.
  const resolvedFilePath = path.resolve(filePath);

  // Parse csv file.
  const parsedData: unknown[] = [];
  // To avoid timeout, first check if file is readable.
  await fs.access(resolvedFilePath, fs.constants.R_OK);

  const stream = fs.createReadStream(resolvedFilePath).pipe(
    csv({
      headers: csvHeaders,
      skipLines: 1,
    }),
  );

  for await (const row of stream) {
    // Validate row against schema.
    const validatedRow = schema.parse(row);
    parsedData.push(validatedRow);
  }

  console.log(
    `\x1b[36m[${parseCSVFile.name}]\x1b[0m \x1b[32mSuccessfully\x1b[0m read file: ${resolvedFilePath}, and parsed ${parsedData.length} records of raw data.`,
  );
  return parsedData;
}
