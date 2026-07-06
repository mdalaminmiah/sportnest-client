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

## 🚀 Getting Started

```bash
npm install

# Create .env.local (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables (`.env.local`)

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

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
```
