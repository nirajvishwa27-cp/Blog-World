🖋️ BlogWorld
Full-Stack Developer Assessment

A premium, high-performance blogging platform built with a strong focus on type safety, clean architecture, editorial aesthetics, and scalability.

🔗 Live Application

Frontend (Vercel)
https://blog-world-eight.vercel.app

Backend (Render)
https://blog-world-3.onrender.com/

🏗️ Architecture Overview
🧱 Tech Stack
Frontend

Next.js 15 (App Router)

React Server Components

Optimized rendering & routing

Tailwind CSS 4 + ShadCN UI

Backend

NestJS (Modular, structured TypeScript framework)

JWT-based authentication

Global validation & request handling

Database & ORM

PostgreSQL

Prisma ORM for type-safe database operations

🎨 Design Philosophy — Studio Narrative

Rather than building a traditional SaaS dashboard UI, BlogWorld follows an Editorial Design System.

✨ Typography Over Boxes

Minimal borders

Strong typographic hierarchy

Emphasis on negative space

Clean reading experience

⚡ Instant UX

Optimistic UI updates for:

Comments

Likes

Immediate visual feedback without page reloads

🚀 Advanced Concepts & Features
🛡️ Security & API Hardening

Global ValidationPipe

Restricted CORS policies

Rate limiting using NestJS Throttler

Protection against brute-force attempts

Proper status codes & secure error handling

📝 Structured Logging

Centralized logging strategy

API request tracking

Database query observability

Production-ready monitoring foundation

⚡ Performance Optimizations
Frontend

Automatic image optimization

Optimized font delivery

Efficient rendering with Next.js App Router

Database

Indexed fields:

slug

userId

Optimized feed queries

Avoided N+1 query problem

📈 Scaling Strategy (100K+ Users)

To scale BlogWorld for large production workloads, the following would be implemented:

🔄 Async Job Processing

Redis-backed BullMQ

Offload heavy tasks:

Emails

Notifications

Background summaries

⚡ Edge Caching

Redis caching for:

Popular blog posts

Public feed endpoints

🗄️ Read Replicas

PostgreSQL read replicas for feed-heavy traffic

🌍 CDN Integration

Static asset offloading to:

AWS S3

CloudFront

🛠️ Local Development Setup
1️⃣ Backend Setup
cd backend
npm install

Create .env file:

DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret

Then run:

npx prisma generate
npx prisma db push
npm run start:dev
2️⃣ Frontend Setup
cd frontend
npm install

Create .env.local file:

NEXT_PUBLIC_API_URL=http://localhost:3000

Then run:

npm run dev
🧪 Technical Tradeoffs
🔐 Authentication Strategy

Used JWT-based client-side authentication for faster development during the assessment.

For enterprise production environments:

I would migrate to HttpOnly cookies

Add refresh token rotation

Implement stricter CSRF protection

🏗️ Project Structure

Simple folder-based monorepo for deployment clarity.

For larger teams:

I would migrate to Turborepo

Enable build caching

Improve CI/CD performance

👨‍💻 Author

Niraj Vishwakarma
Full-Stack Developer
