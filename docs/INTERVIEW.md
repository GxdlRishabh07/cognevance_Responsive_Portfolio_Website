# Portfolio — How It Works (Interview Guide)

## Stack

- React 19 + TanStack Start (routing, server functions), Vite, Tailwind CSS v4.
- Supabase (PostgreSQL) stores contact messages.

## Structure

- `src/routes/index.jsx` — the page: Hero, About, Skills, Projects, Contact, Footer.
- `src/data/profile.js` — all personal content in one place (edit here, not in the markup).
- `src/components/Navbar.jsx` — sticky nav; hamburger menu below 768px.
- `src/components/Reveal.jsx` — scroll animation using IntersectionObserver.
- `src/components/ContactForm.jsx` — form, client validation, success/error states.
- `src/lib/contact-schema.js` — one zod schema shared by browser and server.
- `src/lib/contact.functions.js` — server function that inserts into the database.

## Contact flow

1. User submits -> zod validates in the browser (instant feedback).
2. Server function validates again (never trust the client).
3. Insert into `contact_messages` (id, name, email, message, created_at).

## Security

- Row Level Security on; the only policy allows INSERT. No SELECT policy, so nobody can read messages through the public API.
- Database CHECK constraints limit field lengths as a last line of defence.
- Only the publishable key is used; no secrets in the browser.

## Responsive & accessible

- Mobile-first Tailwind breakpoints (md, lg).
- Labels on every input, aria-invalid + error text, aria-live status, keyboard-focusable controls.
- Animations disabled for prefers-reduced-motion.

## Likely questions

- Why validate twice? Client = UX, server = security.
- What is RLS? Postgres rules deciding which rows each role can read/write.
- Why IntersectionObserver over scroll listeners? Cheaper; the browser notifies on visibility.
- How would you view messages? In the Supabase dashboard, or build an admin page behind login.
