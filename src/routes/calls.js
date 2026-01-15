const express = require("express");
const axios = require("axios");
const router = express.Router();

const VAPI_URL = "https://api.vapi.ai/call";

// Make an outbound call
router.post("/outbound", async (req, res) => {
  const { customerNumber } = req.body;
  
  if (!customerNumber) {
    return res.status(400).json({ error: "customerNumber required" });
  }

  try {
    const payload = {
      assistantId: process.env.ASSISTANT_ID,
      phoneNumberId: process.env.PHONE_NUMBER_ID,
      customer: { number: customerNumber },
    };

    const response = await axios.post(VAPI_URL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.VAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    res.json({
      success: true,
      message: "Call initiated successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Get call details by ID
router.get("/:callId", async (req, res) => {
  const { callId } = req.params;

  try {
    const response = await axios.get(`${VAPI_URL}/${callId}`, {
      headers: {
        Authorization: `Bearer ${process.env.VAPI_TOKEN}`,
      },
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// List all calls
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(VAPI_URL, {
      headers: {
        Authorization: `Bearer ${process.env.VAPI_TOKEN}`,
      },
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
