import axios from "axios";
import { getTranscriptFromJson } from "./transcriptService.js";

const apiKey = process.env.RECALL_API_KEY; // load from env

export const leaveCall = async (botId) => {
  try {
    const response = await axios.post(
      `https://us-west-2.recall.ai/api/v1/bot/${botId}/leave_call/`,
      {}, // POST body (empty for this request)
      {
        headers: {
          Authorization: apiKey,
          Accept: "application/json",
        },
      }
    );
    return response.status;
  } catch (error) {
    console.error("Error leaving call:", error.response?.data || error.message);
  }
};

export const getActiveBotsMetaData = async () => {
  try {
    const response = await axios.get(process.env.RECALL_API, {
      headers: {
        Authorization: process.env.RECALL_API_KEY, // put Bearer in .env
        Accept: "application/json",
      },
      params: {
        status: "in_call_recording",
      },
    });

    // return full metadata object
    const results = response.data?.results;
    if (results && results.length > 0 && results[0].metadata) {
      return results[0].metadata;
    }

    return null;
  } catch (err) {
    console.error("Error fetching bot metadata:", err.message);
    throw err;
  }
};

export const getRecordingId = async (botId) => {
  try {
    const response = await axios.get(
      "https://us-west-2.recall.ai/api/v1/recording/",
      {
        headers: {
          Authorization: process.env.RECALL_API_KEY, // put Bearer in .env
          Accept: "application/json",
        },
        params: {
          bot_id: botId,
        },
      }
    );

    // return full metadata object
    const recordingId = response.data?.results[0]?.id;
    const recordingStatus = response.data?.results[0]?.status?.code;

    return { recordingId: recordingId, recordingStatus: recordingStatus };
  } catch (error) {
    console.error(
      "Error fetching recording ID:",
      error.response?.data || error.message
    );
  }
};

export const createTranscript = async (recordingId) => {
  try {
    const response = await axios.post(
      `https://us-west-2.recall.ai/api/v1/recording/${recordingId}/create_transcript/`,
      {
        provider: {
          recallai_async: {
            language: "en",
          },
        },
      },
      {
        headers: {
          Authorization: process.env.RECALL_API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error creating transcript:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getTranscript = async (recordingId) => {
  try {
    const response = await axios.get(
      `https://us-west-2.recall.ai/api/v1/transcript/?recording_id=${recordingId}`,
      {
        headers: {
          Authorization: process.env.RECALL_API_KEY,
          Accept: "application/json",
        },
      }
    );
    let res = response.data.results;
    if (res && res.length > 0) {
      const download_url = res[0]?.data?.download_url;
      const transcript = await axios.get(download_url);
      return getTranscriptFromJson(transcript.data);
    }
  } catch (error) {
    console.error(
      "Error fetching transcript:",
      error.response?.data || error.message
    );
    throw error;
  }
};
