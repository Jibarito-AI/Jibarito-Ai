# Osheni Mobile Auth Flow Plan

## Current public/auth entry points
- `/onboarding`
- `/auth`
- `/sign-in`
- `/signup`
- `/create-account` (legacy route still present in prototype)
- `/join` (older workaround route, should be treated as transitional)

## Preferred current route names
- `/sign-in`
- `/signup`

## Target structure later
- `/(public)/onboarding`
- `/(public)/auth`
- `/(public)/sign-in`
- `/(public)/signup`
- `/(app)/home`
- `/(app)/explore`
- `/(app)/sessions`
- `/(app)/journal`
- `/(app)/mood`
- `/(app)/profile`

## Rules
- Public flow should not depend on app tab navigation.
- App flow should assume an authenticated session later.
- Auth screens should call auth service only.
- Session/user-aware screens should use service layer only.

## Why not force full route migration now?
The prototype is still moving quickly. This doc keeps the end-state clear without risking a brittle mass refactor too early.
