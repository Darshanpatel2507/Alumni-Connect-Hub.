# AlumniHub Full-Stack Portal

A complete backend API and Admin panel for the Alumni Interaction Portal.

## 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a MongoDB Atlas connection string.

## 2. Setup & Run the Backend

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd "v:\alumni interaction portal\backend"
   ```
2. Install standard Node dependencies:
   ```bash
   npm install
   ```
3. Initialize the database with an Admin user:
   ```bash
   node seedAdmin.js
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server will run on `http://localhost:5000`*

## 3. Setup & Run the Admin Frontend

1. Open a **new** terminal window and navigate to the admin panel folder:
   ```bash
   cd "v:\alumni interaction portal\frontend\admin-panel"
   ```
2. Install React dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The admin portal will open automatically (usually `http://localhost:5173`)*

## 4. Admin Login Credentials

Use these credentials to log into the Admin Dashboard:
- **Email:** `admin@alumnihub.com`
- **Password:** `Admin@1234`

## Features Included
- **Roles:** Students (auto access), Alumni (pending admin approval), Admins.
- **Backend API:** Fully protected with JWT. Endpoints for auth, posts, events, directories.
- **Admin Dashboard:** Approve/reject users, manage posts & events, view platform stats.

---

## 5. How to Deploy Online (Production)

To make your Alumni portal live on the internet, you need to host three components: the Database, the Backend API, and the Frontend.

### Step 1: Database (MongoDB Atlas)
Instead of running MongoDB locally, you need a cloud database.
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Create a Free Cluster and set up a database user (username and password).
3. Allow access from anywhere (IP `0.0.0.0/0`) in the Network Access settings.
4. Get your connection string: Click "Connect", choose "Connect your application", and copy the URI (it looks like `mongodb+srv://<username>:<password>@cluster0...`).

### Step 2: Backend (Render or Railway)
Host your Node.js/Express API. [Render](https://render.com/) is great and offers a free tier.
1. Push your code to a GitHub repository.
2. Go to Render and create a new **Web Service**.
3. Connect your GitHub repo and select the `backend` folder as the Root Directory.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. **Environment Variables**: Add your `.env` variables in Render's dashboard:
   - `MONGO_URI` (paste your Atlas string here)
   - `JWT_SECRET` (make up a strong random string)
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD` etc.
7. Deploy! Render will give you a live URL like `https://alumnihub-api.onrender.com`.

### Step 3: Admin Frontend (Vercel or Netlify)
Host your React dashboard.
1. First, update `frontend/admin-panel/src/services/api.js` to use your live Render backend URL instead of `http://localhost:5000/api`.
2. Go to [Vercel](https://vercel.com/) and import your GitHub repository.
3. Edit the project settings: set the "Root Directory" to `frontend/admin-panel`.
4. Framework Preset: Vite.
5. Deploy!

### Step 4: Main Public Website
Host your main HTML/CSS site (the files in `html/`, `css/`, `javascript/`).
1. Update `javascript/main.js` to point to your live Render backend URL when making API calls.
2. In Vercel or Netlify, you can import the repo again, but this time leave the Root Directory as the main folder (or wherever your `html/index.html` is). 
3. *Note: You may need to move `index.html` to the root of your project, or set the output directory correctly depending on where the entry point is.*
