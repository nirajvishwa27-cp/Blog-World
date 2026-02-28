🛠️ Local Development Setup
1️⃣ Backend Setup
cd backend
npm install
Create .env file
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
Run Backend
npx prisma generate
npx prisma db push
npm run start:dev

Backend will run on:

http://localhost:3000
2️⃣ Frontend Setup
cd frontend
npm install
Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:3000
Run Frontend
npm run dev

Frontend will run on:

http://localhost:3001
🧪 Technical Tradeoffs
🔐 Authentication Strategy

For rapid development during the assessment, I implemented:

JWT-based client-side authentication

For enterprise-grade production systems, I would:

Migrate to HttpOnly cookies

Implement refresh token rotation

Add strict CSRF protection

Introduce session invalidation logic

🏗️ Project Structure

A simple folder-based monorepo was used for clarity and deployment ease.

For larger teams and production environments, I would:

Migrate to Turborepo

Enable build caching

Optimize CI/CD workflows

Introduce environment-based configuration management

👨‍💻 Author

Niraj Vishwakarma
Full-Stack Developer
