// ./src/schemas/UndergradMajor.ts
//
// UndergradMajor ZodSchema and type definition.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

// Local ZodSchema imports.
import { CampusSchema } from "@src/schemas/Campus";
import { CollegeSchema } from "@src/schemas/College";
import { UndergradDegreeSchema } from "@src/schemas/UndergradDegree";

export const UndergradMajorSchema: ZodSchema = z.object({
  major   : z.string().min(1),
  degrees : z.nullable(z.array(UndergradDegreeSchema).nonempty()),
  campuses: z.nullable(z.array(CampusSchema).nonempty()),
  college : z.nullable(CollegeSchema),
});

/**
 * TypeScript type inferred from the `UndergradMajor` Zod schema.
 *
 * This type represents the structure of an undergraduate major object as defined by the `UndergradMajor` schema.
 *
 * @typedef {Object} UndergradMajor
 * @property {string} major - Name of the major, represented by a non-empty string.
 * @property {UndergradDegree[] | null} degrees - Array of undergraduate degrees associated with the major, represented by a non-empty array of `UndergradDegree` objects, or null if not applicable or missing data.
 * @property {Campus[] | null} campuses - Campuses where the major is offered, represented by a non-empty array of `Campus` objects, or null if not applicable or missing data.
 * @property {College | null} college - College where the major belongs, represented by a `College` object, or null if not applicable or missing data.
 */
export type UndergradMajor = z.infer<typeof UndergradMajorSchema>;