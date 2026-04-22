# Osheni App Starter

This is a Vercel-ready Next.js starter built directly from the Osheni wireframes and landing-page copy.

## What is included
- Marketing landing page with bilingual toggle and waitlist capture UI
- App prototype routes for onboarding, home dashboard, explore library, live sessions, journal, and profile/settings
- Shared design tokens based on the provided color palette
- File structure ready for GitHub and Vercel deployment

## Recommended production stack
- Frontend: Next.js on Vercel
- Auth + Database + Storage: Supabase
- Push: OneSignal or Firebase Cloud Messaging
- Payments: RevenueCat + App Store / Google Play for mobile subscriptions
- Live sessions: Zoom deep links stored in database

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
1. Push this project to GitHub.
2. In Vercel, import the GitHub repository.
3. Framework preset: Next.js.
4. Build command: `next build`
5. Output: default
6. Add environment variables when backend wiring begins.

## Important reality check
The wireframes describe a native mobile product. This codebase is a strong product prototype and launch site, but not yet a full iOS/Android native app. For true app-store deployment, the next decision is:
- keep Next.js for web + waitlist and build mobile in Expo/React Native, or
- use React Native/Expo immediately and share design/content between web and mobile.
