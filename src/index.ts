// ./src/index.ts
//
// OSU package entrypoint, for exporting all OSU-related classes and utilities.

// Local osu namespace imports.
import { osu } from "@src/osu";

// Local OSU-related type imports.

// Local utils and contant imports.
import {
  isBuckeyemail,
  isNameDotNumber,
  isOSUEmail,
  isOSUOrBuckeyemail,
} from "@src/utils/osuValidators";

// Main entrypoint exports,
// use named only to avoid dev-users typing package name every time.
export {
  // Utility exports.
  isBuckeyemail,
  isNameDotNumber,
  isOSUEmail,
  isOSUOrBuckeyemail,
  // OSU namespace exports.
  osu,
};

// IMPORTANT!!
// Remember to separately export all types and interfaces from main namespace,
// such that end-users could import them directly from the package.
export type StudentOrg = osu.StudentOrg;
export type Major = osu.undergrad.Major;
