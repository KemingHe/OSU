// ./src/schemas/College.ts
//
// OSU College ZodSchema and type definition,
// plus corresponding native TypeScript tuple definition.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

export const CollegeTuple = [
  "Architecture",
  "Arts and Sciences",
  "Business",
  "Dental Hygiene",
  "Dentistry",
  "Education and Human Ecology",
  "Engineering",
  "Environment and Natural Resources",
  "Food, Agricultural and Environmental Sciences",
  "Health and Rehabilitation Sciences",
  "Medicine",
  "Nursing",
  "Optometry",
  "Pharmacy",
  "Pre-Professional",
  "Public Affairs",
  "Public Health",
  "Social Work",
  "University Exploration",
] as const;

export const CollegeSchema:ZodSchema = z.enum(CollegeTuple);
export type College = z.infer<typeof CollegeSchema>;