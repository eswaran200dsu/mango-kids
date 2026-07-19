# Mango Kids Pre School Website

A React 19 + TanStack Start website for Mango Kids Pre School, Trichy.

## Features

- Public pages: Home, About, Activities, Facilities, Gallery and Contact
- Supabase authentication for the admin portal
- Admin gallery uploads and enquiry management
- Supabase tables, row-level security policies and signup role handling
- Nitro production build targeting Cloudflare Workers

## Requirements

- Node.js 20.19 or newer
- npm
- A Supabase project

## Local setup

1. Copy `.env.example` to `.env`.
2. Add the Supabase URL, project ID and publishable key to `.env`.
3. Install and run:

```bash
npm ci
npm run dev
```

## Validate the project

```bash
npm run check
```

This runs TypeScript checking, ESLint and the production build.

## Production build

```bash
npm run build
npm run preview
```

The preview command uses Nitro/Wrangler because this project targets Cloudflare Workers.

## Supabase setup

1. Apply the SQL files in `supabase/migrations` to a fresh Supabase project.
2. In Supabase Storage, create a bucket named `gallery`.
3. Make the bucket public if public gallery files should be directly viewable.
4. Register the first account. The supplied signup trigger assigns the first registered user the `admin` role.

## Push to GitHub

Do not upload the ZIP itself and do not upload `node_modules`. Extract the project and push the project files.

```bash
git init
git add .
git commit -m "Initial Mango Kids project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

If `.env` was already staged before `.gitignore` was fixed:

```bash
git rm --cached .env
git commit -m "Remove local environment file"
```

The following files and folders are intentionally excluded from Git: `.env`, `node_modules`, `.output`, `.wrangler` and local logs.
"# mango-kids" 
