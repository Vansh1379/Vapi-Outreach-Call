require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Import routes
const callsRouter = require("./routes/calls");
const webhooksRouter = require("./routes/webhooks");
const indexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use("/api", indexRouter);
app.use("/api/calls", callsRouter);
app.use("/api/webhooks", webhooksRouter);



app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      "GET /api",
      "GET /api/health",
      "POST /api/calls/outbound",
      "GET /api/calls",
      "GET /api/calls/:callId",
      "POST /api/webhooks/call-status",
      "POST /api/webhooks/assistant-message",
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 VAPI Outreach Server running on port ${PORT}`);
  console.log(`📞 Ready to make calls!`);
  console.log(`📡 API Documentation: http://localhost:${PORT}/api`);
});
