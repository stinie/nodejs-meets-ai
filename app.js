import express from "express";
import chatRouter from "./routes/chatRouter.js";

import "dotenv/config";

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome"
  })
});

app.use("/api/v1/chat", chatRouter);

// Use the environment port, or default to 3000 if not set.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listenig at number ${PORT}`);
});