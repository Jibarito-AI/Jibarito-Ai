# OSHENI Mobile App — Developer Handoff Document

## What Is This?

OSHENI is a wellness and meditation mobile app built with Expo / React Native.
Tagline: "Your daily sanctuary for inner peace."
Target platforms: iOS and Android.
Business model: Freemium with paid subscriptions ($9.99/month or $89/year) + 14-day free trial.
Languages: English and Spanish (bilingual from day one).

---

## How to Run the Prototype Locally

### Requirements
- Node.js 18 or later
- npm or yarn
- Expo Go app on your phone (iOS or Android)

### Steps
```bash
git clone https://github.com/Jibarito-AI/Jibarito-Ai.git
cd Jibarito-Ai/osheni-mobile
npm install --legacy-peer-deps
npx expo start --clear
```

Scan the QR code with your phone camera (iOS) or Expo Go (Android).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Expo SDK 54 + React Native 0.81.5 |
| Navigation | Expo Router v6 (file-based routing) |
| Language | TypeScript (strict mode) |
| Backend (planned) | Supabase (auth + database) |
| Subscriptions (planned) | RevenueCat |
| Notifications (planned) | expo-notifications |
| Storage | AsyncStorage (local) |

---

## Project Structure

```
osheni-mobile/
├── app/               # All screens (file = route)
│   ├── index.tsx      # Entry point
│   ├── home.tsx       # Home dashboard
│   ├── explore.tsx    # Meditation library
│   ├── sessions.tsx   # Live sessions
│   ├── journal.tsx    # Journaling
│   ├── mood.tsx       # Mood check-in
│   ├── profile.tsx    # User profile
│   ├── progress.tsx   # Stats & streaks
│   ├── billing.tsx    # Subscription management
│   ├── notifications.tsx
│   ├── audio-player.tsx
│   ├── help.tsx
│   ├── sign-in.tsx
│   ├── signup.tsx
│   └── onboarding.tsx
├── components/        # Reusable UI (Card, Badge, Screen, NavTabs)
├── services/          # Business logic layer
├── repositories/      # Data access layer (Supabase-ready with mock fallback)
├── integrations/      # Third-party wrappers (Zoom, billing, notifications)
├── lib/               # Config, theme, content, auth helpers
├── types/             # TypeScript type definitions
└── docs/              # Architecture planning documents
```

---

## What Is Complete (Prototype-Ready)

- Full navigation structure with bottom tab bar
- Onboarding flow (static, needs progression logic)
- Auth screens (sign-in, sign-up) with basic validation
- Home dashboard with user greeting, streak, quick actions, upcoming session
- Live Sessions screen — fully functional with Zoom deep link support, session status, set reminder
- Explore screen — meditation library with search UI and category filters
- Journal screen — text entry, save to local storage
- Mood check-in screen — level selector, note field, save
- Profile screen — editable name, email, language toggle
- Billing screen — plan display, subscription state
- Notifications screen — preferences display
- Progress screen — streak stats (static)
- Audio player screen — UI only, no audio playback yet
- Help screen — FAQ and contact info

---

## What Needs to Be Built for Launch

### Critical (required before submission)
1. **Supabase backend** — deploy schema (see `docs/DATA_MODEL_PLAN.md`), wire up auth
2. **Real authentication** — sign-in/sign-up must create real user sessions
3. **Route guards** — authenticated screens must redirect unauthenticated users to sign-in
4. **RevenueCat integration** — restore `react-native-purchases` SDK, implement purchase flow
5. **App icon + splash screen** — currently showing Expo defaults
6. **Bundle identifiers** — add iOS bundle ID and Android package name to `app.json`
7. **EAS Build setup** — configure `eas.json` for TestFlight and Play Store internal testing
8. **Privacy policy + terms** — required by both app stores

### Important (needed for good user experience)
9. **Onboarding progression** — step-by-step flow with persistence
10. **Audio playback** — wire up `expo-av` for meditation audio
11. **Real meditation content** — replace mock content in `lib/content.ts`
12. **Real session data** — replace mock Zoom meeting IDs in `services/sessionService.ts`
13. **Notification permissions** — request permission on iOS/Android at the right moment
14. **Error boundaries** — prevent full crashes on component errors
15. **Loading states** — replace text "Loading..." with proper spinners
16. **Logout** — implement sign-out from Profile screen
17. **Search and filters** — wire up Explore screen search and category filters
18. **Mood tag selection** — make mood tags interactive

### App Store Submission Checklist
- [ ] Apple Developer Account ($99/year)
- [ ] Google Play Developer Account ($25 one-time)
- [ ] App icon (1024x1024 PNG, no alpha)
- [ ] Screenshots for all required device sizes
- [ ] Privacy policy URL
- [ ] App description and keywords
- [ ] Age rating questionnaire
- [ ] Export compliance (encryption declaration)
- [ ] In-app purchase setup in App Store Connect + Google Play Console
- [ ] TestFlight beta testing (iOS) before submission
- [ ] Internal testing track (Android) before submission

---

## Backend Schema (Ready to Deploy)

See `docs/DATA_MODEL_PLAN.md` for full Supabase schema.

Tables needed:
- `users` — profile, subscription status, streak, language
- `journal_entries` — content, mood, timestamps
- `live_sessions` — title, time, Zoom URL, attendee count
- `mood_check_ins` — level, tags, note
- `user_activity` — tracking meditation sessions attended

---

## Environment Variables Needed

Create a `.env` file (never commit this):

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_REVENUECAT_API_KEY=your-revenuecat-key
EXPO_PUBLIC_APP_ENV=production
```

---

## Important Notes for the Developer

- All repositories have **mock data fallbacks** — the app runs completely offline without any backend credentials. This was intentional for prototyping.
- The `lib/supabase.ts` file is currently stubbed out (returns `configured: false`). To re-enable Supabase, restore the full implementation and add the environment variables.
- `react-native-purchases` (RevenueCat) was removed for Expo Go compatibility. It needs to be restored when building a development build or production build.
- The app uses `--legacy-peer-deps` for npm install due to peer dependency conflicts between expo-router v6 and some packages. This is normal and safe for development.
- All screens follow the pattern: Screen → Service → Repository → Integration. Do not put business logic directly in screens.

---

## GitHub Repository

https://github.com/Jibarito-AI/Jibarito-Ai

Main branch: `main`
App folder: `osheni-mobile/`
Web landing page: `osheni-app/`

---

## Contact

Project owner: Christopher Robert Trinidad
