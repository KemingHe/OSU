// ./src/index.test.ts
//
// Integration test for the OSU package entrypoint.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import * as entrypoint from "@src/index.js";

// Local namespace and utiles import.
import osu from "@src/osu.js";
import {
  isBuckeyemail,
  isNameDotNumber,
  isOSUEmail,
  isOSUOrBuckeyemail,
} from "@src/utils/osuValidators.js";

// Entrypoint integration test suite.
describe("The OSU package entrypoint", () => {
  it("exports the correct OSU namespace", () => {
    expect(entrypoint.default).toStrictEqual(osu);
  });

  it("exports the isNameDotNumber validator function", () => {
    expect(entrypoint.isNameDotNumber).toStrictEqual(isNameDotNumber);
  });

  it("exports the isOSUEmail validator function", () => {
    expect(entrypoint.isOSUEmail).toStrictEqual(isOSUEmail);
  });

  it("exports the isBuckeyemail validator function", () => {
    expect(entrypoint.isBuckeyemail).toStrictEqual(isBuckeyemail);
  });

  it("exports the isOSUOrBuckeyemail validator function", () => {
    expect(entrypoint.isOSUOrBuckeyemail).toStrictEqual(isOSUOrBuckeyemail);
  });
});
