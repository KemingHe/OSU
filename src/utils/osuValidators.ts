// ./src/utils/osuValidators.ts
//
// OSU-related validators using regex.

// OSU-related RegEx patterns.
const osuNameDotNumberRegExp: RegExp = /^[a-z]+\.[1-9]\d*$/;
const osuEmailRegExp: RegExp = /^[a-z]+\.[1-9]\d*@osu\.edu$/;
const buckeyemailRegExp: RegExp = /^[a-z]+\.[1-9]\d*@buckeyemail\.osu\.edu$/;

// OSU-related validators.
export function isOSUNameDotNumber(nameDotNumber: string): boolean {
  return osuNameDotNumberRegExp.test(nameDotNumber);
}

export function isOSUEmail(email: string): boolean {
  return osuEmailRegExp.test(email);
}

export function isBuckeyemail(buckeyemail: string): boolean {
  return buckeyemailRegExp.test(buckeyemail);
}

export function isOSUEmailOrBuckeyemail(email: string): boolean {
  return isOSUEmail(email) || isBuckeyemail(email);
}
