// ./scripts/genStudentOrgs/outFileHeader.ts
//
// Header for `./src/autoGenerated/latestAllStudentOrgs.ts`
// used in `./scripts/genStudentOrgs/index.ts`.

const outFileHeader: string = `// ./src/autoGenerated/latestAllStudentOrgs.ts
//
// AUTO-GENERATED on ${new Date().toISOString()}. DO NOT MODIFY.
// For details see "@scripts/genStudentOrgs/".

// Type imports.
import type { StudentOrg } from "@src/schemas/StudentOrg";

export const latestAllStudentOrgs: StudentOrg[] =\n`;

export default outFileHeader;