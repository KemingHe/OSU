// ./scripts/genUndergradMajors/degreeAbbreviationMap.ts
//
// Map of degree abbreviations to full degree names.

// Local schema imports.
import type { UndergradDegree } from "@src/schemas/UndergradDegree";

const degreeAbbreviationMap: Record<string, UndergradDegree> = {
  AA: "AA (Associate of Arts)",
  AS: "AS (Associate of Science)",
  BA: "BA (Bachelor of Arts)",
  BS: "BS (Bachelor of Science)",
  BFA: "BFA (Bachelor of Fine Arts)",
  BM: "BM (Bachelor of Music)",
  BME: "BME (Bachelor of Music Education)",
  BSD: "BSD (Bachelor of Science in Design)",
};

export default degreeAbbreviationMap;
