# Spec: <!-- title from intent -->

Intent: `.sdlc/changes/<slug>/intent.md`
Status: draft

## Requirements

What the change must do. Trace each item to the intent.

## Design

How it fits the existing codebase. Name surfaces (API, admin, BFF, host) —
do not invent a new plane.

## Skills and policies applied

Brand, security, UX, stack-contract — list the files that constrained this
spec (`AGENTS.md`, `.cursor/rules/*`, `.project/adr/*`).

## Areas of concern

Where policies conflict or evidence is missing. A human resolves each item
before plan mode. Do not leave a red flag for engineering to discover in the
diff.

## Open questions carried forward

Questions from `intent.md` that remain, with an owner.
