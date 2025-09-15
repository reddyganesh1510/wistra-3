// cron/interviewCron.js
import Interview from "../models/Interview.js";
import {
  createTranscript,
  getRecordingId,
  getTranscript,
  leaveCall,
} from "./recallBotEndpointService.js";

import { connectMongo } from "../config/mongoose.js";
import { evaluateFeedbackForInterviewBetweenInterviewerAndCandidate, evaluateInterview } from "./feedbackService.js";
import axios from "axios";
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
        const { recordingId, recordingStatus } = getRecordingId(
          interview.botId
        );

        await Interview.findOneAndUpdate(
          { interviewId: interview.interviewId },
          {
            $set: {
              status: "completed",
              recordingId: recordingId,
              recordingStatus: recordingStatus,
            },
          }, // update status
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

export const getInterviewsWhoseRecordingIsDoneButTranscriptPending =
  async () => {
    try {
      const interviews = await Interview.find({
        recordingStatus: "done",
        transcriptStatus: "pending",
      });
      interviews.forEach(async (interview) => {
        await createTranscript(interview.recordingId);
        await Interview.findOneAndUpdate(
          { interviewId: interview.interviewId },
          { $set: { transcriptStatus: "in_progress" } }, // update status
          { new: true }
        );
        console.log(
          "Creating transcripts for interviews... ",
          interview.interviewId
        );
      });
      return interviews;
    } catch (error) {
      console.error(
        "Error fetching interviews with completed recording but pending transcript:",
        error
      );
      throw error;
    }
  };

export const getInterviewsWhoseTranscriptIsTriggered = async () => {
  const interviews = await Interview.find({
    recordingStatus: "done",
    transcriptStatus: "in_progress",
  });
  interviews.forEach(async (interview) => {
    const transcript = await getTranscript(interview.recordingId);
    if (transcript) {
      await Interview.findOneAndUpdate(
        { interviewId: interview.interviewId },
        { $set: { transcriptStatus: "completed", transcript: transcript } }, // update status
        { new: true }
      );
    }
    console.log(
      "Fetching transcripts for interviews... ",
      interview.interviewId
    );
  });
};

export const setRecordingIdWhoseInterviewIsCompleted = async () => {
  const interviews = await Interview.find({
    status: "completed",
    recordingStatus: "pending",
  });
  interviews.forEach(async (interview) => {
    const { recordingId, recordingStatus } = await getRecordingId(
      interview.botId
    );
    if (recordingId != "") {
      await Interview.findOneAndUpdate(
        { interviewId: interview.interviewId },
        {
          $set: { recordingId: recordingId, recordingStatus: recordingStatus },
        }, // update status
        { new: true }
      );
    }
    console.log(
      "Setting recording IDs for completed interviews... ",
      interview.interviewId
    );
  });
};

export const generateFeedbackForInterviewAndUpdateInterviewNinja = async () => {
  const interviews = await Interview.find({
    transcriptStatus: "completed",
    transcript: { $ne: "awaiting" },

    feedbackStatus: { $ne: "completed" },
    typeofBot: "interview",
  });
  interviews.forEach(async (interview) => {
    console.log(
      "Generating feedback for interviews... ",
      interview.interviewId
    );
    const feedback = await evaluateInterview(
      interview.transcript,
      interview.questions,
      interview.candidate.levelName
    );
    let finalInterview = await Interview.findOneAndUpdate(
      { interviewId: interview.interviewId },
      {
        $set: { feedback: feedback, feedbackStatus: "completed" },
      }, // update status
      { new: true }
    );
    const interviewData = {
      feedback: finalInterview.feedback,
    };
    const response = await axios.post(
      `http://localhost:2000/api/interviews/${interview.interviewId}`,
      interviewData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  });
};

export const generateFeedBackForInterviewWithoutBot = async () => {
  const interviews = await Interview.find({
    transcriptStatus: "completed",
    transcript: { $ne: "awaiting" },
    feedbackStatus: { $ne: "completed" },
    typeofBot: { $ne: "interview" },
  });
  interviews.forEach(async (interview) => {
    console.log(
      "Generating feedback for interviews without bot... ",
      interview.interviewId
    );
    const feedback =
      await evaluateFeedbackForInterviewBetweenInterviewerAndCandidate(
        interview.transcript,
        interview.candidate.levelName
      );
    let finalInterview = await Interview.findOneAndUpdate(
      { interviewId: interview.interviewId },
      {
        $set: { feedback: feedback, feedbackStatus: "completed" },
      }, // update status
      { new: true }
    );
    const interviewData = {
      feedback: finalInterview.feedback,
    };
    const response = await axios.post(
      `http://localhost:2000/api/interviews/${interview.interviewId}`,
      interviewData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
};

export const getInterviewStatusById = async (interviewId) => {
  try {
    const interview = await Interview.findOne({ interviewId });
    return interview.status;
  } catch (error) {}
};

export const updateSideCarLogs = async (interviewId, sidecarLogs) => {
  try {
    const interview = await Interview.findOneAndUpdate(
      { interviewId },
      { $set: { sidecarLogs: sidecarLogs } }, // update status
      { new: true }
    );
    console.log("Updated sidecar logs for interview:", interviewId);
    return interview;
  } catch (error) {
    console.error("Error updating sidecar logs:", error);
    throw error;
  }
};
