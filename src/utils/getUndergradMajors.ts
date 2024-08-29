// ./src/utils/getUndergradMajors.ts
//
// Utility functions to retrieve undergraduate major data.

// Local type, constants, and utility imports.
import { latestAllUndergradMajors } from "@src/autoGenerated/latestAllUndergradMajors";
import type { UndergradMajor } from "@src/schemas/UndergradMajor";

export function getUndergradMajors(): UndergradMajor[] {
  return latestAllUndergradMajors;
}

// TODO: Implement async version with option to use cache.
// export function getUndergradMajorsAsync(): Promise<UndergradMajor[]> {
//   return Promise.resolve(getUndergradMajors());
// }
