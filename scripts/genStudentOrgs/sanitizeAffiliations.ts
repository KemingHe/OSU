// ./scripts/genStudentOrgs/sanitizeAffiliations.ts
//
// Helper function to sanitize affiliation string into valid campuses and categories.

import removePrimitiveDuplicates from "@scripts/utils/removePrimitiveDuplicates";
// Local schema and util imports.
import { type Campus, CampusSchema } from "@src/schemas/Campus";
import {
  type StudentOrgCategory,
  StudentOrgCategorySchema,
} from "@src/schemas/StudentOrgCategory";

/**
 * Sanitizes an affiliation string to extract valid campuses and categories.
 *
 * This function processes the given affiliation string to identify and extract
 * valid campuses and categories. It handles special cases and ensures that the
 * resulting campuses and categories are valid according to the defined schemas.
 *
 * @param {string} affiliation - The affiliation string to be sanitized.
 *
 * @returns {Object} An object containing two arrays:
 * - `campuses`: An array of valid campuses extracted from the affiliation string, null if no valid campuses found.
 * - `categories`: An array of valid categories extracted from the affiliation string, null if no valid categories found.
 */
export default function sanitizeAffilications(affiliation: string): {
  campuses: Campus[] | null;
  categories: StudentOrgCategory[] | null;
} {
  let campuses: Campus[] | null = [];
  let categories: StudentOrgCategory[] | null = [];

  // Short-circuit if affiliation is empty string.
  if (affiliation === "") {
    // console.warn(
    //   `[${sanitizeAffilication.name}] Warning - Skipping empty affiliation string.`,
    // );
    return { campuses: null, categories: null };
  }

  // Handle special case: "Media, Journalism, and Creative Writing" category.
  let preprocessedAffiliation: string = affiliation;
  if (affiliation.includes("Media, Journalism, and Creative Writing")) {
    categories.push("Media, Journalism, and Creative Writing");
    preprocessedAffiliation = affiliation.replace(
      /Media, Journalism, and Creative Writing/g,
      "",
    );
  }

  // Split affiliation string by commas and process each part.
  const affiliationParts: string[] = preprocessedAffiliation.split(",");
  for (const part of affiliationParts) {
    const trimmedPart = part.trim();

    // Short-circuit if part is empty string.
    if (trimmedPart === "") {
      continue;
    }

    try {
      const parsedCampus = CampusSchema.parse(trimmedPart);
      campuses.push(parsedCampus);
      continue;
    } catch (error) {
      // Skip error if part is not a campus.
    }

    try {
      const parsedCategory = StudentOrgCategorySchema.parse(trimmedPart);
      categories.push(parsedCategory);
      continue;
    } catch (error) {
      // Skip error if part is not a category.
    }

    // Log error for unidentified campus or category.
    console.error(
      `[${sanitizeAffilications.name}] Error - Skipping unrecognized affiliation part: "${trimmedPart}".`,
    );
  }

  // Further sanitize campuses and categories arrays,
  // by setting to null if empty or removing duplicates.
  if (campuses.length === 0) {
    console.warn(
      `[${sanitizeAffilications.name}] Warning - No valid campuses found in full affiliation string: "${affiliation}".`,
    );
    campuses = null;
  } else {
    campuses = removePrimitiveDuplicates(campuses);
  }

  if (categories.length === 0) {
    console.warn(
      `[${sanitizeAffilications.name}] Warning - No valid categories found in full affiliation string: "${affiliation}".`,
    );
    categories = null;
  } else {
    categories = removePrimitiveDuplicates(categories);
  }

  return { campuses, categories };
}
