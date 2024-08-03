// ./src/utils/osuValidators.test.ts
//
// Unittests for OSU-related validator functions.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import {
  isBuckeyemail,
  isNameDotNumber,
  isOSUEmail,
  isOSUOrBuckeyemail,
} from "@src/utils/osuValidators";

// Utility interface and function for batch testing. ---------------------------
interface BatchExpectationOptions {
  validator: (input: string) => boolean;
  validStrings: string[];
  invalidStrings: string[];
}

function batchExpectation(options: BatchExpectationOptions): void {
  const { validator, validStrings, invalidStrings } = options;

  for (const validString of validStrings) {
    it(`returns true for valid string ${validString}`, () => {
      expect(validator(validString)).toBe(true);
    });
  }

  for (const invalidString of invalidStrings) {
    it(`returns false for invalid string ${invalidString}`, () => {
      expect(validator(invalidString)).toBe(false);
    });
  }
}

// Constant valid and invalid strings for testing. -----------------------------
const validNameDotNumberStrings: string[] =
  // biome-ignore format: added alignment for better readability.
  [
    "name.1",
    "hyphened-name.200",
    "multi-hyphened-name.3333333",
];

const validOSUEmailStrings: string[] = validNameDotNumberStrings.map(
  (item) => `${item}@osu.edu`,
);

const validBuckeyemailStrings: string[] = validNameDotNumberStrings.map(
  (item) => `${item}@buckeyemail.osu.edu`,
);

const invalidNameDotNumberStrings: string[] =
  // biome-ignore format: added alignment for better readability.
  [
    "missingdot1",
    "missingnumber.",
    "missingdotnumber",
    "contains space.1",
    "containsCapital.1",
    "contains?special.1",
    "mixed.1withletters",
    "mixed2.withletters",
    "repeat..dot.1",
    "repeatdot..2",
    "repeatdot.3.",
    "bad--hyphen.1",
    "bad-hyphen-.2",
    "bad-hyphen.3-",
    "-badhyphen.4",
];
const invalidOSUEmailStrings: string[] = invalidNameDotNumberStrings.map(
  (item) => `${item}@osu.edu`,
);

const invalidBuckeyemailStrings: string[] = invalidNameDotNumberStrings.map(
  (item) => `${item}@buckeyemail.osu.edu`,
);

// Test suite for OSU-related validators. --------------------------------------
describe("The isNameDotNumber validator function", () => {
  batchExpectation({
    validator: isNameDotNumber,
    validStrings: validNameDotNumberStrings,
    invalidStrings: invalidNameDotNumberStrings,
  });
});

describe("The isOSUEmail validator function", () => {
  batchExpectation({
    validator: isOSUEmail,
    validStrings: validOSUEmailStrings,
    invalidStrings: invalidOSUEmailStrings,
  });
});

describe("The isBuckeyemail validator function", () => {
  batchExpectation({
    validator: isBuckeyemail,
    validStrings: validBuckeyemailStrings,
    invalidStrings: invalidBuckeyemailStrings,
  });
});

describe("The isOSUOrBuckeyemail validator function", () => {
  batchExpectation({
    validator: isOSUOrBuckeyemail,
    validStrings: [...validOSUEmailStrings, ...validBuckeyemailStrings],
    invalidStrings: [...invalidOSUEmailStrings, ...invalidBuckeyemailStrings],
  });
});
