import dotenv from "dotenv";
dotenv.config();
import { connectMongo } from "./config/mongoose.js";
await connectMongo();

import express from "express";
import { startCron } from "./services/cronJob.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import proctoringRoutes from "./routes/proctoringRoutes.js";
import { processBookings } from "./services/bookingService.js";
import {
  generateFeedbackForInterviewAndUpdateInterviewNinja,
  generateFeedBackForInterviewWithoutBotWithLogs,
  getInterviewsWhoseRecordingIsDoneButTranscriptPending,
  getInterviewsWhoseTranscriptIsTriggered,
  setRecordingIdWhoseInterviewIsCompleted,
} from "./services/interviewService.js";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
const PORT = 9000;

// 🔹 Start cron
// startCron();
// processBookings();
generateFeedBackForInterviewWithoutBotWithLogs();
// 🔹 Register routes
app.use("/", bookingRoutes);
app.use("/", proctoringRoutes);

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
