// ./src/studentOrgs/getStudentOrgs.test.ts
//
// Unittests for the getStudentOrgs module.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Local constant and utility imports.
import { type StudentOrg, StudentOrgSchema } from "@src/schemas/StudentOrg";

// Testing module imports.
import { getStudentOrgs } from "@src/studentOrgs/getStudentOrgs";

// -----------------------------------------------------------------------------
// Test suite for the getStudentOrgs utility function.
describe("The getStudentOrgs utility function (currently static)", () => {
  it("returns an array of valid StudentOrg objects", () => {
    const orgs: StudentOrg[] = getStudentOrgs();

    // Confirm the array is not empty and matches the snapshot.
    expect(orgs).not.toHaveLength(0);
    expect(orgs).toMatchSnapshot();

    // Validate the array of StudentOrg objects against the schema.
    StudentOrgSchema.array().parse(orgs);
  });
});
