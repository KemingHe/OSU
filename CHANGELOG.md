# Changelog

## [2.0.0](https://github.com/KemingHe/OSU/compare/v1.1.1...v2.0.0) (2024-08-29)


### ⚠ BREAKING CHANGES

* **schemas/:** * renamed isOSUEmail to isOSUDotEduEmail for clarity * renamed isNameDotNumber to
isNameDotNum for brivety * completely removed the osu namespace and sub-spaces in favor of importing
getResource functions to simplify usage

### Features

* **schemas/:** replaced osu namespace with flat config, i.e. getResoruce functions ([4109ff9](https://github.com/KemingHe/OSU/commit/4109ff9fd0df412aa7cca2951d2b8ee137decb44))

## [1.1.1](https://github.com/KemingHe/OSU/compare/v1.1.0...v1.1.1) (2024-08-03)

## [1.1.0](https://github.com/KemingHe/OSU/compare/v1.0.10...v1.1.0) (2024-08-03)


### Features

* **osuvalidators.ts:** added support for hyphened name dot number ([2f82508](https://github.com/KemingHe/OSU/commit/2f82508352367d19df2ff7c4c108d31fd1efac62)), closes [#7](https://github.com/KemingHe/OSU/issues/7) [#8](https://github.com/KemingHe/OSU/issues/8)

## [1.0.10](https://github.com/KemingHe/OSU/compare/v1.0.9...v1.0.10) (2024-08-02)


### Bug Fixes

* **publish-npm.yml:** added correct token and command to auth to npm ([9e15609](https://github.com/KemingHe/OSU/commit/9e15609905f204a1cb232e897db723bd718faa15)), closes [#5](https://github.com/KemingHe/OSU/issues/5)

## [1.0.9](https://github.com/KemingHe/OSU/compare/v1.0.8...v1.0.9) (2024-08-02)


### Bug Fixes

* **src/index.ts:** entrypoint now correctly exports student org and major types ([d6c958a](https://github.com/KemingHe/OSU/commit/d6c958ab47a6265acca06ec6e57fa61bcbf7e88b))

## [1.0.8](https://github.com/KemingHe/OSU/compare/v1.0.7...v1.0.8) (2024-08-02)


### Bug Fixes

* **package.json:** explicitly defined `files` to only publish necessary files ([6074802](https://github.com/KemingHe/OSU/commit/6074802e5c622a1b0340c747da02c6aff8adc79b))

## [1.0.7](https://github.com/KemingHe/OSU/compare/v1.0.6...v1.0.7) (2024-08-02)


### Bug Fixes

* **package.json:** npm pkg fixed package.json, added `git+` for repo url ([077b3d4](https://github.com/KemingHe/OSU/commit/077b3d40f755722b5fff04daa077ed929e20fea6))

## [1.0.6](https://github.com/KemingHe/OSU/compare/v1.0.5...v1.0.6) (2024-08-02)

## [1.0.5](https://github.com/KemingHe/OSU/compare/v1.0.4...v1.0.5) (2024-08-02)

## [1.0.4](https://github.com/KemingHe/OSU/compare/v1.0.3...v1.0.4) (2024-08-02)

## [1.0.3](https://github.com/KemingHe/OSU/compare/v1.0.2...v1.0.3) (2024-08-02)


### Bug Fixes

* **csv2ts.test.ts:** further removed error snapshot to accommodate Actions file path ([29dbdbb](https://github.com/KemingHe/OSU/commit/29dbdbbd3024c198781ef07b545d6d61925eca9c))

## [1.0.2](https://github.com/KemingHe/OSU/compare/v1.0.1...v1.0.2) (2024-08-02)

## [1.0.1](https://github.com/KemingHe/OSU/compare/v1.0.0...v1.0.1) (2024-08-02)


### Bug Fixes

* **scripts/utils/csv2ts.test.ts:** removed snapshot test to accommodate diff test env file paths ([f461757](https://github.com/KemingHe/OSU/commit/f4617575b4292c5c751830cb3ab912d75938e825))

## [1.0.0](https://github.com/KemingHe/OSU/compare/v0.4.0...v1.0.0) (2024-08-02)


### ⚠ BREAKING CHANGES

* **tsup.config.ts:** to unify exports, removed `osu` from default export, added `osu` back as a name
export, now must use `import { osu } from "@keminghe/osu";` to use the osu namespace and subsequent
namespaces, classes, and constants.

### Features

* **tsup.config.ts:** adopted tsup as bundler, enforced uniform named exports ([ef24365](https://github.com/KemingHe/OSU/commit/ef2436513c390c9cb203a2f0bd5cdfbe85f34e34))

## [0.4.0](https://github.com/KemingHe/OSU/compare/v0.3.0...v0.4.0) (2024-08-01)


### Features

* **csv2ts.ts:** extended generic csv 2 ts array util funtions ([7537250](https://github.com/KemingHe/OSU/commit/75372500acb1a3c268d50a34fbc3d1c92a3993b1))

## [0.3.0](https://github.com/KemingHe/OSU/compare/v0.2.0...v0.3.0) (2024-08-01)


### Features

* **scripts dir:** fully implemented and tested csv to ts auto generation scripts ([679bcb4](https://github.com/KemingHe/OSU/commit/679bcb4212a04b1dc22dbfa69186881a3f9d002f))

## 0.2.0 (2024-07-31)


### Features

* **src/utils/osuvalidators.ts:** added and fully tested osu validators ([c79afea](https://github.com/KemingHe/OSU/commit/c79afea7523fecd702c3446772e75390da493fa7))


### Bug Fixes

* **.release-it.json:** reverted error formatting by biomejs, release-it now functional ([f386262](https://github.com/KemingHe/OSU/commit/f386262fa00c3d0d814e38672d06c0af15c0f59a))
