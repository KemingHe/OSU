// ./src/index.ts
//
// OSU package entrypoint, for exporting all and utilities.

// OSU name-dot-number and email utility exports
export * from "@src/utils/validators";

// OSU fetch and data utility exports, with corresponding type exports.
export * from "@src/utils/getStudentOrgs";
export type { StudentOrg } from "@src/schemas/StudentOrg";

export * from "@src/utils/getUndergradMajors";
export type { UndergradMajor } from "@src/schemas/UndergradMajor";
