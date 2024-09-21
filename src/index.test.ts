// ./src/index.test.ts
//
// Integration test for the OSU package entrypoint.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import * as entrypoint from "@src/index";

// -----------------------------------------------------------------------------
// Entrypoint integration test suite.
describe("The OSU package entrypoint", () => {
  it("exports the validator constants and utilities", () => {
    expect(entrypoint).toHaveProperty("NAME_DOT_NUM_PATTERN");
    expect(entrypoint).toHaveProperty("OSU_DOT_EDU_EMAIL_PATTERN");
    expect(entrypoint).toHaveProperty("BUCKEYEMAIL_PATTERN");

    expect(entrypoint).toHaveProperty("isNameDotNum");
    expect(entrypoint).toHaveProperty("isOSUDotEduEmail");
    expect(entrypoint).toHaveProperty("isBuckeyemail");
    expect(entrypoint).toHaveProperty("isOSUEmail");
  });

  // ---------------------------------------------------------------------------
  // Student organization schema and utility export tests.
  it("exports the StudentOrgSchema ZodSchema", () => {
    expect(entrypoint).toHaveProperty("StudentOrgSchema");
  });

  it("exports the getStudentOrgs utility function", () => {
    expect(entrypoint).toHaveProperty("getStudentOrgs");
  });

  // ---------------------------------------------------------------------------
  // Undergraduate major schema and utility export tests
  it("exports the UndergradMajorSchema ZodSchema", () => {
    expect(entrypoint).toHaveProperty("UndergradMajorSchema");
  });

  it("exports the getUndergradMajors utility function", () => {
    expect(entrypoint).toHaveProperty("getUndergradMajors");
  });

  // ---------------------------------------------------------------------------
  // Research posting schema and utility export tests
  it("exports the ResearchPostingSchema ZodSchema", () => {
    expect(entrypoint).toHaveProperty("ResearchPostingSchema");
  });

  it("exports the getResearchPostingsAsync utility function", () => {
    expect(entrypoint).toHaveProperty("getResearchPostingsAsync");
  });
});
