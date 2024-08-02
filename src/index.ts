// ./src/index.ts
//
// OSU package entrypoint, for exporting all OSU-related classes and utilities.

// Local osu namespace and utilities imports.
import osu from "@src/osu";
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
