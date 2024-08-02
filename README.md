# @keminghe/osu

Unofficial and publicly-available NPM data-package about The Ohio State University.

> [!IMPORTANT]
> 
> Not affiliated with or endorsed by OSU in any way.
>
> * Publicly-available data about OSU undergrad majors [here](https://undergrad.osu.edu/majors-and-academics/majors).
> * Publicly-available data about OSU student organizations [here](https://activities.osu.edu/involvement/student_organizations).

## :gear: Installation

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
import { isNameDotNumber, isOSUEmail, isBuckeyemail, isOSUOrBuckeyemail } from '@keminghe/osu';
```

```typescript
const flag1 = isNameDotNumber('brutus.1');                    // true
const flag2 = isOSUEmail('brutus.1@osu.edu');                 // true
const flag3 = isBuckeyemail('brutus.1@buckeyemail.osu.edu');  // true
const flag4 = isOSUOrBuckeyemail('non-osu@email.com');        // false
```

### Using the `osu` Namespace

```typescript
import osu from '@keminghe/osu';
```

### Accessing Undergraduate Majors and Degrees

The `osu.undergrad` namespace contains publicly-available data about undergraduate programs.

```typescript
const majors = osu.undergrad.majors;
console.log(majors);
```

> [!NOTE]
>
> Certain majors are exploratory and are **NOT** associated with any degree.

```typescript
interface Major {
  major  : string;
  degree : string | null;
  campus : string;
  college: string;
}
```

### Accessing Student Organizations

The `osu` namespace provides publicly-available list of all student organizations.

```typescript
const studentOrgs = osu.studentOrgs;
console.log(studentOrgs);
```

```typescript
interface StudentOrg {
  name            : string;
  purposeStatement: string;
  affiliation     : string[];
}
```

## :blue_book: API

Coming soon... *or take a look at our source code*.

## :key: License

Usage indicates agreement with the **MIT** license. [More Info.](https://mit-license.org/)
