<h1 align="center">🖋️ BlogWorld — Full-Stack Developer Assessment</h1>

<p align="center">
A premium, high-performance blogging platform focused on type-safety, editorial design, and scalable backend architecture.
</p>

---

## 🚀 Highlights

- 🔐 Secure JWT Authentication (Register / Login)
- 🛡️ Global Validation & API Rate Limiting
- 📝 Create, Edit & Delete Blogs (Owner-Restricted)
- 🌍 Public Feed with Pagination (Optimized Queries)
- ❤️ Like System with DB-Level Unique Constraint
- 💬 Comment System with Optimistic UI Updates
- ⚡ Type-Safe Backend using NestJS + Prisma
- 🧠 Structured Logging & Production-Ready Patterns
- 📈 Designed for Horizontal Scaling

---

## 🔗 Live Deployment

- 🌐 **Frontend (Vercel)**  
  https://blog-world-eight.vercel.app  

- 🖥 **Backend (Render)**  
  https://blog-world-3.onrender.com/

---

## 🏗️ Tech Stack

### 🎨 Frontend
- Next.js 15 (App Router)
- React Server Components
- Tailwind CSS 4
- ShadCN UI

### ⚙️ Backend
- NestJS (Modular Architecture)
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Rate Limiting (Throttler)

---

## 🎨 Design Philosophy — *Studio Narrative*

Instead of building a traditional SaaS dashboard, BlogWorld follows an editorial-first aesthetic.

- ✨ Typography over heavy UI boxes  
- 🧩 Clean negative space  
- ⚡ Instant UX with optimistic updates  
- 🧠 Minimalist, distraction-free reading experience  

---

## ⚡ Performance & Optimization

- 📦 Indexed database fields (`slug`, `userId`)
- 🚫 Avoided N+1 query problem
- ⚡ Optimized feed queries with Prisma `_count`
- 🖼 Next.js image & font optimization
- 📝 Structured logging for observability

---

## 📈 Scaling Strategy (100k+ Users)

To scale BlogWorld in production:

- 🔄 Redis + BullMQ for async job processing
- ⚡ Redis caching for popular blog posts
- 🗄 PostgreSQL read replicas for feed-heavy traffic
- 🌍 CDN integration (S3 + CloudFront)
- 🚦 Horizontal scaling with load balancing

---

# 🧪 Environment Setup

## 🔧 Backend (`/backend`)

Create `.env` file:

```bash
DATABASE_URL=your_database_url

## 🔧 Run the Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

## 📱 Run the Mobile App

```bash
cd frontend
npm install
npm run dev
```
