// ./src/schemas/UndergradDegree.test.ts
//
// Unittests for OSU undergraduate degree tuple and zod schema.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import { UndergradDegreeTuple, UndergradDegreeSchema, type UndergradDegree } from "@src/schemas/UndergradDegree";

// -----------------------------------------------------------------------------
// Constant valid and invalid undergraduate degree strings for batch testing.
const validUndergradDegreeStrings: UndergradDegree[] = [
  "AA (Associate of Arts)",
  "AS (Associate of Science)",
  "BA (Bachelor of Arts)",
  "BS (Bachelor of Science)",
  "BFA (Bachelor of Fine Arts)",
  "BM (Bachelor of Music)",
  "BME (Bachelor of Music Education)",
  "BSD (Bachelor of Science in Design)",
];

const invalidUndergradDegreeStrings: string[] = [
  "",
  "@",
  "123",
  "BS",
  "BS - Bachelor of Science",
  "BS (Bachelor of Science) ",
  "  BA (Bachelor of Arts)  ",
];

// -----------------------------------------------------------------------------
// Test suite for the UndergradDegreeTuple constant.
describe("The UndergradDegreeTuple constant", () => {
  it("matches the snapshot", () => {
    expect(UndergradDegreeTuple).toMatchSnapshot();
  });
});

// -----------------------------------------------------------------------------
// Test suite for the UndergradDegreeSchema zod schema.
describe("The UndergradDegreeSchema zod schema", () => {
  it("matches the snapshot", () => {
    expect(UndergradDegreeSchema).toMatchSnapshot();
  });

  it("parses valid undergraduate degree strings", () => {
    for (const validUndergradDegreeString of validUndergradDegreeStrings) {
      expect(UndergradDegreeSchema.safeParse(validUndergradDegreeString).success).toBe(true);
    }
  });

  it("fails to parse invalid undergraduate degree strings", () => {
    for (const invalidUndergradDegreeString of invalidUndergradDegreeStrings) {
      expect(UndergradDegreeSchema.safeParse(invalidUndergradDegreeString).success).toBe(false);
    }
  });
});
