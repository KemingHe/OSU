// ./src/schemas/UndergradMajor.test.ts
//
// Unittests for the OSU undergraduate major zod schema.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import { UndergradMajorSchema, type UndergradMajor } from "@src/schemas/UndergradMajor";

// -----------------------------------------------------------------------------
// Constant valid and invalid undergraduate major strings for batch testing.
const validUndergradMajorObjects: UndergradMajor[] = [
  {
    major: "Simple Major",
    degrees: null,
    campuses: null,
    college: null,
  },
  {
    major: "Another Major",
    degrees: [
      "AS (Associate of Science)",
      "BS (Bachelor of Science)",
    ],
    campuses: null,
    college: null,
  },
  {
    major: "Third Major",
    degrees: null,
    campuses: [
      "Columbus",
      "Lima",
      "Wooster",
    ],
    college: null,
  },
  {
    major: "Fourth Major",
    degrees: null,
    campuses: null,
    college: "Engineering",
  },
  {
    "major": "Agricultural Communication",
    "degrees": [
      "AS (Associate of Science)"
    ],
    "campuses": [
      "Wooster"
    ],
    "college": "Food, Agricultural and Environmental Sciences"
  },
];

const invalidUndergradMajorObjects: Partial<UndergradMajor>[] = [
  {},
  {
    degrees: null,
  },
  {
    major: "",
    degrees: null,
    campuses: null,
    college: null,
  },
  {
    major: "Invalid Major",
    degrees: [],
    campuses: [
      "Columbus",
    ],
    college: null,
  },
  {
    major: "Invalid Major 2",
    degrees: null,
    campuses: [
      "Columbus  ",
    ],
    college: "Engineering",
  },
  {
    major: "Invalid Major 3",
    degrees: null,
    campuses: null,
    college: "Invalid College",
  },
];

// -----------------------------------------------------------------------------
// Test suite for the UndergradMajorSchema zod schema.
describe("The UndergradMajorSchema zod schema", () => {
  it("matches the snapshot", () => {
    expect(UndergradMajorSchema).toMatchSnapshot();
  });

  it("parses valid undergraduate major objects", () => {
    for (const validUndergradMajorObject of validUndergradMajorObjects) {
      expect(UndergradMajorSchema.safeParse(validUndergradMajorObject).success).toBe(true);
    }
  });

  it("fails to parse invalid undergraduate major objects", () => {
    for (const invalidUndergradMajorObject of invalidUndergradMajorObjects) {
      expect(UndergradMajorSchema.safeParse(invalidUndergradMajorObject).success).toBe(false);
    }
  });
});
