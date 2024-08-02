// ./scripts/utils/csv2TS.test.ts
//
// Unittests for generic utility functions in csv2TS.ts.

// Vitest essential setup and mocking imports.
import mockFs from "mock-fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { type ZodSchema, z } from "zod";

// Testing module imports.
import {
  fileExistsNonEmpty,
  parseCSVFile,
  type parseCSVFileOptions,
} from "@scripts/utils/csv2TS";

// Mock file path and data for the utils test suite. ---------------------------
const mockNonExistentInFilePath: string = "nonExistentInFilePath.csv";
const mockEmptyInFilePath: string = "mockEmptyInFilePath.csv";
const mockInaccessibleInFilePath: string = "mockInaccessibleInFilePath.csv";
const mockInFilePath: string = "mockInFilePath.csv";
const mockOutFilePath: string = "mockOutFilePath.ts";
const mockOutFileHeader: string = "mockOutFileHeader";
const mockOutFileArrayName: string = "mockOutFileArrayName";
const mockSchema: ZodSchema = z.object({
  name: z.string().min(1),
  purposeStatement: z.string().min(1),
  affiliation: z.string().min(1),
});
const mockEmptyData: string = "";
const mockRawCSVData: string = `"Name","Purpose Statement","Affiliation"
"The Alliance of Students with Disabilities for Inclusion, Networking, and Transition Opportunities in STEM at The Ohio State University","The Alliance of Students with Disabilities for Inclusion, Networking, and Transition Opportunities in STEM at The Ohio State University (TAP...","Columbus, Academic/College, Awareness/Activism, Special Interest, Technology"
"1 Day For The K.I.A., Inc.","1 Day for the K.I.A.’s purpose is to raise awareness and commemorate fallen military service members. 1 Day for the K.I.A. accomplishes our ...","Columbus, Awareness/Activism, Community Service/Service Learning, Special Interest,"`;
const mockCSVHeaders: string[] = ["name", "purposeStatement", "affiliation"];

// Mock file system setup and teardown. ----------------------------------------
beforeAll(() => {
  mockFs({
    [mockEmptyInFilePath]: mockEmptyData,
    [mockInFilePath]: mockRawCSVData,
    [mockInaccessibleInFilePath]: mockFs.file({
      mode: 0o000, // No permissions.
      content: mockRawCSVData,
    }),
  });
});

afterAll(() => {
  mockFs.restore();
});

// Test suite for csv2TS utils functions. --------------------------------------
describe(`"fileExistsNonEmpty" function`, () => {
  it("returns true if file from path exists and is non-empty", async () => {
    await expect(fileExistsNonEmpty(mockInFilePath)).resolves.toMatchSnapshot();
  });

  // IMPORTANT!!
  // For bad file path tests, use `toThrowError()`
  // instead of `toThrowErrorMatchingSnapshot()`,
  // in order to pass GitHub Actions CI tests (different path resolution).
  it("throws an error if file from path does not exist", async () => {
    await expect(
      fileExistsNonEmpty(mockNonExistentInFilePath),
    ).rejects.toThrowError();
  });

  it("throws an error if file from path is empty", async () => {
    await expect(
      fileExistsNonEmpty(mockEmptyInFilePath),
    ).rejects.toThrowError();
  });
});

describe(`"parseCSVFile" function`, () => {
  it("successfully returns full parsed data from csv file matching schema", async () => {
    const options: parseCSVFileOptions = {
      filePath: mockInFilePath,
      csvHeaders: mockCSVHeaders,
      schema: mockSchema,
    };
    await expect(parseCSVFile(options)).resolves.toMatchSnapshot();
  });

  it("throws an error if csv file data does not match schema", async () => {
    const options: parseCSVFileOptions = {
      filePath: mockInFilePath,
      csvHeaders: mockCSVHeaders,
      schema: z.object({
        name: z.number(),
      }),
    };
    await expect(parseCSVFile(options)).rejects.toThrowError();
  });

  it("throws an error if there is an error reading the file", async () => {
    const options: parseCSVFileOptions = {
      filePath: mockNonExistentInFilePath,
      csvHeaders: mockCSVHeaders,
      schema: mockSchema,
    };
    await expect(parseCSVFile(options)).rejects.toThrowError();
  });
});
