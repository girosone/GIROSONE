# GIROSONE — Claude Prompt Guide

## Purpose
`PROJECT.md` = requirements and scope.
`DESIGN.md` = visual/design source of truth.
`PLAN.md` = implementation roadmap.
`WORKLOG.md` = actual implementation state.
`PROMPT.md` = rules for Claude and prompt format.

## Working Rules
1. Read the relevant sections of `PROJECT.md`, `DESIGN.md`, `PLAN.md`, and `WORKLOG.md` before implementation.
2. Work only on the requested milestone unless a dependency is required.
3. Build toward the complete, fully functional GIROSONE website; do not create isolated demos.
4. Reuse existing components, services, models, and utilities where appropriate.
5. Follow the existing architecture and naming conventions.
6. Do not create unnecessary files, folders, packages, or duplicated components.
7. Keep frontend, backend, API, database, and admin functionality compatible with the planned final system.
8. Use the reference screenshots and `DESIGN.md` as the visual benchmark.
9. Build mobile-first and verify responsive behavior through desktop.
10. Keep public pages read-only; protect admin write operations.
11. Keep secrets in `.env`; never commit credentials or real connection strings.
12. Test the completed milestone before declaring it complete.
13. Update `WORKLOG.md` after each milestone with actual changes, tests, issues, and next step.
14. Do not implement future features just because they appear in `PLAN.md`.
15. If existing code conflicts with the source-of-truth docs, flag it before destructive changes.

## Prompt Format
REQUIREMENT:
<milestone or feature>

CURRENT STATUS:
<relevant state from WORKLOG.md>

TASK:
<exact work>

CONSTRAINTS:
<only task-specific constraints>

EXPECTED RESULT:
<measurable result>

REPORT:
<changed files, testing, issues, next step>

## Token Efficiency
- Do not repeat requirements already documented.
- Do not explain the whole project in every prompt.
- Implement one milestone at a time.
- Prefer existing abstractions.
- Ask questions only when a missing decision blocks implementation.
- Keep reports concise.

## Completion Standard
A milestone is complete only when implementation exists, follows `PROJECT.md`/`DESIGN.md`, fits `PLAN.md`, relevant checks pass, no unnecessary future scope was added, and `WORKLOG.md` is updated.
