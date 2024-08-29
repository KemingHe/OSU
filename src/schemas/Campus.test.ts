// ./src/schemas/Campus.test.ts
//
// Unittests for the OSU campus tuple and zod schema.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import { CampusTuple, CampusSchema, type Campus } from "@src/schemas/Campus";

// -----------------------------------------------------------------------------
// Constant valid and invalid campus strings for batch testing.
const validCampusStrings: Campus[] = [
  "Columbus",
  "Lima",
  "Marion",
  "Mansfield",
  "Newark",
  "Wooster",
];

const invalidCampusStrings: string[] = [
  "",
  "@",
  "123",
  "Cleveland",
  "Columbus ",
  "  Lima  ",
];

// -----------------------------------------------------------------------------
// Test suite for the CampusTuple constant.
describe("The CampusTuple constant", () => {
  it("matches the snapshot", () => {
    expect(CampusTuple).toMatchSnapshot();
  });
});

// -----------------------------------------------------------------------------
// Test suite for the CampusSchema zod schema.
describe("The CampusSchema zod schema", () => {
  it("matches the snapshot", () => {
    expect(CampusSchema).toMatchSnapshot();
  });

  it("parses valid campus strings", () => {
    for (const validCampusString of validCampusStrings) {
      expect(CampusSchema.safeParse(validCampusString).success).toBe(true);
    }
  });

  it("fails to parse invalid campus strings", () => {
    for (const invalidCampusString of invalidCampusStrings) {
      expect(CampusSchema.safeParse(invalidCampusString).success).toBe(false);
    }
  });
});
