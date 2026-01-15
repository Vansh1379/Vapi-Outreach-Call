import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

const VAPI_URL = "https://api.vapi.ai/call";

// this willmake an outbound call
router.post("/outbound", async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Get call info
router.get("/:callId", async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// List all calls
router.get("/", async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

export default router;
