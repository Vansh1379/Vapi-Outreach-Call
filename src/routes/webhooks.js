const express = require("express");
const router = express.Router();


// Webhook for assistant messages
router.post("/assistant-message", (req, res) => {
  const messageData = req.body;
  
  console.log(" Assistant Message:", JSON.stringify(messageData, null, 2));
  
  res.status(200).json({ received: true });
});

module.exports = router;
