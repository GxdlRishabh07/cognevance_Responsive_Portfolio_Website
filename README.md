# Rishabh Patil — Developer Portfolio

A modern, high-performance full-stack developer portfolio web application built with **React 19**, **TanStack Start (SSR)**, **Tailwind CSS v4**, and **Supabase**.

Designed with an editorial aesthetic, typography hierarchy, fluid micro-animations, accessible UI components, and a server-side contact system.

---

## ⚡ Highlights & Features

- **Full-Stack SSR Architecture**: Powered by [TanStack Start](https://tanstack.com/start) and [Nitro](https://nitro.unjs.io/) for fast first-page load, instant hydration, and optimal SEO.
- **Modern Design System**: Built with Tailwind CSS v4, custom CSS variables, and typography using *Source Serif 4*, *Inter*, and *JetBrains Mono*.
- **Interactive Contact Workflow**: Full-stack contact form validated with **Zod** on both client and server, processed via TanStack Start **Server Functions** (`createServerFn`), and persisted to **Supabase (PostgreSQL)**.
- **Zero Third-Party Vendor Locks**: Clean, standard JavaScript/ESM codebase with standalone dependencies and idiomatic architecture.
- **CSRF & Security Hardened**: Built-in CSRF middleware for server function endpoints and Row Level Security (RLS) policies on the database.
- **Fully Responsive**: Mobile-first layout with accessible navigation, custom mobile menu drawer, and adaptive layouts across all breakpoints.
- **SEO & Social Sharing Ready**: Fully configured Open Graph meta tags, Twitter card previews, and search engine directives.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Routing & SSR**: [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router)
- **State & Data Fetching**: [TanStack Query v5](https://tanstack.com/query)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/) (Accessible headless components)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)

### Backend & Database
- **Server Engine**: [Nitro](https://nitro.unjs.io/) (via `@tanstack/react-start`)
- **Server Functions**: TanStack Start `createServerFn` (RPC-style type-safe server handlers)
- **Database**: [Supabase](https://supabase.com/) (Managed PostgreSQL)
- **Database Client**: `@supabase/supabase-js`

### Tooling & Quality
- **Bundler & Dev Server**: [Vite 8](https://vite.dev/)
- **Test Runner**: [Vitest](https://vitest.dev/)
- **Linting & Formatting**: ESLint 9 & Prettier

---

## 📂 Project Structure

```text
portfolio-javascript/
├── public/
│   ├── favicon.ico           # Multi-resolution custom monogram favicon (RP)
│   ├── favicon.svg           # Scalable vector favicon
│   ├── robots.txt            # Search engine crawler rules
│   └── Rishabh-Patil-Resume.pdf # Downloadable resume PDF asset
├── src/
│   ├── components/
│   │   ├── ui/               # Headless Radix UI styled components (buttons, dialogs, etc.)
│   │   ├── ContactForm.jsx   # Interactive contact form with live validation and submission
│   │   ├── Navbar.jsx        # Sticky navigation with mobile drawer and scroll effects
│   │   └── Reveal.jsx        # Intersection observer reveal animation component
│   ├── data/
│   │   └── profile.js        # Centralized profile data (bio, experience, skills, projects)
│   ├── hooks/
│   │   └── use-mobile.jsx    # Screen breakpoint detection hook
│   ├── lib/
│   │   ├── contact-schema.js # Zod schema for contact form data validation
│   │   ├── contact.functions.js # TanStack Start server function for handling form submissions
│   │   ├── supabase.js       # Configured Supabase client initialization
│   │   └── utils.js          # Class variance authority and Tailwind merge utilities
│   ├── routes/
│   │   ├── __root.jsx        # Root HTML shell, fonts, meta tags, and global layout
│   │   └── index.jsx         # Single-page portfolio route (Hero, About, Skills, Projects, Contact)
│   ├── router.jsx            # TanStack Router instance creation
│   ├── server.js             # Nitro SSR server handler entry
│   ├── start.js              # TanStack Start instance with CSRF middleware
│   └── styles.css            # Tailwind v4 theme tokens, fonts, and custom utilities
├── supabase/
│   └── config.toml           # Supabase CLI project configuration
├── .env                      # Environment variables (Supabase URL & API Keys)
├── components.json           # shadcn/ui configuration
├── package.json              # Project scripts and dependencies
├── vite.config.js            # Vite build, plugins, and alias configuration
└── README.md                 # Project documentation
```

---

## 🔄 Project Workflow & Data Flow

```text
[User Browser]
      │
      ▼
1. Fills Contact Form (ContactForm.jsx)
      │
      ▼
2. Client-side Zod validation (contact-schema.js)
      │  (Passes)
      ▼
3. Calls Server Function `sendContactMessage` (contact.functions.js)
      │  (via TanStack Start `_serverFn` POST endpoint)
      ▼
[Nitro SSR Server / Node Backend]
      │
      ▼
4. CSRF Middleware validation (start.js)
      │
      ▼
5. Server-side Zod validation (contact-schema.js)
      │
      ▼
6. Supabase Client inserts row to `contact_messages` (supabase.js)
      │
      ▼
[Supabase Database (PostgreSQL)]
      │
      ▼
7. Row saved with timestamp -> Returns status 201 Created
      │
      ▼
[User Browser]
      │
      ▼
8. UI updates to "Thanks! Your message was sent."
```

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm` (comes with Node), `pnpm`, or `bun`

Verify your Node version:
```bash
node -v
npm -v
```

---

### 2. Installation

1. Navigate to the project directory:
   ```bash
   cd "portfolio-javascript"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

### 3. Environment Variables Configuration

Create or update the `.env` file in the root of the project with your Supabase credentials:

```bash
# .env
SUPABASE_PROJECT_ID="your-project-id"
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_PUBLISHABLE_KEY="your-anon-publishable-key"

# Vite client-side exposed variables
VITE_SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-publishable-key"
```

> [!NOTE]
> The repository comes pre-configured with default credentials to connect out of the box. If you connect your own Supabase project, replace the values with your project's URL and anon key from the Supabase Dashboard under **Project Settings → API**.

---

### 4. Supabase Database Setup

If setting up a new Supabase project, run the following SQL query in the **Supabase SQL Editor** to create the required table and Row Level Security (RLS) policies:

```sql
-- 1. Create the contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous public submissions (INSERT only)
CREATE POLICY "Allow anonymous message submission"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Restrict read access to authenticated service role / dashboard users only
CREATE POLICY "Allow read access to service role only"
ON public.contact_messages
FOR SELECT
TO authenticated, service_role
USING (true);
```

---

## 💻 Running the Application

### Development Mode

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:5173
```

### Production Build

Create an optimized SSR production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Running Tests

Execute Vitest test suites:

```bash
# Single test run
npm run test

# Watch mode
npm run test:watch
```

### Code Formatting & Linting

```bash
# Check code style with ESLint
npm run lint

# Auto-format codebase with Prettier
npm run format
```

---

## 🎨 Personalization & Content Updates

To customize the portfolio content with your own information:

1. **Profile Data**: Edit [`src/data/profile.js`](src/data/profile.js) to update:
   - Name, headline, short intro, and about paragraphs.
   - Education history, degrees, and institutions.
   - Skill categories (Languages, Frontend, Backend, Databases, Tools).
   - Projects (title, description, tags, GitHub / live demo links).
   - Social links (GitHub, LinkedIn, Email).

2. **Resume PDF**:
   - Replace [`public/Rishabh-Patil-Resume.pdf`](public/Rishabh-Patil-Resume.pdf) with your updated resume file.

3. **Favicon & Branding**:
   - Update [`public/favicon.ico`](public/favicon.ico) and [`public/favicon.svg`](public/favicon.svg) to change the browser tab icon.

---

## 🚢 Deployment

This project uses TanStack Start with the Nitro engine and can be deployed seamlessly to any modern hosting platform:

### Vercel
1. Push the project to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set the Framework Preset to **Vite** or **Other**.
4. Add your `.env` variables (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`) in the Vercel Project Settings.
5. Deploy.

### Cloudflare Pages / Workers
The build is configured with `nitro({ defaultPreset: "cloudflare-module" })` in [`vite.config.js`](vite.config.js) when running `npm run build`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Feel free to use it as inspiration or a template for your own developer portfolio!

---

**Author**: [Rishabh Patil](https://github.com/GxdlRishabh07)  
**LinkedIn**: [Rishabh Patil](https://www.linkedin.com/in/rishabh-patil-799380272/)  
**Email**: [patilrishabh50@gmail.com](mailto:patilrishabh50@gmail.com)
