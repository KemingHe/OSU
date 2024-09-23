// ./src/schemas/StudentOrgCategory.ts
//
// StudentOrgCategory ZodSchema and type definition,
// plus corresponding native TypeScript tuple definition.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

export const StudentOrgCategoryTuple = [
  "Academic/College",
  "Awareness/Activism",
  "Community Service/Service Learning",
  "Creative and Performing Arts",
  "Ethnic/Cultural",
  "Governance Organizations",
  "Honoraries/Honor Societies",
  "Media, Journalism, and Creative Writing",
  "Religious/Spiritual",
  "Social Fraternities/Sororities",
  "Special Interest",
  "Sports and Recreation",
  "Technology",
  "Graduate",
  "Professional",
  "Undergraduate",
] as const;

export const StudentOrgCategorySchema: ZodSchema = z.enum(StudentOrgCategoryTuple);
export type StudentOrgCategory = z.infer<typeof StudentOrgCategorySchema>;