import express, { Request, Response } from "express";

const router = express.Router();

router.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.get("/", (req: Request, res: Response) => {
  res.json({
    name: "VAPI Outreach Call API",
    version: "1.0.0",
    endpoints: {
      calls: {
        "POST /api/calls/outbound": "Make an outbound call",
        "GET /api/calls": "List all calls",
        "GET /api/calls/:callId": "Get call details",
      },
      webhooks: {
        "POST /api/webhooks/call-status": "Receive call status updates",
        "POST /api/webhooks/assistant-message": "Receive assistant messages",
      },
      health: {
        "GET /api/health": "Health check",
      },
    },
  });
});

export default router;
