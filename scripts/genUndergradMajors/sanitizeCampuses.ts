// ./scripts/genUndergradMajors/sanitizeCampuses.ts
//
// Helper function to sanitize campus strings into valid array of campuses.

import removePrimitiveDuplicates from "@scripts/utils/removePrimitiveDuplicates";
// Local schema and util imports.
import { type Campus, CampusSchema } from "@src/schemas/Campus";

export default function sanitizeCampuses(campus: string): Campus[] | null {
  const sanitizedCampuses: Campus[] | null = [];

  // Short-circuit if raw campus is empty string.
  if (campus === "") {
    // console.warn(
    //   `[${sanitizeCampus.name}] Warning - Skipping empty campus string.`,
    // );
    return null;
  }

  // Handle special case: unify "ATI Wooster" to "Wooster".
  let preprocessedCampus: string = campus;
  if (campus.includes("ATI Wooster")) {
    sanitizedCampuses.push("Wooster");
    preprocessedCampus = campus.replace(/ATI Wooster/g, "");
  }

  // Split campus string by commas and process each part.
  const campusParts: string[] = preprocessedCampus.split(",");
  for (const part of campusParts) {
    const trimmedPart = part.trim();

    // Short-circuit if part is empty string.
    if (trimmedPart === "") {
      continue;
    }

    try {
      const parsedCampus = CampusSchema.parse(trimmedPart);
      sanitizedCampuses.push(parsedCampus);
      continue;
    } catch (error) {
      // Skip error if part is not a campus.
    }

    // Log error for unrecognized campus.
    console.error(
      `[${sanitizeCampuses.name}] Error - Skipping unrecognized campus: "${trimmedPart}".`,
    );
  }

  // Further sanitize campuses array by returning null if empty or removing duplicates.
  if (sanitizedCampuses.length === 0) {
    console.warn(
      `[${sanitizeCampuses.name}] Warning - No valid campuses found in campus string: "${campus}".`,
    );
    return null;
  }

  return removePrimitiveDuplicates(sanitizedCampuses);
}
