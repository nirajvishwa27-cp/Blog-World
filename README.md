BlogWorld | Full-Stack Developer Assessment
A premium, high-performance blogging platform built with a focus on type-safety, minimal aesthetics, and scalable architecture.

Live Links:

Frontend (Vercel): https://blog-world-eight.vercel.app

Backend (Render): https://blog-world-3.onrender.com/
🏗️ Architecture Decisions
1. The Stack
Frontend: Next.js 15 (App Router)

Backend: NestJS for a structured, modularized TypeScript environment.

ORM: Prisma with PostgreSQL for type-safe database interactions and migrations.

Styling: Tailwind CSS 4 along with ShadCN using a "Studio" design system (Ink & Alabaster palette).

2. Design Philosophy: "Studio Narrative"
Instead of a standard SaaS dashboard look, I implemented an Editorial Aesthetic.

Typography over Boxes: Minimalist use of borders; focus on high-contrast typography and negative space.

UX Thinking: Implemented optimistic UI updates for comments and likes to ensure the platform feels "instant."

🚀 Advanced Concepts & Features
🛡️ Secure API & Rate Limiting
The backend is protected with a global ValidationPipe and CORS policies restricted to production origins. I utilized NestJS Throttler (optional/bonus) to protect against brute-force attacks on auth and comment endpoints.

📝 Structured Logging
Integrated a consistent logging strategy to track API requests, database queries, and error stack traces, making the system observable and easier to debug in production.

⚡ Performance
Next.js Image Optimization: Lazy-loaded assets and optimized font delivery.

Database Indexing: Added indexes on frequently queried fields like slug and userId to ensure fast lookups as the dataset grows.

📈 Scaling the System
If this were to scale to 100k+ users, I would implement the following:

Asynchronous Job Processing: Move heavy tasks (like sending notification emails for new comments) to a Redis-backed BullMQ queue to keep the main thread responsive.

Edge Caching: Implement Redis caching for the most popular blog posts to reduce database load.

Read Replicas: Scale the PostgreSQL instance by introducing read replicas for the feed, while keeping the primary instance for writes (comments/posts).

CDN Integration: Offload static assets and images to a global CDN (like Cloudinary or AWS S3/CloudFront).

🛠️ Local Setup
1.Backend Setup
Navigate to /backend and install dependencies:

Bash
npm install
Configure your .env with DATABASE_URL and JWT_SECRET.

Generate Prisma client and build:

Bash
npx prisma generate
npx prisma db push
npm run build
Start the server:

Bash
npm run start:dev


2.Frontend Setup
Navigate to /frontend and install dependencies:

Bash
npm install
Add NEXT_PUBLIC_API_URL to your .env.local.

Start the development server:

Bash
npm run dev
🧪 Technical Tradeoffs
Client-side vs Server-side Auth: I chose a JWT-based client-side approach for faster implementation in this assessment, though for a high-security enterprise app, I would transition to HttpOnly Cookies to mitigate XSS risks.

Monorepo Structure: Chose a simple folder-based monorepo for ease of deployment on Vercel/Render, though for larger teams, I would migrate to Turborepo.

👨‍💻 Developed by
Niraj Vishwakarma - Full-Stack Developer
