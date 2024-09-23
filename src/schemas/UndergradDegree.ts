// ./src/schemas/UndergradDegree.ts
//
// UndergradDegree ZodSchema and type definition,
// plus corresponding native TypeScript tuple definition.

// Zod essential imports.
import { z, type ZodSchema } from "zod";

export const UndergradDegreeTuple = [
  "AA (Associate of Arts)",
  "AS (Associate of Science)",
  "BA (Bachelor of Arts)",
  "BS (Bachelor of Science)",
  "BFA (Bachelor of Fine Arts)",
  "BM (Bachelor of Music)",
  "BME (Bachelor of Music Education)",
  "BSD (Bachelor of Science in Design)",
] as const;

export const UndergradDegreeSchema: ZodSchema = z.enum(UndergradDegreeTuple);
export type UndergradDegree = z.infer<typeof UndergradDegreeSchema>;