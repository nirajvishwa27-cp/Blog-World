🖋️ BlogWorld | Full-Stack Developer Assessment
A premium, high-performance blogging platform built with a focus on type-safety, minimal aesthetics, and scalable architecture.

🔗 Live Links
Frontend (Vercel): https://blog-world-eight.vercel.app

Backend (Render): https://blog-world-3.onrender.com/

🏗️ Architecture Decisions
The Tech Stack
Frontend: Next.js 15 (App Router) for React Server Components and optimized rendering.

Backend: NestJS providing a structured, modularized TypeScript environment.

ORM: Prisma with PostgreSQL for type-safe database interactions.

Styling: Tailwind CSS 4 + ShadCN UI using a custom "Studio" design system (Ink & Alabaster palette).

Design Philosophy: "Studio Narrative"
Instead of a standard SaaS dashboard, I implemented an Editorial Aesthetic:

Typography over Boxes: Minimalist borders with a focus on high-contrast typography and negative space.

UX Thinking: Implemented optimistic UI updates for comments and likes to ensure the platform feels "instant."

🚀 Advanced Concepts & Features
🛡️ Secure API & Rate Limiting: Global ValidationPipe and restricted CORS policies. Integrated NestJS Throttler to prevent brute-force attacks on sensitive endpoints.

📝 Structured Logging: Consistent logging strategy to track API requests and database queries for better observability.

⚡ Performance Optimization:

Image Optimization: Next.js lazy-loading and optimized font delivery.

Database Indexing: Indexes on frequently queried fields (slug, userId) for fast lookups at scale.

📈 Scaling the System
To support 100k+ users, I would implement:

Async Job Processing: Move heavy tasks (emails/notifications) to a Redis-backed BullMQ queue.

Edge Caching: Implement Redis caching for popular blog posts to reduce DB load.

Read Replicas: Scale PostgreSQL by introducing read replicas for the feed.

CDN Integration: Offload static assets to a global CDN like AWS S3/CloudFront.

🛠️ Local Setup
1. Backend Setup
Bash
cd backend
npm install
# Configure .env with DATABASE_URL and JWT_SECRET
npx prisma generate
npx prisma db push
npm run build
npm run start:dev
2. Frontend Setup
Bash
cd frontend
npm install
# Add NEXT_PUBLIC_API_URL to .env.local
npm run dev
🧪 Technical Tradeoffs
Auth Strategy: Chose JWT-based client-side auth for rapid development in this assessment. For enterprise production, I would transition to HttpOnly Cookies to mitigate XSS risks.

Project Structure: Used a simple folder-based monorepo for deployment ease. For larger teams, I would migrate to Turborepo for better build caching.

👨‍💻 Developed by Niraj Vishwakarma Full-Stack Developer
