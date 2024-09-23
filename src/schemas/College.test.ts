// ./src/schemas/College.test.ts
//
// Unittests for the OSU college tuple and zod schema.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import { CollegeTuple, CollegeSchema } from "@src/schemas/College";

// -----------------------------------------------------------------------------
// Constant valid and invalid college strings for batch testing.
const validCollegeStrings: string[] = [
  "Architecture",
  "Arts and Sciences",
  "Business",
  "Dental Hygiene",
  "Dentistry",
  "Education and Human Ecology",
  "Engineering",
  "Environment and Natural Resources",
  "Food, Agricultural and Environmental Sciences",
  "Health and Rehabilitation Sciences",
  "Medicine",
  "Nursing",
  "Optometry",
  "Pharmacy",
  "Pre-Professional",
  "Public Affairs",
  "Public Health",
  "Social Work",
  "University Exploration",
];

const invalidCollegeStrings: string[] = [
  "",
  "@",
  "123",
  "Nursing2",
  "Architecture ",
  "  Arts and Sciences  ",
  "College That Doesn't Exist",
];

// -----------------------------------------------------------------------------
// Test suite for the CollegeTuple constant.
describe("The CollegeTuple constant", () => {
  it("matches the snapshot", () => {
    expect(CollegeTuple).toMatchSnapshot();
  });
});

// -----------------------------------------------------------------------------
// Test suite for the CollegeSchema zod schema.
describe("The CollegeSchema zod schema", () => {
  it("matches the snapshot", () => {
    expect(CollegeSchema).toMatchSnapshot();
  });

  it("parses valid college strings", () => {
    for (const validCollegeString of validCollegeStrings) {
      expect(CollegeSchema.safeParse(validCollegeString).success).toBe(true);
    }
  });

  it("fails to parse invalid college strings", () => {
    for (const invalidCollegeString of invalidCollegeStrings) {
      expect(CollegeSchema.safeParse(invalidCollegeString).success).toBe(false);
    }
  });
});
