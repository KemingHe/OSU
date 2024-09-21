// ./src/undergradMajors/getUndergradMajors.test.ts
//
// Unittests for the getUndergradMajors module.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Local constant and utility imports.
import {
  type UndergradMajor,
  UndergradMajorSchema,
} from "@src/schemas/UndergradMajor";

// Testing module imports.
import { getUndergradMajors } from "@src/undergradMajors/getUndergradMajors";

// -----------------------------------------------------------------------------
// Test suite for the getUndergradMajors utility function.
describe("The getUndergradMajors utility function (currently static)", () => {
  it("returns an array of valid UndergradMajor objects", () => {
    const majors: UndergradMajor[] = getUndergradMajors();

    // Confirm the array is not empty and matches the snapshot.
    expect(majors).not.toHaveLength(0);
    expect(majors).toMatchSnapshot();

    // Validate the array of UndergradMajor objects against the schema.
    UndergradMajorSchema.array().parse(majors);
  });
});
