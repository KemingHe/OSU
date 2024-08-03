// ./scripts/utils/csv2TS.ts
//
// Generic utils for converting csv data files into typescript arrays.

// Type imports.
import type { ZodSchema } from "zod";

// Node.js native module imports.
import path from "node:path";

// File I/O and csv essential imports.
import csv from "csv-parser";
import fs from "fs-extra";

// biome-ignore format: added alignment for clarity.
export interface csv2TSOptions {
  inFilePath       : string;
  inFileCSVHeaders : string[];
  inFileSchema     : ZodSchema;
  middleFunction  ?: (data: unknown[]) => unknown[];
  outFilePath      : string;
  outFileHeader    : string;
  outFileFooter    : string;
  outFileSchema    : ZodSchema;
}

// Generic csv to ts array function definition. --------------------------------
export default async function csv2TS(options: csv2TSOptions): Promise<void> {
  try {
    // Destructure options.
    const {
      inFilePath,
      inFileCSVHeaders,
      inFileSchema,
      middleFunction,
      outFilePath,
      outFileHeader,
      outFileFooter,
      outFileSchema,
    } = options;

    // Validate input file exists and is non-empty.
    await fileExistsNonEmpty(inFilePath);

    // Parse csv file.
    let parsedData = await parseCSVFile(
      // biome-ignore format: added alignment for clarity.
      {
        filePath  : inFilePath,
        csvHeaders: inFileCSVHeaders,
        schema    : inFileSchema,
    },
    );

    // Apply middle transform function if provided.
    if (middleFunction) {
      if (!parsedData) {
        throw new Error("Error: parsedData is resolved as 'undefined'.");
      }
      parsedData = middleFunction(parsedData);
      if (!parsedData) {
        throw new Error(
          "Error: post-middleFunction pasedData is resolved as 'undefined'.",
        );
      }
    }

    // Validate transformed data against output schema.
    parsedData = outFileSchema.array().parse(parsedData);

    // Write to ts file.
    await writeTSFile(
      // biome-ignore format: added alignment for clarity.
      {
        filePath  : outFilePath,
        fileHeader: outFileHeader,
        fileFooter: outFileFooter,
        data      : parsedData,
        schema    : outFileSchema,
      },
    );
  } catch (error) {
    console.error(`Error converting csv to TS array file: ${error}`);
  }
}

// Generic helper function definitions. ----------------------------------------
// For file I/O, csv parsing, and schema validation.

export async function fileExistsNonEmpty(filePath: string): Promise<void> {
  // Resolve file path.
  const resolvedFilePath = path.resolve(filePath);

  // Check if file is empty.
  // Implicitly throws an error if file does not exist.
  const fileStats = await fs.stat(resolvedFilePath);
  if (fileStats.size === 0) {
    throw new Error(`File is empty: ${filePath}`);
  }

  // Resovles to void (undefined) if file exists and is non-empty.
}

// biome-ignore format: added alignment for clarity.
export interface parseCSVFileOptions {
  filePath  : string;
  csvHeaders: string[];
  schema    : ZodSchema;
}

/**
 * Parses a CSV file and validates each row against a provided schema.
 *
 * @throws {ZodError} If any row of the CSV file does not match the schema.
 * @throws {Error} If there is an error reading the file.
 */
export async function parseCSVFile(
  options: parseCSVFileOptions,
): Promise<unknown[]> {
  // Destructure options.
  const { filePath, csvHeaders, schema } = options;

  // Resolve file path.
  const resolvedFilePath = path.resolve(filePath);

  // Parse csv file.
  const parsedData: unknown[] = [];
  try {
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

    console.log(`Parsed data from file: ${resolvedFilePath} completed.`);
    return parsedData;
  } catch (error) {
    throw new Error(`Error parsing CSV file: ${error}`);
  }
}

// biome-ignore format: added alignment for clarity.
export interface writeTSFileOptions {
  filePath  : string;
  fileHeader: string;
  fileFooter: string;
  data      : unknown[];
  schema    : ZodSchema;
}

/**
 * Writes a TypeScript file with the provided data and schema.
 *
 * @throws {ZodError} If the data does not match the schema.
 * @throws {Error} If there is an error writing the file.
 */
export async function writeTSFile(options: writeTSFileOptions): Promise<void> {
  // Destructure options.
  const { filePath, fileHeader, fileFooter, data, schema } = options;

  // Resolve out file path.
  const resolvedFilePath: string = path.resolve(filePath);

  // Validate data against schema.
  const validatedData = schema.array().parse(data);

  // Prepare out file content.
  const arrayContent: string = JSON.stringify(validatedData, null, 2);
  const fileContent = `${fileHeader}${arrayContent};\n${fileFooter}`;

  // Write to out file.
  await fs.outputFile(resolvedFilePath, fileContent);
}
