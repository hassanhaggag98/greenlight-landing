# Green Light Group — Frontend Architecture

## Overview

React + Vite + TypeScript frontend for Green Light Group. Supports English/Arabic (RTL), light/dark themes, public marketing pages, and an admin dashboard.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19, Vite 8 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing | React Router v7 |
| State | Zustand (theme, language) |
| Server State | TanStack Query |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| i18n | i18next + react-i18next |
| Animation | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts (ready for dashboard widgets) |
| Toasts | react-hot-toast |

## Folder Structure

```
src/
├── api/                  # HTTP client & API modules
│   ├── axios.ts          # Axios instance + interceptors
│   ├── endpoints.ts      # Centralized route paths
│   ├── auth.api.ts
│   ├── public.api.ts
│   └── admin.api.ts
├── components/
│   ├── common/           # Shared non-UI helpers
│   ├── layout/           # Navbar, Footer, PublicLayout, AdminLayout
│   ├── ui/               # Design system primitives
│   ├── sections/         # Page sections (hero, stats, etc.)
│   ├── forms/            # Reusable form compositions
│   └── dashboard/        # Admin dashboard widgets
├── constants/            # Routes, storage keys, languages
├── hooks/                # Custom React hooks
├── locales/
│   ├── ar/translation.json
│   ├── en/translation.json
│   └── i18n.ts
├── pages/
│   ├── public/           # Marketing & auth pages
│   └── admin/            # Dashboard pages
├── providers/
│   └── AppProviders.tsx  # Query, Router, i18n, theme sync
├── routes/
│   └── index.tsx         # Lazy-loaded route definitions
├── store/
│   ├── themeStore.ts     # Light/dark (localStorage)
│   └── languageStore.ts  # en/ar + RTL (localStorage)
├── styles/               # Additional global/partials
├── types/                # Shared TypeScript types
└── utils/
    ├── cn.ts             # clsx + tailwind-merge
    └── motion.ts         # Framer Motion + reduced-motion helpers
```

## Routes

### Public (`PublicLayout`)

| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | Hero, highlights |
| `/about` | AboutPage | Company mission & vision |
| `/services` | ServicesPage | Service listings |
| `/contact` | ContactPage | Contact form |
| `/login` | LoginPage | Admin authentication |

### Admin (`AdminLayout`)

| Path | Page | Description |
|------|------|-------------|
| `/admin` | — | Redirects to dashboard |
| `/admin/dashboard` | DashboardPage | Overview stats |
| `/admin/services` | AdminServicesPage | Manage services |
| `/admin/contacts` | AdminContactsPage | Contact submissions |
| `/admin/users` | AdminUsersPage | User management |
| `/admin/settings` | AdminSettingsPage | App settings |

All page components are **lazy loaded** via `React.lazy` + `Suspense`.

## API Integration

### Configuration

Set the backend URL in `.env`:

```
VITE_API_URL=http://localhost:3000/api
```

### Axios Client (`src/api/axios.ts`)

- Base URL from `VITE_API_URL`
- Attaches `Authorization: Bearer <token>` from `localStorage` (`glg_access_token`)
- Clears token on 401 responses

### Endpoint Registry (`src/api/endpoints.ts`)

All API paths are centralized. API modules import from here:

- `authApi` — login, logout, refresh, me
- `publicApi` — services, contact, about, stats
- `adminApi` — dashboard, CRUD for services/contacts/users, settings

### TanStack Query

`QueryClient` is configured in `AppProviders` with:

- `staleTime: 60s`
- `retry: 1`
- `refetchOnWindowFocus: false`

Use `useQuery` / `useMutation` in pages and hooks for data fetching.

## Theming & i18n

### Brand Colors (CSS variables in `src/index.css`)

| Variable | Purpose |
|----------|---------|
| `--primary-green` | Primary brand |
| `--secondary-green` | Hover/accent green |
| `--dark-navy` | Footer, admin sidebar |
| `--gold` | Accent highlights |
| `--surface` / `--surface-elevated` | Backgrounds |
| `--foreground` / `--muted` | Text |
| `--border` | Borders |

Dark mode toggles the `.dark` class on `<html>` via `themeStore`.

### RTL Support

`languageStore` sets `document.documentElement.dir` to `rtl` for Arabic and `ltr` for English. Tailwind logical properties (`start`/`end`, `ps`/`pe`) are used in layout components.

### Persistence

| Key | Store | Value |
|-----|-------|-------|
| `glg_theme` | themeStore | `light` \| `dark` |
| `glg_language` | languageStore | `en` \| `ar` |
| `glg_access_token` | axios interceptor | JWT string |

## Development

```bash
npm install
cp .env.example .env
npm run dev
```

```bash
npm run build   # Type-check + production build
npm run preview # Preview production build
```

## Next Steps

- Add route guards for admin pages (auth check)
- Wire TanStack Query hooks in admin pages
- Build reusable sections in `components/sections/`
- Add Recharts widgets to dashboard
- Expand translation keys as features grow
