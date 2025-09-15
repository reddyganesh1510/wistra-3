// cron/interviewCron.js
import Interview from "../models/Interview.js";
import { createTranscript, getRecordingId, leaveCall } from "./recallBotEndpointService.js";

import { connectMongo } from "../config/mongoose.js";
await connectMongo();

export const checkInProgressInterviews = async () => {
  try {
    const now = new Date();

    // Find interviews whose endTime has passed and are not completed
    const expired = await Interview.find({
      endTime: { $lt: now },
      status: "in_progress",
    });

    if (expired.length > 0) {
      console.log(`Found ${expired.length} expired interviews`);

      // Example: mark them as failed (or expired)
      expired.forEach(async (interview) => {
        const status = await leaveCall(interview.botId);
        
        console.log(`Marked interview ${interview.interviewId} as completed`);
        // const recordingId = getRecordingId(interview.botId);
        // if (recordingId) {
        //     await createTranscript(recordingId);
        // }

        await Interview.findOneAndUpdate(
          { interviewId: interview.interviewId },
          { $set: { status: "completed", recordingId:recordingId } }, // update status
          { new: true }
        );
      }); // Call the function to leave the call
    } else {
      console.log("No expired interviews at", now);
    }
  } catch (err) {
    console.error("Error checking expired interviews:", err);
  }
};

export const getCandidateDetailsAndQuestions = async (interviewId) => {
  if (interviewId) {
    const interview = await getInterviewByInterviewIdAndUpdateStatus(
      interviewId
    );

    const { candidate, questions } = interview;
    return { candidate: candidate, questions: questions.interviewPrompts };
  }
};

const getInterviewByInterviewIdAndUpdateStatus = async (interviewId) => {
  try {
    const interview = await Interview.findOneAndUpdate(
      { interviewId },
      { $set: { status: "in_progress" } }, // update status
      { new: true }
    );
    return interview;
  } catch (error) {
    console.error("Error fetching interview by interviewId:", error);
    throw error;
  }
};
