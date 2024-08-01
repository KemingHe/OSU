// ./src/index.ts
//
// OSU package entrypoint, for exporting all OSU-related classes and utilities.

// Local osu namespace and utilities imports.
import osu from "@src/osu.js";
import {
  isBuckeyemail,
  isNameDotNumber,
  isOSUEmail,
  isOSUOrBuckeyemail,
} from "@src/utils/osuValidators.js";

// Main entrypoint exports.
export default osu;
export { isBuckeyemail, isNameDotNumber, isOSUEmail, isOSUOrBuckeyemail };
