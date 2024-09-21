// ./src/utils/fetchHelpers.sanitizeText.test.ts
//
// Unittests for the sanitizeText function in fetchHelpers.ts.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing target import.
import { sanitizeText } from "@src/utils/fetchHelpers";

// -----------------------------------------------------------------------------
// "Before" and matching "After" text content for batch testing.
// Use single quotes to avoid escaping double quotes.
interface TextBeforeAfter {
  before: string;
  after: string;
}

const textBeforeAfterArray: TextBeforeAfter[] = [
  // Edge case: empty string.
  {
    before: "",
    after: "",
  },
  // Base case: no sanitization needed.
  {
    before: "text",
    after: "text",
  },
  // Routine cases forward.
  {
    before: ' " text " ',
    after: "text",
  },
  {
    before: ",.  text,.  ",
    after: "text",
  },
  {
    before: '".  text,"  ',
    after: "text",
  },
  {
    before: "hello, world",
    after: "hello, world",
  },
  {
    before: ",.  hello, world,.  ",
    after: "hello, world",
  },
  {
    before: '"hello,.,.      world"',
    after: "hello,.,.      world",
  },
];

// Batch test helper function for sanitizeText function.
function batchSanitizeTextExpectation(): void {
  for (const textBeforeAfter of textBeforeAfterArray) {
    oneSanitizeTextExpectation(textBeforeAfter);
  }
}

// Single test helper function for sanitizeText function.
function oneSanitizeTextExpectation({ before, after }: TextBeforeAfter): void {
  it(`returns the expected sanitized text: "${before}" -> "${after}"`, () => {
    expect(sanitizeText(before)).toBe(after);
  });
}

// -----------------------------------------------------------------------------
// Test suite for sanitizeText function.
describe("The sanitizeText fetch helper function", () => {
  batchSanitizeTextExpectation();
});
