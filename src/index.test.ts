// ./src/index.test.ts
//
// Integration test for the OSU package entrypoint.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import * as entrypoint from "@src/index";

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

  it("exports the getStudentOrgs utility function", () => {
    expect(entrypoint).toHaveProperty("getStudentOrgs");
  });

  it("exports the getUndergradMajors utility function", () => {
    expect(entrypoint).toHaveProperty("getUndergradMajors");
  });
});
