const express = require("express");
const cors = require("cors");
require("dotenv").config();

// --------------------
// App Initialization
// --------------------
const app = express();

// --------------------
// Global Middlewares
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// Database Connection
// --------------------
const connectDB = require("./config/db");
connectDB();

// --------------------
// Seed Admin (runs once)
// --------------------
const seedAdmin = require("./seed/admin.seed");
seedAdmin();

// --------------------
// Swagger Setup
// --------------------
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --------------------
// Routes
// --------------------
const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const taskRoutes = require("./routes/task.routes");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", protectedRoutes);
app.use("/api/v1", taskRoutes);

// --------------------
// Health Check
// --------------------
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀"
  });
});

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});

// --------------------
// Server Start
// --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
