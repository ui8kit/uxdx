# Review instructions (core)

## Passes

Tag each finding with its pass:

- Bugs: logic errors, broken edge cases, subtle regressions
- Contract: public API, ARIA, kernel boundary, generated-file policy
- Compatibility: importers / pins still valid

## Important vs nit

Important: would break callers, leak data, or violate the module contract.
Style and naming are nits. Cap nits at five; count the rest.

## Do not report

Generated files the repo forbids editing, and anything CI already enforces.
