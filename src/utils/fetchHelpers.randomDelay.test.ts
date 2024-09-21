// ./src/utils/fetchHelpers.randomDelay.test.ts
//
// Unittests for the randomDelay function in fetchHelpers.ts.

// Vitest essential imports.
import { describe, expect, it, vi } from "vitest";

// Testing target import.
import { type RandomDelayOptions, randomDelay } from "@src/utils/fetchHelpers";

// -----------------------------------------------------------------------------
// RandomDelayOption array for batch testing.
const validRandomDelayOptions: RandomDelayOptions[] = [
  { min: 0, max: 25 },
  { min: 25, max: 25 },
  { min: 25, max: 50 },
  { min: 50, max: 50 },
];

// Batch test helper function for randomDelay function.
async function batchRandomDelayExpectation(): Promise<void> {
  for (const options of validRandomDelayOptions) {
    await oneRandomDelayExpectation(options);
  }
}

async function oneRandomDelayExpectation({
  min,
  max,
}: RandomDelayOptions): Promise<void> {
  it(`returns a promise that resolves after a random delay within the specified range: {min: ${min}, max:${max}}`, async () => {
    // Monitor setTimeout calls.
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

    // Call the randomDelay function.
    await randomDelay({ min, max });

    // Expect setTimeout to be called once
    // with a random delay within the specified range.
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    if (setTimeoutSpy.mock.calls?.[0]?.[1]) {
      const delay: number = setTimeoutSpy.mock.calls[0][1];
      expect(delay).toBeGreaterThanOrEqual(min);
      expect(delay).toBeLessThanOrEqual(max);
    } else {
      throw new Error("setTimeout not called with expected arguments.");
    }

    // Restore setTimeout spy.
    setTimeoutSpy.mockRestore();
  });
}

// Test suite for randomDelay function.
describe("The randomDelay fetch helper function", () => {
  batchRandomDelayExpectation();

  it("throws an error if minimum delay is less than 0", async () => {
    await expect(
      randomDelay({ min: -1, max: 0 }),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("throws an error if maximum delay is less than or equal to 0", async () => {
    await expect(
      randomDelay({ min: 0, max: -1 }),
    ).rejects.toThrowErrorMatchingSnapshot();
    await expect(
      randomDelay({ min: 0, max: 0 }),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("throws an error if maximum delay is less than minimum delay", async () => {
    await expect(
      randomDelay({ min: 100, max: 50 }),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
