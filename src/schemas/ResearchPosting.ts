// ./src/schemas/ResearchPosting.ts
//
// ResearchPosting ZodSchema and type definition.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

export const ResearchPostingSchema:ZodSchema = z.object({
  title              : z.string().min(1),
  link               : z.string().url(),
  applicationDeadline: z.nullable(z.string().min(1)),
  department         : z.nullable(z.string().min(1)),
  publicOrPrivate    : z.nullable(z.string().min(1)),
  hoursPerWeek       : z.nullable(z.string().min(1)),
  compensationTypes  : z.nullable(z.array(z.string().min(1)).nonempty()),
});

/**
 * TypeScript type inferred from the `ResearchPosting` Zod schema.
 *
 * This type represents the structure of a research posting object as defined by the `ResearchPosting` schema.
 *
 * @typedef {Object} ResearchPosting
 * @property {string} title - Title of the research posting, represented by a non-empty string.
 * @property {string} link - URL linking to the research posting, represented by a valid URL string.
 * @property {string | null} applicationDeadline - Application deadline, represented by a non-empty string, or null if not applicable or missing data.
 * @property {string | null} department - Department offering the research posting, represented by a non-empty string, or null if not applicable or missing data.
 * @property {string | null} publicOrPrivate - Indicates whether the posting is public or private, represented by a non-empty string, or null if not applicable or missing data.
 * @property {string | null} hoursPerWeek - Number of hours per week required, represented by a non-empty string, or null if not applicable or missing data.
 * @property {string[] | null} compensationTypes - Types of compensation offered, represented by a non-empty array of non-empty strings, or null if not applicable or missing data.
 */
export type ResearchPosting = z.infer<typeof ResearchPostingSchema>;