# Osheni Mobile Integrations Plan

## Current direction
The prototype now treats Zoom as an integration provider instead of a UI detail.

## Integration buckets
- Zoom for live sessions
- Supabase for auth, data, and storage
- RevenueCat for subscriptions
- Notifications provider for reminders and engagement
- Content/audio provider for meditation media

## Design rule
Screens should talk to services.
Services may talk to integrations.
Integrations should isolate provider-specific behavior.

## Why this matters
This app is supposed to support Zoom sessions and other sources later. If those details leak into the UI, the prototype becomes hard to change.

## Next recommended steps
1. Add notification integration placeholder
2. Wire sessions screen to sessionService
3. Wire home screen to userService and sessionService
4. Add content/media integration placeholder
5. Add Supabase-backed repositories later
