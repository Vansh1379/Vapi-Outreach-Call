import express, { Request, Response } from "express";

const router = express.Router();

// Webhook for assistant messages
router.post("/assistant-message", (req: Request, res: Response) => {
  const messageData = req.body;

  console.log(" Assistant Message:", JSON.stringify(messageData, null, 2));

  res.status(200).json({ received: true });
});

export default router;
