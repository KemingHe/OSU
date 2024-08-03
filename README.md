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
> Build by students, for students, with :heart:. **NOT** affiliated nor endorsed by official OSU.
>
> * Publicly-available data about OSU undergrad majors [here](https://undergrad.osu.edu/majors-and-academics/majors).
> * Publicly-available data about OSU student organizations [here](https://activities.osu.edu/involvement/student_organizations).

## :gear: Installation

Required: Node >= 14

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
const flag2 = isNameDotNumber('adams-brown-catlyn.3');        // true
const flag3 = isOSUEmail('brutus.1@osu.edu');                 // true
const flag4 = isBuckeyemail('brutus.1@buckeyemail.osu.edu');  // true
const flag5 = isOSUOrBuckeyemail('non-osu@email.com');        // false
```

### Accessing Undergraduate Majors and Degrees

```typescript
import osu from '@keminghe/osu';

const majors = osu.undergrad.majors;
console.log(majors);
```

### Accessing Student Organizations

```typescript
import osu from '@keminghe/osu';

const studentOrgs = osu.studentOrgs;
console.log(studentOrgs);
```

## :blue_book: API

```typescript
interface StudentOrg {
  name            : string;
  purposeStatement: string;
  affiliation     : string[];
}
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

## :key: License

Usage indicates agreement with the **MIT** license. [More Info.](https://mit-license.org/)

## :seedling: Community

![Alt](https://repobeats.axiom.co/api/embed/918a96fb67e64cd9979c35e7bfbd51dd9417e11e.svg "Repobeats analytics image")
