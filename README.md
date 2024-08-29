# @keminghe/osu

<div align=center>
  <img
    src="https://socialify.git.ci/KemingHe/OSU/image?description=1&descriptionEditable=Unofficial%20and%20publicly-available%20NPM%20data-package%20about%20%0AThe%20Ohio%20State%20University.&language=1&name=1&owner=1&theme=Light"
    alt="Unofficial and publicly-available NPM data-package about The Ohio State University."
    width="640"
    height="320"
  />
</div>
<br/>
<div align="center">
  <a href="https://en.wikipedia.org/wiki/CommonJS" >
    <img
      src="https://img.shields.io/badge/Supports-CommonJS-yellow"
      alt="supports CommonJS (link to wiki)"
    />
  </a>
  <span>&nbsp;</span>
  <a href="https://codecov.io/gh/KemingHe/ECMAScript" >
    <img
      src="https://img.shields.io/badge/Supports-ECMAScript-purple"
      alt="suports ECMAScript (link to wiki)"
    />
  </a>
  <span>&nbsp;</span>
  <a href="https://nodejs.org/en" >
    <img
      src="https://img.shields.io/badge/Supports-node14+-blue"
      alt="supports node14+ (link to nodejs.org)"
    />
  </a>
  <span>&nbsp;</span>
  <a href="https://codecov.io/gh/KemingHe/OSU" >
    <img
      src="https://codecov.io/gh/KemingHe/OSU/graph/badge.svg?token=WBJAbAtPTt"
      alt="dynamic codcov percentage badge"
    />
  </a>
</div>
<br/>

> [!IMPORTANT]
>
> **Versions 1.1.0 and below are DEPRECATED!** Please upgrade to the latest version.

> [!NOTE]
>
> Build by students, for students, with :heart:. **NOT** affiliated nor endorsed by official OSU.
>
> * Publicly-available data about OSU undergrad majors [here](https://undergrad.osu.edu/majors-and-academics/majors).
> * Publicly-available data about OSU student organizations [here](https://activities.osu.edu/involvement/student_organizations).

## :gear: Installation

Requires [Node.js](https://nodejs.org/en/download/package-manager) >= **14**

```bash
# Using npm:
npm install @keminghe/osu

# Using yarn:
yarn add @keminghe/osu

# Using pnpm: (recommended)
pnpm add @keminghe/osu
```

## :rocket: Quickstart

### Using Validators

```typescript
// Using OSU email validator functions.
import {
  isNameDotNum,
  isOSUDotEduEmail,
  isBuckeyemail,
  isOSUEmail,
} from "@keminghe/osu";

isNameDotNum("buckeye.1");                      // true
isOSUDotEduEmail("buckeye.1@osu.edu");          // true
isBuckeyemail("buckeye.1@buckeyemail.osu.edu"); // true
isOSUEmail("non-osu@gmail.com");                // false
```

### Using RegExp Patterns

```typescript
// Using OSU name dot num and email RegExp patterns.
import {
  NAME_DOT_NUM_PATTERN,
  OSU_DOT_EDU_EMAIL_PATTERN,
  BUCKEYEMAIL_PATTERN
} from "@keminghe/osu";

NAME_DOT_NUM_PATTERN.test("buckeye.1");                         // true
OSU_DOT_EDU_EMAIL_PATTERN.test("buckeye.1@osu.edu");            // true
BUCKEYEMAIL_PATTERN.test("buckeyemail.1@buckeyemail.osu.edu");  // true
```

### Accessing Undergrad Majors Data

```typescript
import { getUndergradMajors, type UndergradMajor } from "@keminghe/osu";

const majors: UndergradMajor[] = getUndergradMajors();
console.log(majors);
```

### Accessing Student Organization Data

```typescript
import { getStudentOrgs, type StudentOrg } from "@keminghe/osu";

const orgs: StudentOrg[] = getStudentOrgs();
console.log(orgs);
```

<details>
<summary>DEPRECATED v1.1.0 Documentation</summary>

### (DEPRECATED v1.1.0) Using Validators

```typescript
import { isNameDotNumber, isOSUEmail, isBuckeyemail, isOSUOrBuckeyemail } from "@keminghe/osu";
```

```typescript
const flag1 = isNameDotNumber("brutus.1");                    // true
const flag2 = isNameDotNumber("adams-brown-catlyn.3");        // true
const flag3 = isOSUEmail("brutus.1@osu.edu");                 // true
const flag4 = isBuckeyemail("brutus.1@buckeyemail.osu.edu");  // true
const flag5 = isOSUOrBuckeyemail("non-osu@email.com");        // false
```

### (DEPRECATED v1.1.0) Accessing Undergraduate Majors and Degrees

```typescript
import osu from "@keminghe/osu";

const majors = osu.undergrad.majors;
console.log(majors);
```

### (DEPRECATED v1.1.0) Accessing Student Organizations

```typescript
import osu from "@keminghe/osu";

const studentOrgs = osu.studentOrgs;
console.log(studentOrgs);
```

</details>

## :blue_book: API

### `StudentOrg` Type

```typescript path=src/schemas/StudentOrg.ts
/**
 * TypeScript type inferred from the `StudentOrg` Zod schema.
 *
 * This type represents the structure of a student organization object as defined by the `StudentOrg` schema.
 *
 * @typedef {Object} StudentOrg
 * @property {string} name - Name of the student organization, represented by a non-empty string.
 * @property {string | null} purposeStatement - Purpose statement of the student organization, represented by a non-empty string, or null if not applicable or missing data.
 * @property {Campus[] | null} campuses - Campuses where the student organization is active, represented by a non-empty array of `Campus` objects, or null if not applicable or missing data.
 * @property {StudentOrgCategory[] | null} categories - Categories of the student organization, represented by a non-empty array of `StudentOrgCategory` objects, or null if not applicable or missing data.
 */
export type StudentOrg = z.infer<typeof StudentOrgSchema>;
```

### `UndergradMajor` Type

```typescript path=src/schemas/UndergradMajor.ts
/**
 * TypeScript type inferred from the `UndergradMajor` Zod schema.
 *
 * This type represents the structure of an undergraduate major object as defined by the `UndergradMajor` schema.
 *
 * @typedef {Object} UndergradMajor
 * @property {string} major - Name of the major, represented by a non-empty string.
 * @property {UndergradDegree[] | null} degrees - Array of undergraduate degrees associated with the major, represented by a non-empty array of `UndergradDegree` objects, or null if not applicable or missing data.
 * @property {Campus[] | null} campuses - Campuses where the major is offered, represented by a non-empty array of `Campus` objects, or null if not applicable or missing data.
 * @property {College | null} college - College where the major belongs, represented by a `College` object, or null if not applicable or missing data.
 *
 * @see {@link UndergradMajorInterface} for the equivalent native TypeScript interface.
 */
export type UndergradMajor = z.infer<typeof UndergradMajorSchema>;
```

## :key: License

Usage indicates agreement with the **MIT** license. [More Info.](https://mit-license.org/)

## :seedling: Community

![Alt](https://repobeats.axiom.co/api/embed/918a96fb67e64cd9979c35e7bfbd51dd9417e11e.svg "Repobeats analytics image")
