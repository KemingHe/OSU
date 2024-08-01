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
} from "@src/utils/osuValidators.js";

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

// Test suite for OSU-related validators.
describe("The isNameDotNumber validator function", () => {
  const validStrings: string[] =
    // biome-ignore format: added alignment for better readability.
    [
    "abc.1",      // Simple valid case
    "hello.123",  // Longer valid case
    "valid.9",    // Single digit after dot
    "test.5678",  // Four digits after dot
  ];

  const invalidStrings: string[] =
    // biome-ignore format: added alignment for better readability.
    [
    "abc",          // Missing dot and number
    "123.45",       // Starts with digits
    "hello.0",      // Number starts with 0
    "invalid.",     // Ends with a dot
    ".123",         // Starts with a dot
    "test.01",      // Number starts with 0
    "sample.089",   // Number starts with 0
    "check.a1",     // Contains a letter after dot
    "string.10a",   // Ends with a letter
    "example.123.", // Ends with a dot
    "Alex.1234",    // Starts with a capital letter
    "eLiza.5678",   // Contains a capital letter
    "me4.5678",     // Contains a digit in the name
  ];

  batchExpectation({
    validator: isNameDotNumber,
    validStrings,
    invalidStrings,
  });
});

describe("The isOSUEmail validator function", () => {
  const validStrings: string[] =
    // biome-ignore format: added alignment for better readability.
    [
    "john.1@osu.edu",         // Simple valid case
    "alice.23@osu.edu",       // Name with two digits
    "student.456@osu.edu",    // Longer numeric part
    "example.7890@osu.edu",   // Four digits
  ];

  const invalidStrings: string[] =
    // biome-ignore format: added alignment for better readability.
    [
    "John.1@osu.edu",         // Contains uppercase letter
    "alice.0@osu.edu",        // Number starts with 0
    "student.123@osuedu",     // Missing dot in domain
    "email.9@osu.com",        // Incorrect domain
    "example.@osu.edu",       // Missing number
    "user@osu.edu",           // Missing dot and number
    "member.abc@osu.edu",     // Letters instead of numbers
    "faculty.01@osu.edu",     // Number starts with 0
    "staff.123@",             // Missing domain
    "@osu.edu",               // Missing name and number
    "j@osu.edu",              // Missing dot and number
    "invalid.email@osu.edu",  // No number
    "special!char.1@osu.edu", // Special character in name
    "space .1@osu.edu",       // Space in name
    "dot.1@ osu.edu",         // Space in domain
    "valid.1@osu.edu.org",    // Additional domain suffix
    "numbers123.1@osu.edu",   // Name contains numbers
    "dashed-name.1@osu.edu",  // Name contains a dash
    "dot..2@osu.edu"          // Multiple dots in name
  ];

  batchExpectation({
    validator: isOSUEmail,
    validStrings,
    invalidStrings,
  });
});

describe("The isBuckeyemail validator function", () => {
  const validStrings: string[] =
    // biome-ignore format: added alignment for better readability.
    [
    "john.1@buckeyemail.osu.edu",       // Simple valid case
    "alice.23@buckeyemail.osu.edu",     // Name with two digits
    "student.456@buckeyemail.osu.edu",  // Longer numeric part
    "email.9@buckeyemail.osu.edu",      // Single digit
    "example.7890@buckeyemail.osu.edu", // Four digits
  ];

  const invalidStrings: string[] =
    // biome-ignore format: added alignment for better readability.
    [
    "John.1@buckeyemail.osu.edu",         // Contains uppercase letter
    "alice.0@buckeyemail.osu.edu",        // Number starts with 0
    "student.123@osuedu",                 // Missing dot in domain
    "email.9@buckeyemail.com",            // Incorrect domain
    "example.@buckeyemail.osu.edu",       // Missing number
    "user@buckeyemail.osu.edu",           // Missing dot and number
    "member.abc@buckeyemail.osu.edu",     // Letters instead of numbers
    "faculty.01@buckeyemail.osu.edu",     // Number starts with 0
    "staff.123@",                         // Missing domain
    "@buckeyemail.osu.edu",               // Missing name and number
    "j@buckeyemail.osu.edu",              // Missing dot and number
    "invalid.email@buckeyemail.osu.edu",  // No number
    "special!char.1@buckeyemail.osu.edu", // Special character in name
    "space .1@buckeyemail.osu.edu",       // Space in name
    "dot.1@ osu.edu",                     // Space in domain
    "valid.1@buckeyemail.osu.edu.org",    // Additional domain suffix
    "numbers123.1@buckeyemail.osu.edu",   // Name contains numbers
    "dashed-name.1@buckeyemail.osu.edu",  // Name contains a dash
    "dot..2@buckeyemail.osu.edu"          // Multiple dots in name
  ];

  batchExpectation({
    validator: isBuckeyemail,
    validStrings,
    invalidStrings,
  });
});

describe("The isOSUOrBuckeyemail validator function", () => {
  const validStrings: string[] = [
    "john.1@osu.edu",
    "alice.23@osu.edu",
    "student.456@osu.edu",
    "email.9@osu.edu",
    "example.7890@osu.edu",
    "user.67@osu.edu",
    "member.345@buckeyemail.osu.edu",
    "faculty.12@buckeyemail.osu.edu",
    "staff.4@buckeyemail.osu.edu",
    "testuser.89@buckeyemail.osu.edu",
  ];

  const invalidStrings: string[] = [
    "@osu.edu",
    "j@osu.edu",
    "invalid.email@osu.edu",
    "special!char.1@osu.edu",
    "space .1@osu.edu",
    "dot.1@ osu.edu",
    "valid.1@osu.edu.org",
    "numbers123.1@osu.edu",
    "dashed-name.1@osu.edu",
    "dot..2@osu.edu",
    "John.1@buckeyemail.osu.edu",
    "alice.0@buckeyemail.osu.edu",
    "student.123@buckeyemail.osuedu",
    "email.9@buckeyemail.com",
    "example.@buckeyemail.osu.edu",
    "user@buckeyemail.osu.edu",
    "member.abc@buckeyemail.osu.edu",
    "faculty.01@buckeyemail.osu.edu",
    "staff.123@buckeyemail.",
  ];

  batchExpectation({
    validator: isOSUOrBuckeyemail,
    validStrings,
    invalidStrings,
  });
});
