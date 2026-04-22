# Osheni Mobile Prototype

This is the editable and scalable mobile prototype for Osheni.

## Design rules for this prototype
- Everything should be easy to change.
- No hard-coding business logic into UI components.
- Content, labels, session times, and pricing should live in config or backend tables later.
- Features should be modular so they can be replaced without breaking the whole app.
- Prototype first, production-ready structure second, polish third.

## Stack
- Expo
- React Native
- Expo Router
- TypeScript
- Planned backend: Supabase
- Planned subscriptions: RevenueCat

## Folder strategy
- `app/` route-based screens
- `components/` reusable UI
- `lib/` config, theme, mock data, clients
- `features/` feature-specific logic when the app grows

## Prototype phases
### Phase 1
- Onboarding
- Auth
- Home
- Explore
- Sessions
- Journal
- Profile

### Phase 2
- Mood tracking
- Audio player
- Progress/insights
- Notifications
- Billing/subscriptions

### Phase 3
- Community
- Admin/content tools
- Analytics
- Better caching/offline support

## Scalability rules
- Keep routes thin
- Keep display components dumb
- Move data access into dedicated modules
- Avoid locking the project to mock data only
- Prepare for Supabase table-driven content and configuration
