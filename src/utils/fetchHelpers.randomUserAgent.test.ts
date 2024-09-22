// ./src/utils/fetchHelpers.randomUserAgent.test.ts
//
// Unittests for the randomUserAgent function in fetchHelpers.ts.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Local constant import.
import UserAgents from "@src/constants/userAgents";

// Testing target import.
import { randomUserAgent } from "@src/utils/fetchHelpers";

// -----------------------------------------------------------------------------
// Test suite for randomUserAgent function.
describe("The randomUserAgent fetch helper function", () => {
  for (let i = 0; i < 10; i++) {
    it("returns a random user agent string from the UserAgents constant", () => {
      // Call the randomUserAgent function.
      const userAgent: string = randomUserAgent();

      // Expect the returned user agent to be a string.
      expect(typeof userAgent).toBe("string");

      // Expect the returned user agent to be a valid user agent string.
      expect(UserAgents.includes(userAgent)).toBe(true);
    });
  }
});
