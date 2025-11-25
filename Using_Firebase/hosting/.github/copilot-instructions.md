<!-- Copilot instructions tailored to this Vite + TypeScript + Firebase frontend -->
# Copilot instructions — Vite + TypeScript + Firebase (minimal frontend)

This repository is a small Vite + TypeScript frontend that uses the Firebase SDK for auth and is intended for Firebase Hosting. The goal of these instructions is to help AI coding agents be productive immediately by describing the project's structure, conventions, and concrete examples.

- **Repo entry & dev workflow**: The app is served from `index.html`, which loads `src/main.ts` as the Vite entry. Use the npm scripts in `package.json`:
  - `npm run dev` — start Vite dev server (hot reload)
  - `npm run build` — run `tsc` for type-checking then `vite build` to produce the production bundle
  - `npm run preview` — preview the built app

- **TypeScript & module mode**: `package.json` sets `"type": "module"` and `tsconfig.json` uses `module: ESNext` with `noEmit: true`. The `tsc` step in `build` acts as a type-checker only.

- **Where to look for examples**:
  - `src/main.ts` — Firebase Auth usage (imports from `firebase/auth`, uses `getAuth`, `onAuthStateChanged`, and `signInWithRedirect` with `GoogleAuthProvider`). Note: there is no `initializeApp` or explicit Firebase config file in the repo — ensure a Firebase app is initialized at runtime (see "Firebase initialization" below).
  - `src/counter.ts` — small DOM/TS example showing how UI helpers are structured: exported `setupCounter` function accepts an `HTMLButtonElement` and wires behavior.

- **Firebase / hosting notes (discovered facts)**:
  - `firebase.json` exists and contains a `hosting` block. It sets `hosting.source` to `hosting`, but this repository contains a `public/` folder (and no top-level `hosting/` folder). This mismatch can break `firebase deploy`; please verify `hosting.source` or the actual build output location before deploying.
  - The repo uses the Firebase Web SDK directly in `src/main.ts`. Because no `initializeApp(...)` call is present in the codebase, a developer must add initialization (for example in `src/firebase.ts` or `src/main.ts`) before calling `getAuth()`.

- **Import / bundling patterns**:
  - Use standard ESM imports (e.g., `import { getAuth } from 'firebase/auth'`). Vite resolves modules and handles TypeScript.
  - Keep source files in `src/`. `tsconfig.json` `include` is `src`.

- **Developer expectations / debugging**:
  - To iterate locally run `npm run dev` and open the Vite URL shown in the terminal.
  - Use browser DevTools to inspect network/auth flows for Firebase redirect sign-in.

- **Concrete code examples** (from this repo):
  - Firebase usage (from `src/main.ts`):
    - `getAuth()` — ensure Firebase app is initialized first
    - `onAuthStateChanged(auth, user => { ... })` — auth observer
    - `signInWithRedirect(auth, new GoogleAuthProvider())` — redirect-based Google sign-in
  - UI helper (from `src/counter.ts`): exported helper functions accept DOM elements and mutate innerHTML directly — follow that pattern for small widgets.

- **What NOT to assume**:
  - There are no tests, CI files, or service workers present — do not look for test suites unless added later.
  - There is no Firebase initialization or environment config file tracked here — secrets/config are expected to be added by the developer.

- **Suggested quick tasks an agent can perform safely**:
  - Add a `src/firebase.ts` that initializes Firebase from environment variables and export `auth` for use in `main.ts`.
  - Fix `firebase.json` hosting `source` to point at the build output directory (for example `public` or a `hosting` directory) or document deploy steps.
  - Add a short README or a `.env.example` containing required Firebase keys (do not add secrets).

If any of the above assumptions are incorrect or you'd like me to: (A) initialize Firebase in the repo, (B) fix `firebase.json`, or (C) add a small README and `.env.example`, tell me which and I will implement it.
