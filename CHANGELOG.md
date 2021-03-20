# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2021-03-20

### Added

- this changelog
- CommonJS version separate from UMD (`pretty-money.js`)
- ESM version for use in modern browsers (`pretty-money.modern.js`)
- source maps for generated files

### Changed

- source file language from TS to JS
- files for Node (`.esm.js`, `.js`) are built unminified, files for Web (`.modern.js`, `.umd.js`) are built minified

### Security

- bumped dev dependencies

## [1.0.5] - 2020-04-04

### Changed

- NPM → Yarn for dependency management

### Security

- bumped dev dependencies

## [1.0.4] - 2020-01-17

This version improves the build process and updates the README. The package contents haven't changed.

## [1.0.3] - 2019-10-24

Version 1.0.2 was not published properly

### Changed

- TypeScript definitions to use a better, more readable overloading syntax
- bundle size reduced to 468 bytes (16% less than before)

## [1.0.1] - 2019-09-08

### Added

- bundles now have the header comment with `@license`

### Fixed

- `minDecimal` had no effect if the number had no decimal part (#2)

### Regress

- bundle size is now 19% bigger (469 → 559 bytes minzipped)

## [1.0.0] - 2019-09-08

The initial release of pretty-money ✨

### Added

- setting for currency sign and its position
- spacing setting
- setting for delimiters
- setting for decimal part formatting

[Unreleased]: https://github.com/NickKaramoff/pretty-money/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/NickKaramoff/pretty-money/compare/v1.0.5...v1.1.0
[1.0.5]: https://github.com/NickKaramoff/pretty-money/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/NickKaramoff/pretty-money/compare/1.0.3...v1.0.4
[1.0.3]: https://github.com/NickKaramoff/pretty-money/compare/1.0.1...1.0.3
[1.0.1]: https://github.com/NickKaramoff/pretty-money/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/NickKaramoff/pretty-money/compare/d90fe8630c3a595c435c7b78881c6e57e51a221d...1.0.0