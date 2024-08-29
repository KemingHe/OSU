// ./scripts/genStudentOrgs/RawStudentOrg.ts
//
// ZodSchema (and type) for validating raw student organization data.

// Zod essential imports.
import { type ZodSchema, z } from "zod";

export const RawStudentOrgSchema: ZodSchema = z.object({
  name            : z.string().min(1),
  purposeStatement: z.string(), // emptry string when no purpose statement.
  affiliation     : z.string(), // emptry string when no affiliation.
});

/**
 * Type for raw student organization data inferred from the RawStudentOrg schema.
 *
 * @typedef {Object} RawStudentOrg
 * @property {string} name - The name of the student organization, represented by a non-empty string.
 * @property {string} purposeStatement - The purpose statement of the organization, represented by a non-empty string, or empty string if not applicable or missing data.
 * @property {string} affiliation - The affiliation of the student organization, represented by a non-empty string, or empty string if not applicable or missing data.
 */
export type RawStudentOrg = z.infer<typeof RawStudentOrgSchema>;
