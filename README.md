# 🏟️ SportNest — Client (Frontend)

**SportNest** is a full-stack sports facility booking platform where users can
discover football turfs, tennis courts, swimming lanes and badminton halls, and
reserve them for specific dates and time slots. This repository contains the
**Next.js frontend**.

## 🔗 Live URL

- **Live Site:** https://your-sportnest-client.vercel.app _(update after deployment)_
- **API Repository:** ../sportnest-api

> Demo login → **demo@sportnest.com** / **Passw0rd**

## 🎯 Purpose

To provide a clean, recruiter-friendly, real-world sports reservation portal where:

- Anyone can browse available facilities.
- Authenticated users can book facilities and manage their bookings.
- Facility owners can add, update, and delete their own facilities.

## ✨ Features

- 🔐 **Authentication** — email/password (JWT in an HTTPOnly cookie) + Google OAuth.
- 🔒 **Persistent private routes** — logged-in users stay logged in on reload (no bounce to login).
- 🏟️ **Dynamic Featured Facilities** — home page renders live data from MongoDB.
- 🔎 **Search & Filter** — search by facility name and filter by sport type.
- 📄 **Facility Details + Booking** — pick date, time slot & hours with a live total price.
- 📅 **My Bookings** — view all reservations and cancel with confirmation.
- ➕ **Add Facility** — owners list new facilities with a live preview card.
- 🛠️ **Manage My Facilities** — owners edit (modal) or delete (confirm dialog) their facilities.
- 🌗 **Light / Dark theme toggle** (persisted in localStorage).
- 🎬 **Framer Motion** animations and micro-interactions.
- 📱 **Fully responsive** across mobile, tablet and desktop.
- 🔔 Toast notifications (react-hot-toast) — no default browser alerts.
- 🚫 Custom **404 Not Found** page and loading spinners.

## 🧰 Tech Stack & NPM Packages

- **next** (App Router)
- **react** / **react-dom**
- **tailwindcss** + **daisyui** (styling & component system)
- **framer-motion** (animations)
- **lucide-react** (icons)
- **react-hot-toast** (notifications)

## 🏗️ Architecture note — same-origin API proxy

The client talks to the backend **same-origin**. `next.config.mjs` reverse-proxies
`/api/*` to the backend (`API_PROXY_TARGET`), so the auth cookie stays
**first-party** and there is **no cross-site CORS**. The browser only ever calls
relative `/api/...` paths — do **not** set `NEXT_PUBLIC_API_URL`.

## 🚀 Getting Started

```bash
npm install

# Create .env.local (see below), then:
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables (`.env.local`)

```bash
# Where the reverse proxy forwards /api/* during local dev.
# Point it at your local backend:
API_PROXY_TARGET=http://localhost:5000
```

> Run the backend (`sportnest-api`) on port 5000 alongside this app.

## 📂 Project Structure

```
src/
├── app/
│   ├── (public)/            # Home, All Facilities, Facility Details
│   ├── (auth)/              # Login, Register
│   ├── (dashboard)/         # Add Facility, Manage Facilities, My Bookings (private)
│   ├── layout.js            # Root providers (Auth, Theme, Toaster)
│   └── not-found.js         # Custom 404
├── components/              # Navbar, Footer, FacilityCard, ProtectedRoute, UI
├── context/                 # AuthContext, ThemeContext
└── lib/api.js               # Centralised API client
```

## 🔒 Route Overview

| Route                 | Access  | Description                        |
| --------------------- | ------- | ---------------------------------- |
| `/`                   | Public  | Home with featured facilities      |
| `/facilities`         | Public  | All facilities + search/filter     |
| `/facilities/:id`     | Private | Facility details + booking form    |
| `/login`, `/register` | Public  | Authentication                     |
| `/my-bookings`        | Private | User's bookings + cancel           |
| `/add-facility`       | Private | Create a facility                  |
| `/manage-facilities`  | Private | Owner: update / delete facilities  |

## ☁️ Deployment & Redeployment (Vercel)

Both apps deploy to Vercel. The client reverse-proxies `/api/*` to the API, so
they behave as one origin.

### Client environment variables (Vercel → `sportnest-client` → Settings → Environment Variables)

| Key                | Value                                | Scope              |
| ------------------ | ------------------------------------ | ------------------ |
| `API_PROXY_TARGET` | `https://<your-api>.vercel.app`      | Production, Preview |

- ❌ Do **NOT** add `NEXT_PUBLIC_API_URL` — an absolute value there bypasses the
  proxy and re-introduces a CORS error on Google sign-in.
- `API_PROXY_TARGET` is optional (a default is set in `next.config.mjs`), but
  setting it explicitly is recommended.

### API side (see `sportnest-api/README.md` for the full list)

For Google OAuth to work behind the proxy, the **API** project needs
`CLIENT_URL` **and** `BETTER_AUTH_URL` set to **this client's** origin
(e.g. `https://<your-client>.vercel.app`).

### Redeploy steps

1. Update the env vars above.
2. **Push to GitHub** (Vercel auto-deploys), **or** in the dashboard:
   **Deployments → ⋯ → Redeploy** with **"Use existing Build Cache" unchecked**.
3. `NEXT_PUBLIC_*` values are baked in at **build time**, so any change to them
   only takes effect **after a fresh rebuild**.

### Verify after deploy

- Home shows facilities from the database ✅
- Register + email/password login works ✅
- Reloading any private route keeps you logged in ✅
- "Continue with Google" redirects to Google (requires the API env vars +
  the Google Console redirect URI — see the API README) ✅
