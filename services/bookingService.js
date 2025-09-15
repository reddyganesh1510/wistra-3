import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const processedBookings = new Set();
import { getQuestionsForSetAndGenerateMetadata } from "./questionService.js";
import { getRulesAndIntroduction } from "./rulesService.js";
import Interview from "../models/Interview.js";

const BOOKINGS_API = process.env.BOOKINGS_API;
const RECALL_API = process.env.RECALL_API;
const AUTH_TOKEN = process.env.RECALL_API_KEY;
const BOT_NAME = "Wistra";
const OUTPUT_MEDIA_URL = process.env.OUTPUT_MEDIA_URL;
const RETENTION_HOURS = parseInt(process.env.RETENTION_HOURS, 10) || 24;

export const fetchBookings = async () => {
  const body = {
    status: ["BOOKED"],
    startDateTime: new Date().toISOString(),
    endDateTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
  };

  const res = await axios.post(BOOKINGS_API);
  console.log(`Fetched ${res.data.length} bookings`);
  return res.data || [];
};

export const createBot = async (booking) => {
  const questionsMetadata = await getQuestionsForSetAndGenerateMetadata(
    booking.interviewSetId
  );
  const rulesMetadata = await getRulesAndIntroduction(
    booking.candidateName,
    booking.levelName
  );

  const payload = {
    meeting_url: booking.meetingLink,
    bot_name: BOT_NAME,
    join_at: booking.startDateTime,
    recording_config: {
      retention: { type: "timed", hours: RETENTION_HOURS },
    },
    output_media: {
      camera: {
        kind: "webpage",
        config: { url: OUTPUT_MEDIA_URL },
      },
    },
    variant: {
      zoom: "web_4_core",
      google_meet: "web_4_core",
      microsoft_teams: "web_4_core",
    },
    metadata: {
      interviewId: booking.id,
    },
  };
//   console.log("Creating bot with payload:", JSON.stringify(payload, null, 2));

  const res = await axios.post(RECALL_API, payload, {
    headers: {
      Authorization: AUTH_TOKEN,
      accept: "application/json",
      "content-type": "application/json",
    },
  });

  const interview = new Interview({
    interviewId: booking.id,
    candidate: {
      name: booking.candidateName,
      levelName: booking.levelName,
    },
    questions: questionsMetadata,
    botId: res.data.id,
    startTime: new Date(booking.startDateTime),
    endTime: new Date(booking.endDateTime),
    status: "pending",
  });
  const savedInterview = await interview.save();

  console.log(`✅ Bot created for booking ${booking.id}`);
  return res.data;
};

export const processBookings = async () => {
  try {
    const bookings = await fetchBookings();
    console.log(`Processing ${bookings.length} bookings...`);
    for (const booking of bookings) {
      if (!processedBookings.has(booking.id)) {
        console.log(`🆕 Processing booking ${booking.id}`);
        await createBot(booking);
        processedBookings.add(booking.id);
      } else {
        console.log(`ℹ️ Booking ${booking.id} already processed`);
      }
    }
  } catch (err) {
    console.error(
      "❌ Error in processBookings:",
      err.response?.data || err.message
    );
  }
};

export const getProcessed = () => {
  return [...processedBookings];
};
