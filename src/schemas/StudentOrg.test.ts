// ./src/schemas/StudentOrgs.test.ts
//
// Unittests for the OSU student organization zod schema.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import { StudentOrgSchema, type StudentOrg } from "@src/schemas/StudentOrg";

// -----------------------------------------------------------------------------
// Constant valid and invalid student organization objects for batch testing.
const validStudentOrgObjects: StudentOrg[] = [
  {
    name: "Simple Student Organization",
    purposeStatement: null,
    campuses: null,
    categories: null,
  },
  {
    "name": "8-Bit Buckeyes",
    "purposeStatement": "The primary goal of 8-Bit Buckeyes is to create a fun, inclusive environment that connects members of the OSU community through playing loca...",
    "campuses": [
      "Columbus"
    ],
    "categories": [
      "Special Interest",
      "Sports and Recreation",
      "Technology"
    ]
  },
];

const invalidStudentOrgObjects: Partial<StudentOrg>[] = [
  {},
  {
    purposeStatement: null,
    category: null,
    categories: null,
  },
  {
    name: "",
    purposeStatement: null,
    category: null,
    categories: null,
  },
  {
    name: "Invalid Org 1",
    purposeStatement: "",
    category: null,
    categories: null,
  },
  {
    name: "Invalid Org 2",
    purposeStatement: null,
    category: [],
    categories: null,
  },
  {
    name: "Invalid Org 3",
    purposeStatement: null,
    category: null,
    categories: [],
  },
];

// -----------------------------------------------------------------------------
// Test suite for the StudentOrg zod schema.
describe("The StudentOrg zod schema", () => {
  it("matches the snapshot", () => {
    expect(StudentOrgSchema).toMatchSnapshot();
  });

  it("parses valid student organization objects", () => {
    for (const validStudentOrgObject of validStudentOrgObjects) {
      expect(StudentOrgSchema.safeParse(validStudentOrgObject).success).toBe(true);
    }
  });

  it("fails to parse invalid student organization objects", () => {
    for (const invalidStudentOrgObject of invalidStudentOrgObjects) {
      expect(StudentOrgSchema.safeParse(invalidStudentOrgObject).success).toBe(false);
    }
  });
});
