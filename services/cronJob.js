import cron from "node-cron";
import { processBookings } from "./bookingService.js";
import {
  checkInProgressInterviews,
  generateFeedbackForInterviewAndUpdateInterviewNinja,
  generateFeedBackForInterviewWithoutBot,
  getInterviewsWhoseRecordingIsDoneButTranscriptPending,
  getInterviewsWhoseTranscriptIsTriggered,
  setRecordingIdWhoseInterviewIsCompleted,
} from "./interviewService.js";

// 🔹 Schedule cron every 5 minutes
export const startCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("⏰ Cron triggered:", new Date().toISOString());
    await checkInProgressInterviews();
    await setRecordingIdWhoseInterviewIsCompleted();
    await getInterviewsWhoseRecordingIsDoneButTranscriptPending();
    await getInterviewsWhoseTranscriptIsTriggered();
    await generateFeedbackForInterviewAndUpdateInterviewNinja();
    await generateFeedBackForInterviewWithoutBot();
  });
  console.log("✅ Cron job started (runs every 1 mins)");
};
