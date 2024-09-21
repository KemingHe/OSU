// ./src/schemas/ResearchPosting.test.ts
//
// Unittests for the OSU research posting zod schema.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing module imports.
import { ResearchPostingSchema, type ResearchPosting } from "@src/schemas/ResearchPosting";

// -----------------------------------------------------------------------------
// Constant valid and invalid research posting objects for batch testing.
const validResearchPostingObjects: ResearchPosting[] = [
  {
    title: "Keeping axons alive",
    link: "https://ugresearch.osu.edu/research-postings/keeping-axons-alive",
    applicationDeadline: "January 1 2025",
    department: "Neurology Neuroscience Research Institute",
    publicOrPrivate: "Public",
    hoursPerWeek: "20",
    compensationTypes: [
      "Academic Credit",
      "Salary / Stipend",
      "Work-Study",
      "Voluntary Experience"
    ],
  },
  {
    title: "Keeping axons alive",
    link: "https://ugresearch.osu.edu/research-postings/keeping-axons-alive",
    applicationDeadline: null,
    department: null,
    publicOrPrivate: null,
    hoursPerWeek: null,
    compensationTypes: null,
  },
  {
    title: "Keeping axons alive",
    link: "https://ugresearch.osu.edu/research-postings/keeping-axons-alive",
    applicationDeadline: null,
    department: null,
    publicOrPrivate: null,
    hoursPerWeek: null,
    compensationTypes: ["Academic Credit"],
  },
];

const invalidResearchPostingObjects: Partial<ResearchPosting>[] = [
  {},
  {
    title: "",
    link: "https://ugresearch.osu.edu/research-postings/keeping-axons-alive",
  },
  {
    title: "",
    link: "https://ugresearch.osu.edu/research-postings/keeping-axons-alive",
    applicationDeadline: "January 1 2025",
    department: "Neurology Neuroscience Research Institute",
    publicOrPrivate: "Public",
    hoursPerWeek: "20",
    compensationTypes: [
      "Academic Credit",
      "Salary / Stipend",
      "Work-Study",
      "Voluntary Experience"
    ],
  },
  {
    title: "Keeping axons alive",
    link: "Keeping axons alive",
    applicationDeadline: "January 1 2025",
    department: "Neurology Neuroscience Research Institute",
    publicOrPrivate: "Public",
    hoursPerWeek: "20",
    compensationTypes: [
      "Academic Credit",
      "Salary / Stipend",
      "Work-Study",
      "Voluntary Experience"
    ],
  },
  {
    title: "Keeping axons alive",
    link: "https://ugresearch.osu.edu/research-postings/keeping-axons-alive",
    applicationDeadline: "",
    department: "",
    publicOrPrivate: "",
    hoursPerWeek: "",
    compensationTypes: [],
  },
  {
    title: "Keeping axons alive",
    link: "https://ugresearch.osu.edu/research-postings/keeping-axons-alive",
    applicationDeadline: null,
    department: null,
    publicOrPrivate: null,
  },
  {
    title: "Keeping axons alive",
    link: "https://ugresearch.osu.edu/research-postings/keeping-axons-alive",
    applicationDeadline: null,
    department: null,
    publicOrPrivate: null,
    hoursPerWeek: null,
    compensationTypes: [""],
  }
];

// -----------------------------------------------------------------------------
// Test suite for the ResearchPosting zod schema.
describe("The ResearchPosting zod schema", () => {
  it("matches the snapshot", () => {
    expect(ResearchPostingSchema).toMatchSnapshot();
  });

  it("parses valid research posting objects", () => {
    for (const validResearchPostingObject of validResearchPostingObjects) {
      expect(ResearchPostingSchema.safeParse(validResearchPostingObject).success).toBe(true);
    }
  });

  it("fails to parse invalid research posting objects", () => {
    for (const invalidResearchPostingObject of invalidResearchPostingObjects) {
      expect(ResearchPostingSchema.safeParse(invalidResearchPostingObject).success).toBe(false);
    }
  });
});
