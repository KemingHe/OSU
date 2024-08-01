// ./scripts/generate.ts
//
// Main function to run all generation scripts.

// Local generation function imports.
import genAllStudentOrgs from "@scripts/genAllStudentOrgs.js";
import genAllUndergradMajorsAndDegrees from "@scripts/genAllUndergradMajorsAndDegrees.js";

export default async function main(): Promise<void> {
  await genAllStudentOrgs();
  await genAllUndergradMajorsAndDegrees();
}

// Only run main() if NOT in testing environment.
if (process.env.NODE_ENV !== "test") {
  main();
}
