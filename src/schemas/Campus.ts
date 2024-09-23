// ./src/schemas/Campus.ts
//
// OSU Campus ZodSchema and type definition,
// plus corresponding native TypeScript tuple definition.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

export const CampusTuple = [
  "Columbus",
  "Lima",
  "Marion",
  "Mansfield",
  "Newark",
  "Wooster",
] as const;

export const CampusSchema:ZodSchema = z.enum(CampusTuple);
export type Campus = z.infer<typeof CampusSchema>;