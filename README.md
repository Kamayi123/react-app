# React Native Expo Starter

A cross-platform (Android/iOS) React Native app built with Expo. It includes:

- Simple, modern UI with bottom-tab navigation
- Home, About, and Settings screens
- Example API list fetched from JSONPlaceholder
- React Context for theme state (light/dark)
- Clean folder structure (components, screens, assets, utils, context)
- Responsive layout using a small helper hook

## Run locally

Prerequisites:
- Node.js 18+
- Recent Android Studio/iOS Xcode setup for device/simulator (optional to use Expo Go)

Commands (PowerShell):

```powershell
# Install dependencies
npm install

# Start the Expo dev server (press 'a' for Android, 'i' for iOS, 'w' for web)
npm start

# Or directly run web
npm run web
```

If using a device, install the Expo Go app and scan the QR code from the terminal/web page.

## Structure

- `App.tsx` – App entry, Navigation + Context wiring
- `src/context/` – React Context for global state
- `src/screens/` – Home, About, Settings screens
- `src/components/` – Reusable UI components
- `src/utils/` – API client and responsive helpers
- `assets/` – App assets (placeholders)

## Notes

- Icons and splash assets in `app.json` are placeholders. Replace with your own files under `assets/` or remove these fields if you prefer.
- Code comments highlight key sections and decisions.