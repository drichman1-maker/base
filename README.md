# Slugger - Graded Baseball Card Tracker

Monorepo for tracking graded baseball card prices.

## Quick Start

```bash
# Install dependencies
npm install

# Set up database
cp .env.example .env
# Add your DATABASE_URL

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed

# Start development
npm run dev
```

## Structure

```
slugger/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/         # API server (future)
├── packages/
│   ├── ui/          # Shared UI components
│   ├── db/          # Database client & schema
│   ├── types/       # Shared TypeScript types
│   └── config/      # Shared config (TS, Tailwind, ESLint)
├── prisma/
│   └── schema.prisma
└── turbo.json
```

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind
- **Database:** PostgreSQL, Prisma
- **Monorepo:** Turborepo

## Phase Status

- [x] Phase 1: Foundation - DONE
- [ ] Phase 2: Frontend Scaffolding
- [ ] Phase 3: Backend & Data
- [ ] Phase 4: Deployment
