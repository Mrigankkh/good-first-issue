# GoodFirstIssues

> Find your first open source issue faster than ever.

GoodFirstIssues is a modern web app that **fetches**, **filters**, and **recommends** good first issues from popular open-source projects — especially from **FAANG** and other major tech companies.

Built using:
-  FastAPI + Redis on the backend
-  Next.js (React) frontend
-  GitHub GraphQL API
-  Upstash Redis
-  TailwindCSS

---

##  Features

-  **Real-time good first issues** from GitHub (refreshed every 6 hours)
-  **Filter by organization** (FAANG + others)
-  **Recommended Issue** 
-  **Language filters**, **sorting by stars**, **last updated**
-  Worker using Github graphQL API


---

##  Live Demo



---

##  Screenshots


---

## Getting Started (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/goodfirstissues.git
cd goodfirstissues
```

### 2. Backend Setup

```bash
# Create virtualenv
make start-backend

# In another terminal, start the background worker
make start-worker
```
Make sure you have .env set in backend/.env:

```dotenv
GITHUB_TOKEN=your_github_token
REDIS_URL=your_upstash_redis_url
```

### 3. Frontend Setup using Next.js
```bash
cd frontend
npm install
npm run dev
```
Make sure you have .env.local in frontend/

```dotenv
BACKEND_URL=http://localhost:8000
```
