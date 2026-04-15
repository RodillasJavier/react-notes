# React Notes

A real-time collaborative sticky notes app. Users can add, move, resize, edit, and delete notes. All changes sync live across browsers via Firebase Realtime Database. Notes support markdown.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env.local` and fill in your Firebase project credentials:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_PROJECT_ID=
```

Then run:

```bash
npm run dev
```

## Deployment (Vercel)

Connect this repo on [vercel.com](https://vercel.com). Set the `VITE_FIREBASE_*` environment variables in the Vercel project settings, then deploy. The included `vercel.json` handles SPA routing.

## Features

- Add / delete notes
- Drag to reposition
- Resize notes
- Edit title and content
- Markdown rendering
- Real-time sync across all connected clients (Firebase)