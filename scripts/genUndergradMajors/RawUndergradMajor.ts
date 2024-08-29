// ./scripts/genUndergradMajors/RawUndergradMajor.ts
//
// ZodSchema (and type) for validating raw undergrad major data.

// Zod essential imports.
import { type ZodSchema, z } from "zod";

export const RawUndergradMajorSchema: ZodSchema = z.object({
  major  : z.string().min(1),
  degree : z.string(), // empty string when no degree.
  campus : z.string(), // empty string when no campus.
  college: z.string(), // empty string when no college.
});

/**
 * Type for raw undergrad major data inferred from the RawUndergradMajor schema.
 *
 * @typedef {Object} RawUndergradMajor
 * @property {string} major - The name of the undergrad major, represented by a non-empty string.
 * @property {string} degree - The degree associated with the major, represented by a non-empty string, or empty string if not applicable or missing data.
 * @property {string} campus - The campus where the major is offered, represented by a non-empty string, or empty string if not applicable or missing data.
 * @property {string} college - The college offering the major, represented by a non-empty string, or empty string if not applicable or missing data.
 */
export type RawUndergradMajor = z.infer<typeof RawUndergradMajorSchema>;
