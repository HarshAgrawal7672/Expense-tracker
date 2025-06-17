# Expense Tracker - Full Stack Application

## 🌐 Live Website

**Frontend URL:** [https://expense-tracker-git-main-harshagrawal7672s-projects.vercel.app/](https://expense-tracker-git-main-harshagrawal7672s-projects.vercel.app/)

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* React Router
* Axios
* Recharts
* Tailwind CSS (optional, if used)

### Backend:

* Node.js
* Express.js
* MongoDB (with Mongoose)
* Cloudinary (for image upload)
* JWT (JSON Web Tokens)
* Multer (file handling)
* dotenv

---

## 📁 Backend Setup Instructions

1. **Clone the repository**

```bash
git clone <your-backend-repo-url>
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**
   Create a `.env` file in the backend root:

```env
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
CLIENT_URL=http://localhost:5173 # or Vercel URL in production
```

4. **Start the backend server**

```bash
npm start
```

5. **API Endpoints**

* `POST /api/v1/auth/register` - Register a new user
* `POST /api/v1/auth/login` - Login
* `GET /api/v1/auth/getuser` - Get user info (protected)
* `POST /api/v1/auth/upload-image` - Upload profile image to Cloudinary
* `CRUD /api/v1/income` - Income routes
* `CRUD /api/v1/expense` - Expense routes
* `GET /api/v1/dashboard` - Dashboard stats

---

## 📁 Frontend Setup Instructions

1. **Clone the repository**

```bash
git clone <your-frontend-repo-url>
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**
   Create a `.env` file in the frontend root:

```env
VITE_API_BASE_URL=https://<your-render-backend-url>
```

4. **Start the frontend**

```bash
npm run dev
```

5. **Fixing 404 on Refresh (Vercel Deploy)**
   Make sure your frontend includes a `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## ✨ Features

* ✅ User Authentication (JWT)
* ✅ Income & Expense Management
* ✅ Interactive Pie Charts (Recharts)
* ✅ Dashboard Summary
* ✅ Cloudinary Image Upload
* ✅ Download Expenses as Excel

---

## 🙏 Credits

Developed by **Harsh Agrawal**

---

For any issues or improvements, feel free to raise an issue or contribute!
