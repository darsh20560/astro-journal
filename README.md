# Astro Journal (React Native + Expo)

Astro Journal is a lightweight, offline-first journaling app with daily horoscopes.

## Setup

1. Prereqs: Node 18+, Expo CLI
2. Install deps:
```bash
pnpm i || yarn || npm i
```
3. Start:
```bash
npm run start
```
4. Press i for iOS simulator, a for Android emulator, or scan the QR with Expo Go.

## Features
- Daily horoscope for selected zodiac sign (cached for offline)
- Per-day journal entries stored locally with autosave
- Sign switcher with persistent selection
- Two screens via React Navigation: Home and Journal
- Offline access to entries and cached horoscopes

## Tech Stack
- React Native (functional components + Hooks)
- Expo (Dev, StatusBar, Notifications optional)
- React Navigation (native-stack)
- AsyncStorage (robust JSON helpers)

## Folder Structure
```
/src
  /components
    HoroscopeCard.js
    JournalEntryItem.js
    ZodiacPicker.js
  /context
    SettingsContext.js
  /hooks
    useHoroscope.js
    useJournal.js
  /screens
    HomeScreen.js
    JournalScreen.js
  /services
    horoscopeService.js
    journalService.js
  /utils
    storage.js
App.js
```

## Architecture
- UI Screens use hooks and components.
- `SettingsContext` stores selected sign with AsyncStorage.
- `horoscopeService` fetches via network, caches by sign+date for offline use.
- `journalService` persists entries per sign+date, maintains an index for fast listing.
- Hooks `useHoroscope` and `useJournal` encapsulate loading, caching, autosave.

## Usage Walkthrough
- Home: pick your sign, see today’s date and horoscope, tap "Write Journal".
- Journal: type in the editor; autosave runs after a short pause or when leaving the input. Past entries show below.
- Offline: previously cached horoscope and all journal entries remain available.

## Testing Scenarios
- Write an entry, close the app, reopen: verify text persists.
- Switch signs: horoscope and journal list update per sign.
- Go offline: existing data still visible; horoscope loads from cache.

## Error Handling
- Horoscope fetch failures show a friendly message and use cache.
- Storage helpers wrap JSON, catch errors, and namespace keys.

## Notifications (Optional)
Implement a simple daily reminder using `expo-notifications` from a helper (not required to run the app). Suggested time: 8 PM local.

## Future Enhancements
- Full-text search across entries
- Tagging, mood tracking, attachments
- Secure storage/biometric lock
- Calendar view and export
- Theming and widgets

## Notes
- No external DB; all data is local via AsyncStorage.
- Code style favors clarity and explicit naming.

## Drive link to the Demo:
[Video Link](https://drive.google.com/file/d/1KKTjV6p0HV7a7TSNDAnYllhQUQ4ZxRMZ/view?usp=sharing)
