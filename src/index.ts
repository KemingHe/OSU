// ./src/index.ts
//
// OSU package entrypoint, specifically for browser-node agnostic utilities.

// OSU name-dot-number and email utility exports
export * from "@src/validators/validators";

// OSU fetch and data utility exports, with corresponding type exports.
export * from "@src/schemas/StudentOrg";
export * from "@src/studentOrgs/getStudentOrgs";

export * from "@src/schemas/UndergradMajor";
export * from "@src/undergradMajors/getUndergradMajors";

export * from "@src/schemas/ResearchPosting";
