# Project rules for AI assistants

These are the rules for working in this repo (Next.js App Router + Supabase + Tailwind).
Follow them for every file you add, move or rename.
**This file overrides `docs/context/*`**, which has old file names in places.

## Golden rules

1. **Ask, don't guess.** If a request is unclear or a choice belongs to the owner, ask first.
2. **Never commit or push** unless explicitly asked.
3. **Refactors stay refactors.** When moving or renaming, don't change behaviour as well.
4. **The repo is public.** Never commit secrets, keys, `.env` files or SQL (see Backend below).

## File naming

- **Files are PascalCase:** `Hero.tsx`, `UseGsapReady.ts`, `LoginSubmitHandler.ts`.
- **Names say what the file is for.** No vague names like `utils.ts`, `client.ts` or `auth.ts`.
  Good: `SupabaseBrowserClient.ts`, `ClassNameMerge.ts`, `RouteProtectionMiddleware.ts`.
- **Folders are lowercase:** `src/components/sections`, `src/app/admin`.
- **Hooks** are files named `Use<Thing>.ts` (e.g. `UseUserManagement.ts`). The exported function stays camelCase (`useUserManagement`).
- **Exceptions** where tools require the name: `page.tsx`, `layout.tsx`, `route.ts`, `template.tsx`,
  `favicon.ico`, `index.ts` barrels, root config files, `middleware.ts`.

## Where things go

```
src/
  app/
    admin/          admin dashboard        (URL /admin/...)
    client/         client dashboard       (URL /client/...)
    authentication/ login, signup, forgot-password, reset-password, confirm
    legal/          terms, privacy, cookies (one file per section in _sections/)
    api/            server API routes      (route.ts files)
  components/
    sections/       landing page sections
    layout/         Header, Footer, site layout
    animations/     animation components
    ui/             small reusable UI (Button, Sheet)
    globe/          3D globe
  lib/
    authentication/ Supabase clients, auth context, route protection, admin check
  types/            shared database row types (Project.ts, Invoice.ts, ...)
  data/             static content (TeamMembers.ts, Testimonials.ts)
  hooks/            shared React hooks
  providers/        app-wide React providers
docs/               documentation
```

- **No route groups.** Use plain folders (`src/app/admin`), not `(admin)/admin`.
- **Page pieces live next to the page.** Components split out of a page go in a `_components/` folder beside its `page.tsx`.
  Page logic goes in a `Use<Page>.ts` hook beside `page.tsx`.
- **Auth pages:** each folder in `src/app/authentication/` has its UI plus a `<Name>SubmitHandler.ts`.
- **Shared types** go in `src/types/`. Profile types are in `src/lib/authentication/UserProfileTypes.ts`.
- **Import alias:** `@/` = `src/`.

## Backend (Supabase)

- All auth and data are in Supabase. Env vars: `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only).
- **SQL files are private.** `*.sql` is gitignored on purpose. They live in `supabase/sql/` as
  numbered, re-runnable files (`NN_PascalCaseName.sql`). Never commit them, and don't copy
  schema details, policies or table definitions into tracked files or docs.
- **Security comes from Row Level Security (RLS)** in the database, not from hiding code.
  Every table must have RLS enabled.
- **Which Supabase client to use:**
  - `SupabaseBrowserClient.ts` in client components
  - `SupabaseServerClient.ts` in API routes and server code; it acts as the logged-in user, so RLS applies
  - `SupabaseAdminClient.ts` (service key, bypasses RLS) only when nothing else works,
    e.g. creating or deleting auth users. Never import it in client code.
- **Admin API routes** start with `requireAdminSession()` from `RequireAdminSession.ts`, validate
  every input (ids, enums), and return clear `{ error }` messages with the right status code.
- **Auth email links** (password reset, signup confirmation) go through `/authentication/confirm`.

## Before finishing a change

- Run `npx tsc --noEmit` and `npx eslint <changed files>`.
- Don't leave `console.log` debugging or hard-coded emails or ids in the code.
