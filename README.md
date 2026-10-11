# BugTrack

A modern, responsive bug-tracking dashboard for software development teams. Built as a mobile-friendly full-stack learning project.

## Current status

The first milestone is a **frontend prototype** with sample/demo data. Create and status-update actions currently affect in-memory state only; refreshing the page resets them. Supabase persistence and authentication are planned for the next milestone.

## Features in the prototype

- Hybrid interface: dark navigation sidebar and light workspace
- Responsive layout for mobile and desktop
- Issue overview cards for total, open, in-progress, and resolved issues
- Search issues by ID, title, project, or assignee
- Filter issues by status
- Create issue dialog with title, project, severity, and description
- Click a status badge to cycle through Open, In Progress, and Resolved
- Accessible labels, keyboard focus styles, and reduced-motion support

## Tech stack

- React
- Vite
- Tailwind CSS v4
- Lucide icons

## Run locally

Requires Node.js 20 or another Node.js version supported by the installed Vite release.

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
npm run preview
```

## Roadmap

1. Connect Supabase and create the issues table.
2. Add authentication and row-level security (RLS).
3. Persist create, edit, and status-change operations.
4. Add project management, comments, and issue details.
5. Deploy the application and document the live demo.

## Security

- Never commit API keys, database passwords, or service-role keys.
- Keep privileged Supabase keys on trusted server-side code only.
- Enable and test RLS policies before connecting user data.
- Treat demo content as sample data, not real issue records.
