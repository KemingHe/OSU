// ./scripts/genUndergradMajors/sanitizeDegrees.ts
//
// Helper function to sanitize degree strings into valid array of degrees.

// Local schema and util imports.
import degreeAbbreviationMap from "@scripts/genUndergradMajors/degreeAbbreviationMap";
import removePrimitiveDuplicates from "@scripts/utils/removePrimitiveDuplicates";
import type { UndergradDegree } from "@src/schemas/UndergradDegree";

/**
 * Sanitizes a degree string into a valid array of UndergradDegree objects.
 *
 * This function processes a comma-separated degree string, trims each part,
 * and maps recognized degree abbreviations to their corresponding UndergradDegree objects.
 * Unrecognized abbreviations are skipped with a warning.
 *
 * @param {string} degree - The raw degree string to be sanitized.
 * @returns {UndergradDegree[] | null} - An non-empty array of UndergradDegree objects, or null if no valid degrees were identified.
 */
export default function sanitizeDegrees(
  degree: string,
): UndergradDegree[] | null {
  const sanitizedDegrees: UndergradDegree[] | null = [];

  // Short-circuit if raw degree is empty string.
  if (degree === "") {
    // console.warn(
    //   `[${sanitizeDegree.name}] Warning - Skipping empty degree string.`,
    // );
    return null;
  }

  // Split degree string by commas and process each part.
  const degreeParts: string[] = degree.split(",");
  for (const part of degreeParts) {
    const trimmedPart = part.trim();

    // Short-circuit if part is empty string.
    if (trimmedPart === "") {
      continue;
    }

    // Use degree abbreviation map to get corresponding UndergradDegree.
    const fullDegree: UndergradDegree | undefined =
      degreeAbbreviationMap[trimmedPart];
    if (fullDegree) {
      sanitizedDegrees.push(fullDegree);

      // Log error for unrecognized degree abbreviation.
    } else {
      console.error(
        `[${sanitizeDegrees.name}] Error - Skipping unrecognized degree abbreviation: "${trimmedPart}".`,
      );
    }
  }

  // Further sanitize degrees array by returning null if empty or removing duplicates.
  if (sanitizedDegrees.length === 0) {
    console.warn(
      `[${sanitizeDegrees.name}] Warning - No valid degrees found in degree string: "${degree}".`,
    );
    return null;
  }

  return removePrimitiveDuplicates(sanitizedDegrees);
}
