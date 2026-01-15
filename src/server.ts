import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import callsRouter from "./routes/calls.js";
import webhooksRouter from "./routes/webhooks.js";
import indexRouter from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging
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
      "GET /api/calls/status/:callId",
      "GET /api/calls/:callId",
      "POST /api/webhooks/call-status",
      "POST /api/webhooks/assistant-message",
    ],
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(` VAPI Outreach Server running on port ${PORT}`);
  console.log(` Ready to make calls!`);
});
