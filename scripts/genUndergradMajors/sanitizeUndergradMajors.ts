// ./scripts/genUndergradMajors/sanitizeUndergradMajors.ts
//
// Sanitize raw undergrad major data into valid undergrad major data.

// Local schema and util imports.
import type { RawUndergradMajor } from "@scripts/genUndergradMajors/RawUndergradMajor";
import sanitizeCampuses from "@scripts/genUndergradMajors/sanitizeCampuses";
import sanitizeDegrees from "@scripts/genUndergradMajors/sanitizeDegrees";
import type { Campus } from "@src/schemas/Campus";
import type { UndergradDegree } from "@src/schemas/UndergradDegree";
import type { UndergradMajor } from "@src/schemas/UndergradMajor";

export default function sanitizeUndergradMajors(
  data: RawUndergradMajor[],
): UndergradMajor[] {
  const sanitizedUndergradMajors: UndergradMajor[] = [];
  for (const dataPoint of data) {
    // Destructure each data point to obtain raw data sub-fields.
    const {
      major,
      degree,
      campus,
      college,
    }: {
      major: string;
      degree: string;
      campus: string;
      college: string;
    } = dataPoint;

    // Sanitize each data sub-field.
    // biome-ignore format: added alignment for clarity.
    const sanitizedDegrees  : UndergradDegree[] | null = sanitizeDegrees(degree);
    // biome-ignore format: added alignment for clarity.
    const sanitizedCampuses : Campus[]          | null = sanitizeCampuses(campus);
    // biome-ignore format: added alignment for clarity.
    const sanitizedCollege  : string            | null = college === "" ? null : college;

    // Emit warning for valid/potentially error null fields.
    if (sanitizedDegrees === null) {
      console.warn(
        `[${sanitizeUndergradMajors.name}] Warning - Undergrad major: "${major}" has null (empty) degrees.`,
      );
    }

    if (sanitizedCampuses === null) {
      console.warn(
        `[${sanitizeUndergradMajors.name}] Warning - Undergrad major: "${major}" has null (empty) campuses.`,
      );
    }

    if (sanitizedCollege === null) {
      console.warn(
        `[${sanitizeUndergradMajors.name}] Warning - Undergrad major: "${major}" has null (empty) college.`,
      );
    }

    // Push sanitized data to undergradMajors array.
    sanitizedUndergradMajors.push({
      major,
      degrees: sanitizedDegrees,
      campuses: sanitizedCampuses,
      college: sanitizedCollege,
    });
  }

  console.log(
    `\x1b[36m[${sanitizeUndergradMajors.name}]\x1b[0m \x1b[32mSuccessfully\x1b[0m sanitized ${sanitizedUndergradMajors.length} undergrad majors.`,
  );
  return sanitizedUndergradMajors;
}
