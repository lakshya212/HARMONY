# HARMONY: Roommate Conflict Resolution & Shared Living Management System

[![BCA Minor Project](https://img.shields.io/badge/Course-BCA--508%20Minor%20Project-blue.svg)](https://imsnoida.com)
[![Institution](https://img.shields.io/badge/College-IMS%20Noida%20(SOIT)-green.svg)](https://imsnoida.com)
[![University](https://img.shields.io/badge/University-CCSU%20Meerut-orange.svg)](https://ccsuniversity.ac.in)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

An intelligent, computational full-stack web application designed to eliminate shared-living friction through automated equal expense balancing, gamified chore distribution, and transparent accountability dashboards.

---

## 🏛️ Academic Institutional Context
- **Institution:** Institute of Management Studies (IMS), Noida
- **Department:** School of Information Technology (SOIT)
- **Affiliated University:** Chaudhary Charan Singh University (CCSU), Meerut (U.P.)
- **Course & Semester:** Bachelor of Computer Applications (BCA), 5th Semester
- **Subject Name & Code:** Minor Project (BCA-508)
- **Academic Batch:** 2024–2027 (Academic Year 2026)
- **HOD (SOIT):** Ms. Monika Dixit Bajpai
- **Project Coordinators & Mentors:**
  - Mr. Nihal Kumar (Coordinator / Mentor - Panel 2, Room DG4 for Sections B + D)
  - Mr. Anushrav Mudgal (Coordinator / Mentor - Panel 3, Seminar Hall for Sections A + C)
  - Dr. Ajay Gupta (Panel 3 Member)
  - Ms. Shaili Nigam (Panel 2 Member)

---

## 🚀 Key Features

1. **Equitable Chore Rotation & Gamification:**
   - Tasks carry dynamic effort points based on difficulty (15 to 35 pts).
   - Real-time leaderboard and Recharts effort bar chart visualize household contribution.
   - Filter by status (`Pending`, `Completed`), category (`Kitchen`, `Cleaning`, `Groceries`, `Maintenance`), or assigned roommate.
2. **Automated Equal Expense Splitting ($T/N$):**
   - Eliminates awkward money confrontations with exact mathematical ledger balancing.
   - Computes net balance: $\text{Net Balance}_i = \text{Total Paid}_i - \sum \text{Split Share}_{i,j}$.
   - Instant visual cues: green indicator for positive balance (to be reimbursed) and amber/red for negative balance (pending share).
3. **Live Roommate Switcher (Viva Evaluation Mode):**
   - 1-click switching between flatmates (**Lakshya Shukla [Admin]**, **Rahul Verma**, **Aman Gupta**, **Rohit Kumar**) in the top navigation bar to test role-based perspectives live in front of the examiners.
4. **Dual Data Architecture (Offline-Safe & Cloud-Ready):**
   - **Offline Mock Store Engine:** Automatically activates if backend or internet is disconnected. Zero crashes during classroom vivas!
   - **Production PostgreSQL / Supabase:** Production-grade 3NF relational schema with Row-Level Security (RLS) triggers.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React, Recharts |
| **Backend API** | Node.js, Express.js, Morgan logger, CORS, Dotenv |
| **Database** | PostgreSQL / Supabase (Cloud) + In-memory Mock Engine (Local Fallback) |
| **Hosting & CI/CD** | Vercel (Frontend SPA) + Render (Node.js API Web Service) [100% Free Tier] |
| **Tools** | VS Code, Git, GitHub, Postman |

---

## 📂 Project Repository Structure

```
HARMONY/
├── backend/                        # Express.js REST API Server
│   ├── src/
│   │   ├── config/supabase.js      # Supabase Client & Fallback Switch
│   │   ├── data/mockStore.js       # In-memory Calculation & Demo Store Engine
│   │   ├── routes/
│   │   │   ├── health.js           # Uptime & Health Check Endpoint
│   │   │   ├── households.js       # Flat creation & Invite Code lookup
│   │   │   ├── tasks.js            # Chore CRUD & completion toggles
│   │   │   ├── expenses.js         # Expense ledger & split engine
│   │   │   ├── dashboard.js        # KPI & Recharts aggregation
│   │   │   └── admin.js            # Household members & admin control
│   │   ├── app.js                  # Express middleware configuration
│   │   └── server.js               # HTTP Server Entry Point (Port 5000)
│   └── package.json
├── frontend/                       # React + Vite + Tailwind Client
│   ├── src/
│   │   ├── components/             # Reusable UI (Navbar, Modals, Footer)
│   │   ├── context/AppContext.jsx  # Global State & Offline-mutation engine
│   │   ├── pages/                  # Landing, Dashboard, Tasks, Expenses, Admin, Login, Register
│   │   ├── App.jsx                 # Client-side router configuration
│   │   └── main.jsx                # React DOM Mount
│   ├── vite.config.js              # Vite server & API proxy
│   ├── tailwind.config.js          # Tailwind styling definitions
│   └── package.json
├── database/                       # Relational Database SQL Scripts
│   ├── schema.sql                  # Production 3NF Schema & RLS policies
│   └── seed.sql                    # Realistic demo household & transaction data
├── plan/                           # Official IMS Noida & CCSU reference templates
│   ├── ccsu_logo.png               # High-res CCSU Coat of Arms
│   └── Synopsis_Panel_List.pdf     # College panel distributions
├── BCA_508_Minor_Project_Synopsis_HARMONY.docx  # Final Word document for print
├── BCA_508_Minor_Project_Synopsis_HARMONY.md    # Markdown counterpart
└── README.md
```

---

## ⚡ Quick Start Guide (Local Setup)

### 1. Prerequisites
- **Node.js** v18+ or v20+ installed (`node -v`)
- **npm** v9+ installed (`npm -v`)

### 2. Start Backend API
```bash
cd backend
npm install
npm run dev
# Server will start on http://localhost:5000
# Health check available at http://localhost:5000/api/health
```

### 3. Start Frontend Client (in a separate terminal)
```bash
cd frontend
npm install
npm run dev
# Client will start on http://localhost:5173
```

Visit `http://localhost:5173` in your browser. The frontend will communicate automatically with the backend via the Vite proxy (`/api`).

---

## ☁️ Live Cloud Deployment (₹0 Zero-Cost Guide)

### Step 1: Push Code to GitHub
1. Create a new GitHub repository named `harmony-bca508`.
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "feat: complete submission-ready HARMONY platform"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/harmony-bca508.git
   git push -u origin main
   ```

### Step 2: Deploy Backend to Render (Free Tier)
1. Sign in to [Render.com](https://render.com) with GitHub.
2. Click **New +** $\rightarrow$ **Web Service**.
3. Select your repository `harmony-bca508`.
4. Configure settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/server.js`
   - **Plan:** Free
5. Deploy and copy your backend URL (e.g., `https://harmony-api.onrender.com`).

### Step 3: Deploy Frontend to Vercel (Free Tier)
1. Sign in to [Vercel.com](https://vercel.com) with GitHub.
2. Click **Add New...** $\rightarrow$ **Project**.
3. Import `harmony-bca508`.
4. Configure settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
5. Add Environment Variable (Optional, for direct Render URL):
   - `VITE_API_URL` = `https://harmony-api.onrender.com`
6. Click **Deploy**. Your live clickable URL will be active immediately (e.g., `https://harmony-living.vercel.app`).

> **Tip for Presentation Day (24th Oct 2026):**
> Free Render web services spin down after 15 minutes of inactivity. Open your Render backend URL 2 minutes before your presentation slot to ensure instant response times!

---

## 🎓 Academic Evaluation Checklist (BCA-508)
- [x] Official CCSU Coat of Arms on Title Page
- [x] College Proforma for Approval with mentor signature lines
- [x] Certificate of Originality & Acknowledgment
- [x] Mandatory Internship Certificate placeholder page
- [x] All 11 Sections strictly followed in designated order
- [x] Level 0, Level 1, Level 2 DFDs isolated on individual pages
- [x] 100% functional live full-stack system deployable to Vercel/Render
