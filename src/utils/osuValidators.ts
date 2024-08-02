// ./src/utils/osuValidators.ts
//
// OSU-related validators using regex.

/**
 * Regular expression for validating OSU name.number format.
 * @type {RegExp}
 */
const osuNameDotNumberRegExp: RegExp = /^[a-z]+\.[1-9]\d*$/;

/**
 * Regular expression for validating OSU email addresses.
 * @type {RegExp}
 */
const osuEmailRegExp: RegExp = /^[a-z]+\.[1-9]\d*@osu\.edu$/;

/**
 * Regular expression for validating Buckeyemail addresses.
 * @type {RegExp}
 */
const buckeyemailRegExp: RegExp = /^[a-z]+\.[1-9]\d*@buckeyemail\.osu\.edu$/;

/**
 * Validates if the input string is in the OSU name.number format.
 * @param {string} nameDotNumber - The string to validate.
 * @returns {boolean} True if the string matches the OSU name.number format, otherwise false.
 */
export function isNameDotNumber(nameDotNumber: string): boolean {
  return osuNameDotNumberRegExp.test(nameDotNumber);
}

/**
 * Validates if the input string is an OSU email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address matches the OSU email format, otherwise false.
 */
export function isOSUEmail(email: string): boolean {
  return osuEmailRegExp.test(email);
}

/**
 * Validates if the input string is a Buckeyemail address.
 * @param {string} buckeyemail - The email address to validate.
 * @returns {boolean} True if the email address matches the Buckeyemail format, otherwise false.
 */
export function isBuckeyemail(buckeyemail: string): boolean {
  return buckeyemailRegExp.test(buckeyemail);
}

/**
 * Validates if the input string is either an OSU email address or a Buckeyemail address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address matches either the OSU email format or the Buckeyemail format, otherwise false.
 */
export function isOSUOrBuckeyemail(email: string): boolean {
  return isOSUEmail(email) || isBuckeyemail(email);
}
