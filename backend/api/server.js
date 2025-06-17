const express = require("express");
const cors = require("cors");
const path = require("path");
const { createServer } = require("@vercel/node");
const connectDB = require("../config/db"); // Update path if needed
const authRoutes = require("../routes/authRoutes");
const incomeRoutes = require("../routes/incomeRoutes");
const expenseRoutes = require("../routes/expenseRoutes");
const dashboardRoutes = require("../routes/dashboardRoutes");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

connectDB();

app.use(express.json());

app.get("/", (req, res) => res.send("API is working"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

module.exports = app; // <— Important for Vercel
