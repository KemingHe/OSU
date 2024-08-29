// ./scripts/utils/csv2TS.ts
//
// Generic utils for converting csv data files into typescript arrays.

// Zod essential imports.
import type { ZodSchema } from "zod";

// Local util imports.
import fileExistsNonEmpty from "@scripts/utils/fileExistsNonEmpty";
import parseCSVFile from "@scripts/utils/parseCSVFile";
import writeTSFile from "@scripts/utils/writeTSFile";

// biome-ignore format: added alignment for clarity.
export interface CSV2TSOptions {
  inFilePath       : string;
  inFileCSVHeaders : string[];
  inFileSchema     : ZodSchema;
  middleFunction  ?: (data: unknown[]) => unknown[];
  outFilePath      : string;
  outFileHeader    : string;
  outFileFooter    : string;
  outFileSchema    : ZodSchema;
}

/**
 * Converts a CSV file to a TypeScript array file.
 *
 * This function reads a CSV file, validates its content against a Zod schema,
 * optionally transforms the data, and writes the result to a TypeScript file
 * with a specified header and footer.
 *
 * @param {CSV2TSOptions} options - The parameters for the function.
 * @param {string} options.inFilePath - The path to the input CSV file.
 * @param {string[]} options.inFileCSVHeaders - The headers expected in the CSV file.
 * @param {ZodSchema} options.inFileSchema - The Zod schema to validate the CSV data against.
 * @param {(data: unknown[]) => unknown[]} [options.middleFunction] - An optional function to transform the data.
 * @param {string} options.outFilePath - The path to the output TypeScript file.
 * @param {string} options.outFileHeader - The header content to be included at the top of the output file.
 * @param {string} options.outFileFooter - The footer content to be included at the bottom of the output file.
 * @param {ZodSchema} options.outFileSchema - The Zod schema to validate the output data against.
 *
 * @returns {Promise<void>} A promise that resolves to void when the file has been written.
 *
 * @throws {Error} If there is an error processing the CSV file or writing the TypeScript file.
 * @throws {ZodError} If the data validation fails.
 */
export default async function csv2TS({
  inFilePath,
  inFileCSVHeaders,
  inFileSchema,
  middleFunction,
  outFilePath,
  outFileHeader,
  outFileFooter,
  outFileSchema,
}: CSV2TSOptions): Promise<void> {
  // Validate input file exists and is non-empty.
  await fileExistsNonEmpty(inFilePath);

  // Parse csv file.
  let parsedData = await parseCSVFile({
    filePath: inFilePath,
    csvHeaders: inFileCSVHeaders,
    schema: inFileSchema,
  });

  // Apply middle transform function if provided.
  if (middleFunction) {
    parsedData = middleFunction(parsedData);
  }

  // Validate and write output file.
  await writeTSFile({
    filePath: outFilePath,
    fileHeader: outFileHeader,
    fileFooter: outFileFooter,
    data: parsedData,
    schema: outFileSchema,
  });
}
