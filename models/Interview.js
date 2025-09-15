// models/Interview.js
import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
  {
    interviewId: {
      type: String,
      required: true,
    },
    candidate: {
      type: Object, // can hold candidate details like name, email, etc.
      default: {},
    },
    questions: {
      type: Object, // store Q&A data, or array of objects if structured
      default: {},
    },
    transcript: {
      type: String, // raw or processed transcript
      default: "awaiting",
    },
    feedback: {
      type: Object,
      default: {},
    },
    botId: {
      type: String,
    },
    sidecarLogs: {
      type: String, // proctoring sidecar logs
      default: "",
    },
    avLogs: {
      type: Object, // audio/video logs
      default: {},
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "failed"],
      default: "pending",
    },
    score: {
      type: String, // keep string if flexible, else Number
      default: "",
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    recordingId: {
      type: String,
      default: "",
    },
    recordingStatus: {
      type: String,
      default: "pending",
    },
    transcriptStatus: {
      type: String,
      default: "pending",
    },
    feedbackStatus: {
      type: String,
      default: "pending",
    },
    typeofBot: {
      type: String,
      default: "interview",
    },
    feedbackWithLogs: {
      type: Object,
      default: {},
    },
    feedbackStatusWithLogs: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export default mongoose.model("Interview", InterviewSchema);
