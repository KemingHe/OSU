// ./src/schemas/StudentOrgCategory.test.ts
//
// Unittests for the OSU student organization category tuple and zod schema.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import { StudentOrgCategoryTuple, StudentOrgCategorySchema, type StudentOrgCategory } from "@src/schemas/StudentOrgCategory";

// -----------------------------------------------------------------------------
// Constant valid and invalid student organization category strings for batch testing.
const validStudentOrgCategoryStrings: StudentOrgCategory[] = [
  "Academic/College",
  "Awareness/Activism",
  "Community Service/Service Learning",
  "Creative and Performing Arts",
  "Ethnic/Cultural",
  "Governance Organizations",
  "Honoraries/Honor Societies",
  "Media, Journalism, and Creative Writing",
  "Religious/Spiritual",
  "Social Fraternities/Sororities",
  "Special Interest",
  "Sports and Recreation",
  "Technology",
  "Graduate",
  "Professional",
  "Undergraduate",
];

const invalidStudentOrgCategoryStrings: string[] = [
  "",
  "@",
  "123",
  "Ethnic-Cultural",
  "Media",
  "Undergrad",
  "Undergraduate ",
  "  Undergraduate  ",
];

// -----------------------------------------------------------------------------
// Test suite for the StudentOrgCategoryTuple constant.
describe("The StudentOrgCategoryTuple constant", () => {
  it("matches the snapshot", () => {
    expect(StudentOrgCategoryTuple).toMatchSnapshot();
  });
});

// -----------------------------------------------------------------------------
// Test suite for the StudentOrgCategorySchema zod schema.
describe("The StudentOrgCategorySchema zod schema", () => {
  it("matches the snapshot", () => {
    expect(StudentOrgCategorySchema).toMatchSnapshot();
  });

  it("parses valid student organization category strings", () => {
    for (const validStudentOrgCategoryString of validStudentOrgCategoryStrings) {
      expect(StudentOrgCategorySchema.safeParse(validStudentOrgCategoryString).success).toBe(true);
    }
  });

  it("fails to parse invalid student organization category strings", () => {
    for (const invalidStudentOrgCategoryString of invalidStudentOrgCategoryStrings) {
      expect(StudentOrgCategorySchema.safeParse(invalidStudentOrgCategoryString).success).toBe(false);
    }
  });
});
