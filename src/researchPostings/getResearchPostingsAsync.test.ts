// ./src/researchPostings/getResearchPostingsAsync.test.ts
//
// Behavior tests for the getResearchPostingsAsync module.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Local constant and utility imports.
import {
  type ResearchPosting,
  ResearchPostingSchema,
} from "@src/schemas/ResearchPosting";

// Testing target import.
import { getResearchPostingsAsync } from "@src/researchPostings/getResearchPostingsAsync";

// -----------------------------------------------------------------------------
// Test suite for the getResearchPostingsAsync utility function.
describe("The getResearchPostingsAsync utility function (currently async)", () => {
  it("returns an array of valid ResearchPosting objects", async () => {
    const postings: ResearchPosting[] | undefined =
      await getResearchPostingsAsync();

    if (postings) {
      // Confirm the array is not empty.
      expect(postings).not.toHaveLength(0);

      // Validate the array of ResearchPosting objects against the schema.
      ResearchPostingSchema.array().parse(postings);

      // Else treat as and throw error for no posting found.
    } else {
      throw new Error("No research postings found. Please investigate.");
    }
  });
});
