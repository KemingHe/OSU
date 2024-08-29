// ./scripts/genStudentOrgs/sanitizeStudentOrgs.ts
//
// Sanitize raw student organization data into valid student organization data.

// Local schema imports.
import type { RawStudentOrg } from "@scripts/genStudentOrgs/RawStudentOrg";
import type { Campus } from "@src/schemas/Campus";
import type { StudentOrg } from "@src/schemas/StudentOrg";
import type { StudentOrgCategory } from "@src/schemas/StudentOrgCategory";

// Local utility imports.
import sanitizeAffilications from "@scripts/genStudentOrgs/sanitizeAffiliations";

export default function sanitizeStudentOrgs(
  data: RawStudentOrg[],
): StudentOrg[] {
  const sanitizedStudentOrgs: StudentOrg[] = [];
  for (const dataPoint of data) {
    // Destructure each data point to obtain raw data sub-fields.
    const {
      name,
      purposeStatement,
      affiliation,
    }: {
      name: string;
      purposeStatement: string;
      affiliation: string;
    } = dataPoint;

    // Sanitize each data sub-field.
    const sanitizedPurposeStatement: string | null =
      purposeStatement === "" ? null : purposeStatement;
    const {
      campuses: sanitizedCampuses,
      categories: sanitizedCategories,
    }: {
      campuses: Campus[] | null;
      categories: StudentOrgCategory[] | null;
    } = sanitizeAffilications(affiliation);

    // Emit warning for valid/potentially error null fields.
    if (sanitizedPurposeStatement === null) {
      console.warn(
        `[${sanitizeStudentOrgs.name}] Warning - Student org: "${name}" has null (empty) purpose statement.`,
      );
    }

    if (sanitizedCampuses === null) {
      console.warn(
        `[${sanitizeStudentOrgs.name}] Warning - Student org: "${name}" has null (empty) campuses.`,
      );
    }

    if (sanitizedCategories === null) {
      console.warn(
        `[${sanitizeStudentOrgs.name}] Warning - Student org: "${name}" has null (empty) categories.`,
      );
    }

    // Push sanitized data to studentOrgs array.
    sanitizedStudentOrgs.push({
      name,
      purposeStatement: sanitizedPurposeStatement,
      campuses: sanitizedCampuses,
      categories: sanitizedCategories,
    });
  }

  console.log(
    `\x1b[36m[${sanitizeStudentOrgs.name}]\x1b[0m \x1b[32mSuccessfully\x1b[0m sanitized ${sanitizedStudentOrgs.length} student organizations.`,
  );
  return sanitizedStudentOrgs;
}
