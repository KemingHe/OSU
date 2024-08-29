// ./src/schemas/StudentOrg.ts
//
// StudentOrg ZodSchema and type definition.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

// Local ZodSchema imports.
import { CampusSchema } from "@src/schemas/Campus";
import { StudentOrgCategorySchema } from "@src/schemas/StudentOrgCategory";

export const StudentOrgSchema: ZodSchema = z.object({
  name            : z.string().min(1),
  purposeStatement: z.nullable(z.string().min(1)),
  campuses        : z.nullable(z.array(CampusSchema).nonempty()),
  categories      : z.nullable(z.array(StudentOrgCategorySchema).nonempty()),
});

/**
 * TypeScript type inferred from the `StudentOrg` Zod schema.
 *
 * This type represents the structure of a student organization object as defined by the `StudentOrg` schema.
 *
 * @typedef {Object} StudentOrg
 * @property {string} name - Name of the student organization, represented by a non-empty string.
 * @property {string | null} purposeStatement - Purpose statement of the student organization, represented by a non-empty string, or null if not applicable or missing data.
 * @property {Campus[] | null} campuses - Campuses where the student organization is active, represented by a non-empty array of `Campus` objects, or null if not applicable or missing data.
 * @property {StudentOrgCategory[] | null} categories - Categories of the student organization, represented by a non-empty array of `StudentOrgCategory` objects, or null if not applicable or missing data.
 */
export type StudentOrg = z.infer<typeof StudentOrgSchema>;
