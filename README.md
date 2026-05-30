# Gospel Oak Handyman

Professional handyman business website for Gospel Oak Handyman — serving Camden, Gospel Oak, NW3 & NW5.

Built with **Next.js 14** (App Router), **Tailwind CSS**, and **Supabase**. Deploy-ready for **Vercel**.

## Features

- Public pages: Home, Services, About, Contact
- Contact form with Supabase database storage
- Email notifications via Gmail SMTP (Nodemailer)
- Protected admin panel with Supabase Auth
- Request management dashboard with status tracking

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable (anon) key |
| `GMAIL_USER` | Gmail address for sending notifications |
| `GMAIL_APP_PASSWORD` | Gmail App Password (see below) |

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

### Database schema

Run the following SQL in the **Supabase SQL Editor** (Dashboard → SQL Editor → New query):

```sql
CREATE TABLE contact_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'declined')),
  admin_notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON contact_requests
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON contact_requests
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated updates" ON contact_requests
  FOR UPDATE TO authenticated USING (true);
```

### Create admin user

1. Go to your Supabase Dashboard → **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter the owner's email and a secure password
4. This is the only admin account — use these credentials at `/admin/login`

## Gmail App Password

To enable email notifications when contact forms are submitted:

1. Enable **2-Step Verification** on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Create a new app password for "Mail"
4. Copy the 16-character password into `GMAIL_APP_PASSWORD` in `.env.local`

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add all environment variables from `.env.example` in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
4. Deploy — Vercel will auto-detect Next.js via `vercel.json`

## Logo

Place your logo file at `public/logo.jpg`. The site references this path throughout.

## Project Structure

```
app/
├── page.tsx              # Home
├── services/page.tsx     # Services
├── about/page.tsx        # About
├── contact/page.tsx      # Contact form
├── admin/                # Protected admin panel
└── api/send-notification # Email API route
components/               # Reusable UI components
lib/                      # Supabase client & shared data
middleware.ts             # Admin route protection
```

## License

Private — Gospel Oak Handyman. All rights reserved.
