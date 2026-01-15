This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


the code structure:
webaigen/
├─ app/
│  ├─ (marketing)/
│  │  ├─ page.tsx
│  │  ├─ pricing/page.tsx
│  │  ├─ services/page.tsx
│  │  ├─ contact/page.tsx
│  │  └─ layout.tsx
│  │
│  ├─ (app)/
│  │  ├─ dashboard/page.tsx
│  │  ├─ dashboard/loading.tsx
│  │  ├─ dashboard/error.tsx
│  │  ├─ settings/page.tsx
│  │  └─ layout.tsx
│  │
│  ├─ api/
│  │  ├─ health/route.ts
│  │  ├─ contact/route.ts
│  │  └─ ai/
│  │     ├─ chat/route.ts
│  │     └─ summarize/route.ts
│  │
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ globals.css
│  └─ not-found.tsx
│
├─ components/
│  ├─ ui/                 # buttons, inputs, modal, etc.
│  ├─ layout/             # navbar, footer, sidebar
│  ├─ sections/           # hero, features, testimonials
│  └─ forms/              # contact form, onboarding, etc.
│
├─ features/              # domain modules (preferred for scale)
│  ├─ auth/
│  │  ├─ components/
│  │  ├─ actions.ts
│  │  ├─ schemas.ts
│  │  └─ types.ts
│  ├─ billing/
│  ├─ ai/
│  └─ projects/
│
├─ lib/
│  ├─ env.ts              # env validation + accessors
│  ├─ db.ts               # database client (if used)
│  ├─ auth.ts             # auth helpers
│  ├─ ai.ts               # AI client wrapper
│  ├─ fetcher.ts          # fetch wrapper / API client
│  └─ utils.ts            # shared utilities
│
├─ server/                # server-only code (safe separation)
│  ├─ services/           # business logic (server)
│  ├─ repositories/       # DB queries if needed
│  └─ actions/            # Next server actions (optional)
│
├─ types/
│  ├─ index.ts
│  └─ api.ts
│
├─ public/
├─ tests/                 # unit/integration (optional)
│
├─ .env.example
├─ .gitignore
├─ next.config.js
├─ package.json
├─ tsconfig.json
└─ middleware.ts          # auth / redirects (optional)


commands to create 
mkdir -p app/\(marketing\)/{pricing,services,contact}
mkdir -p app/\(app\)/{dashboard,settings}
mkdir -p app/api/{health,contact,ai/chat}
mkdir -p components/{ui,layout,sections,forms}
mkdir -p features/{ai,auth,billing,projects}
mkdir -p lib server/{services,repositories,actions} types
