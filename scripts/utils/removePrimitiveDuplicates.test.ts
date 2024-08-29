// ./scripts/utils/removePrimitiveDuplicates.test.ts
//
// Unittests for the removePrimitiveDuplicates utility function.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import removePrimitiveDuplicates from "@scripts/utils/removePrimitiveDuplicates";

// -----------------------------------------------------------------------------
// Test suite for the removePrimitiveDuplicates utility function.
describe("The removePrimitiveDuplicates utility function", () => {
  it("removes duplicate strings from an array", () => {
    const rawStrings: string[] = ["a", "a", "b", "b", "c"];
    const correctStrings: string[] = ["a", "b", "c"];
    const sanitizedStrings: string[] = removePrimitiveDuplicates(rawStrings);

    expect(sanitizedStrings).toStrictEqual(correctStrings);
    expect(sanitizedStrings).toMatchSnapshot();
  });

  it("removes duplicate numbers from an array", () => {
    const rawNumbers: number[] = [1, 1, 2, 2, 3];
    const correctNumbers: number[] = [1, 2, 3];
    const sanitizedNumbers: number[] = removePrimitiveDuplicates(rawNumbers);

    expect(sanitizedNumbers).toStrictEqual(correctNumbers);
    expect(sanitizedNumbers).toMatchSnapshot();
  });
});
