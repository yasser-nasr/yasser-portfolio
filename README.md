# Yasser Nasr Portfolio

Portfolio and case-study website built with Next.js, React, TypeScript, Tailwind CSS, Motion, and Resend. The interface uses Poppins plus the local Alpharush display font.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and configure the required values.
3. Start the site with `npm run dev`.
4. Open `http://localhost:3000`.

## Environment variables

- `RESEND_API_KEY`: Resend API key used by the contact route.
- `CONTACT_TO_EMAIL`: Inbox that receives contact submissions.
- `CONTACT_FROM_EMAIL`: Verified Resend sender address.
- `NEXT_PUBLIC_SITE_URL`: Canonical production origin; defaults to `https://yassernasr.com`.
- `NEXT_PUBLIC_GA_ID`: Optional Google Analytics measurement ID.
- `NEXT_PUBLIC_CLARITY_ID`: Optional Microsoft Clarity project ID.

The contact form will return a configuration error until all three email variables are set.

## Validation

Run these checks before committing or deploying:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

## Production

Configure the environment variables in the deployment platform before building. Static project assets are served from `public/`, while the contact form is handled by `/api/contact`.
