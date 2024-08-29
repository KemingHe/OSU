// ./src/utils/validators.ts
//
// OSU-related validators using regex.

/**
 * Regular expression for validating OSU name.number format.
 * @type {RegExp}
 */
export const NAME_DOT_NUM_PATTERN: RegExp = /^[a-z]+(-[a-z]+)*\.[1-9]\d*$/;

/**
 * Regular expression for validating OSU email addresses.
 * @type {RegExp}
 */
export const OSU_DOT_EDU_EMAIL_PATTERN: RegExp =
  /^[a-z]+(-[a-z]+)*\.[1-9]\d*@osu\.edu$/;

/**
 * Regular expression for validating Buckeyemail addresses.
 * @type {RegExp}
 */
export const BUCKEYEMAIL_PATTERN: RegExp =
  /^[a-z]+(-[a-z]+)*\.[1-9]\d*@buckeyemail\.osu\.edu$/;

/**
 * Validates if the input string is in the OSU name.number format.
 * @param {string} nameDotNum - The string to validate.
 * @returns {boolean} True if the string matches the OSU name.number format, otherwise false.
 */
export function isNameDotNum(nameDotNum: string): boolean {
  return NAME_DOT_NUM_PATTERN.test(nameDotNum);
}

/**
 * Validates if the input string is an OSU email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address matches the OSU email format, otherwise false.
 */
export function isOSUDotEduEmail(email: string): boolean {
  return OSU_DOT_EDU_EMAIL_PATTERN.test(email);
}

/**
 * Validates if the input string is a Buckeyemail address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address matches the Buckeyemail format, otherwise false.
 */
export function isBuckeyemail(email: string): boolean {
  return BUCKEYEMAIL_PATTERN.test(email);
}

/**
 * Validates if the input string is a valid general OSU email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address matches the general OSU email format, otherwise false.
 */
export function isOSUEmail(email: string): boolean {
  return isOSUDotEduEmail(email) || isBuckeyemail(email);
}
