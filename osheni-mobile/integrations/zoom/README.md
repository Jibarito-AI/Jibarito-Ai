# Zoom Integration Notes

## Purpose
This folder isolates Zoom-specific logic from screens and generic services.

## Why
The Osheni app needs live session support with a Zoom join flow, meeting details, and reminder support.

## Rules
- Screens should not build Zoom links directly.
- Session services should resolve provider details.
- This integration can later be replaced or expanded without rewriting the UI.

## Future additions
- Real Zoom API metadata sync if needed
- Session attendance tracking
- Install/open fallback handling
- Recording support
