// ./scripts/generate.ts
//
// Main function to run all generation scripts.

// Local generation function imports.
import genStudentOrgs from "@scripts/genStudentOrgs/index";
import genUndergradMajors from "@scripts/genUndergradMajors/index";

export default async function main(): Promise<void> {
  await genStudentOrgs();
  await genUndergradMajors();
}

// Only run main() if NOT in testing environment.
if (process.env.NODE_ENV !== "test") {
  main();
}
