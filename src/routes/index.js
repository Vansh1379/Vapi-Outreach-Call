const express = require("express");
const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API info endpoint
router.get("/", (req, res) => {
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

module.exports = router;
