# Gospel Oak Handyman — Project Context

## Overview
Business website for Gospel Oak Handyman, a residential property maintenance and repair service based in Camden and Gospel Oak, London.

## Live URLs
- Production: https://gospel-oak-handyman.vercel.app
- Admin panel: https://gospel-oak-handyman.vercel.app/admin/login
- GitHub: https://github.com/parwar-cyber/gospel-oak-handyman

## Tech Stack
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth (email/password — single admin user)
- Email: Nodemailer via Gmail SMTP
- Deployment: Vercel

## Supabase Project
- Project ref: kugukftpqmwtzjrfwnjs
- Project URL: https://kugukftpqmwtzjrfwnjs.supabase.co
- Anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1Z3VrZnRwcW13dHpqcmZ3bmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNjIzNTUsImV4cCI6MjA5NTczODM1NX0.JdwYrT0_u9o2LLZ6fu65PBoaIETzxA6K4OPCWYhy_lE
- Dashboard: https://supabase.com/dashboard/project/kugukftpqmwtzjrfwnjs

## Database Tables
### contact_requests
Stores all customer enquiries submitted via the contact form.
Columns: id, name, email, phone, service, message, status, admin_notes, created_at
RLS: anon can INSERT, authenticated can SELECT/UPDATE/DELETE

### opening_hours
Stores the business opening hours, editable from the admin panel.
Columns: id, day, open_time, close_time, is_closed, sort_order
RLS: anon can SELECT, authenticated can INSERT/UPDATE

## Environment Variables
Stored in .env.local (never committed) and in Vercel project settings:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- GMAIL_USER=gospeloakhandyman@gmail.com
- GMAIL_APP_PASSWORD=(see owner)

## Business Info
- Name: Gospel Oak Handyman
- Owner: Karzan
- Address: Mansfield Road, London NW3 2JL
- Phone: +44 7784 010417
- Email: gospeloakhandyman@gmail.com
- Instagram: https://www.instagram.com/gospeloakhandyman
- Facebook: https://www.facebook.com/share/1E5zFCCXJ3/
- Google Reviews: https://share.google/GqnP27SpaUj6SAQsS
- Area served: Camden, Gospel Oak, Hampstead, Kentish Town, NW3, NW5

## Brand Colors
- Primary Orange: #F5820A
- Dark: #1A1A1A
- White: #FFFFFF

## Opening Hours (default — editable from admin)
- Monday–Friday: 8:00 AM – 5:00 PM
- Saturday: 9:00 AM – 5:00 PM
- Sunday: Closed

## Services Offered
1. General Repairs
2. Property Maintenance
3. Electrical Maintenance (small-scale, non-certified)
4. Plumbing Maintenance (small-scale)
5. Painting & Decorating
6. Carpentry & Bespoke

## Admin Panel
- Login: /admin/login
- Dashboard: /admin/dashboard (view/manage contact requests)
- Opening Hours: /admin/hours (edit opening hours)
- Auth: Supabase email/password — single user (gospeloakhandyman@gmail.com)
- Protected via middleware.ts using @supabase/ssr

## Key Files
- lib/supabase.ts — Supabase browser client singleton
- middleware.ts — protects /admin/* routes
- app/api/send-notification/route.ts — email notification on form submit
- components/ContactForm.tsx — public contact form
- components/Navbar.tsx — site navigation + social icons
- components/Footer.tsx — footer with social links
- components/admin/AdminSidebar.tsx — admin nav

## Notes for AI Agents
- Always use project ref kugukftpqmwtzjrfwnjs for Supabase — do not use any other project
- The Supabase MCP in this environment may be linked to a different project (pxihytlqbbvwlynpkdqg) — always verify before running migrations
- If Supabase CLI is unavailable, apply SQL directly via the Supabase dashboard SQL editor
- Do not commit .env.local — it is gitignored
- After any code change: npm run build → fix errors → git add -A → git commit → git push origin main → vercel --prod
