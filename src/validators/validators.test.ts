// ./src/utils/validators.test.ts
//
// Unittests for OSU-related validator functions.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import {
  BUCKEYEMAIL_PATTERN,
  NAME_DOT_NUM_PATTERN,
  OSU_DOT_EDU_EMAIL_PATTERN,
  isBuckeyemail,
  isNameDotNum,
  isOSUDotEduEmail,
  isOSUEmail,
} from "@src/validators/validators";

// -----------------------------------------------------------------------------
// Utility interface and function for batch testing.
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

// -----------------------------------------------------------------------------
// Constant valid and invalid strings for batch testing.
const validNameDotNumStrings: string[] =
  // biome-ignore format: added alignment for better readability.
  [
    "name.1",
    "hyphened-name.200",
    "multi-hyphened-name.3333333",
];

const validOSUDotEduEmailStrings: string[] = validNameDotNumStrings.map(
  (item) => `${item}@osu.edu`,
);

const validBuckeyemailStrings: string[] = validNameDotNumStrings.map(
  (item) => `${item}@buckeyemail.osu.edu`,
);

const invalidNameDotNumStrings: string[] =
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
const invalidOSUDotEduEmailStrings: string[] = invalidNameDotNumStrings.map(
  (item) => `${item}@osu.edu`,
);

const invalidBuckeyemailStrings: string[] = invalidNameDotNumStrings.map(
  (item) => `${item}@buckeyemail.osu.edu`,
);

// -----------------------------------------------------------------------------
// Test suite for const regexp patterns.
describe("The NAME_DOT_NUM_PATTERN regex", () => {
  it("matches valid name.number strings", () => {
    for (const validString of validNameDotNumStrings) {
      expect(NAME_DOT_NUM_PATTERN.test(validString)).toBe(true);
    }
  });

  it("does not match invalid name.number strings", () => {
    for (const invalidString of invalidNameDotNumStrings) {
      expect(NAME_DOT_NUM_PATTERN.test(invalidString)).toBe(false);
    }
  });
});

describe("The OSU_DOT_EDU_EMAIL_PATTERN regex", () => {
  it("matches valid OSU email strings", () => {
    for (const validString of validOSUDotEduEmailStrings) {
      expect(OSU_DOT_EDU_EMAIL_PATTERN.test(validString)).toBe(true);
    }
  });

  it("does not match invalid OSU email strings", () => {
    for (const invalidString of invalidOSUDotEduEmailStrings) {
      expect(OSU_DOT_EDU_EMAIL_PATTERN.test(invalidString)).toBe(false);
    }
  });
});

describe("The BUCKEYEMAIL_PATTERN regex", () => {
  it("matches valid Buckeyemail strings", () => {
    for (const validString of validBuckeyemailStrings) {
      expect(BUCKEYEMAIL_PATTERN.test(validString)).toBe(true);
    }
  });

  it("does not match invalid Buckeyemail strings", () => {
    for (const invalidString of invalidBuckeyemailStrings) {
      expect(BUCKEYEMAIL_PATTERN.test(invalidString)).toBe(false);
    }
  });
});

// -----------------------------------------------------------------------------
// Test suite for validator functions.
describe("The isNameDotNum validator function", () => {
  batchExpectation({
    validator: isNameDotNum,
    validStrings: validNameDotNumStrings,
    invalidStrings: invalidNameDotNumStrings,
  });
});

describe("The isOSUDotEduEmail validator function", () => {
  batchExpectation({
    validator: isOSUDotEduEmail,
    validStrings: validOSUDotEduEmailStrings,
    invalidStrings: invalidOSUDotEduEmailStrings,
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
    validator: isOSUEmail,
    validStrings: [...validOSUDotEduEmailStrings, ...validBuckeyemailStrings],
    invalidStrings: [
      ...invalidOSUDotEduEmailStrings,
      ...invalidBuckeyemailStrings,
    ],
  });
});
