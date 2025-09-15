import { WebSocketServer } from "ws";
import { RealtimeClient } from "@openai/realtime-api-beta";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import {
  getBotNullServerVadConfig,
  getBotServerVadConfig,
  sendHelloMessageToInitiateConversation,
} from "../config/botInstructions.js";
import { getActiveBotsMetaData } from "./recallBotEndpointService.js";
import { getCandidateDetailsAndQuestions } from "./interviewService.js";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error(
    `Environment variable "OPENAI_API_KEY" is required.\n` +
      `Please set it in your .env file.`
  );
  process.exit(1);
}

const PORT = 3000;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", async (ws, req) => {
  if (!req.url) {
    console.log("No URL provided, closing connection.");
    ws.close();
    return;
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname !== "/") {
    console.log(`Invalid pathname: "${pathname}"`);
    ws.close();
    return;
  }

  const client = new RealtimeClient({ apiKey: OPENAI_API_KEY });

  // Relay: OpenAI Realtime API Event -> Browser Event
  client.realtime.on("server.*", (event) => {
    // console.log(`Relaying "${event.type}" to Client`);
    ws.send(JSON.stringify(event));
  });
  client.realtime.on("close", () => ws.close());

  // Relay: Browser Event -> OpenAI Realtime API Event
  // We need to queue data waiting for the OpenAI connection
  const messageQueue = [];
  const messageHandler = (data) => {
    try {
      const event = JSON.parse(data);

      if (event.type == "input_audio_buffer.append") {
        client.realtime.send(event.type, event);
        console.log(`Relaying "${event.type}" to OpenAI`);
      }
    } catch (e) {
      console.error(e.message);
      console.log(`Error parsing event from client: ${data}`);
    }
  };
  ws.on("message", (data) => {
    if (!client.isConnected()) {
      messageQueue.push(data);
    } else {
      messageHandler(data);
    }
  });
  ws.on("close", () => client.disconnect());

  // Connect to OpenAI Realtime API
  try {
    console.log(`Connecting to OpenAI...`);
    const { candidate, questions } = await getRules();
    await client.connect();
    await updateSessionandSendHello(client, candidate, questions);
  } catch (e) {
    console.log(`Error connecting to OpenAI: ${e.message}`);
    ws.close();
    return;
  }
  console.log(`Connected to OpenAI successfully!`);
  while (messageQueue.length) {
    messageHandler(messageQueue.shift());
  }
});

const updateSessionandSendHello = async (client, candidate, questions) => {
  await client.realtime.send(
    "session.update",
    getBotNullServerVadConfig(candidate.name, candidate.levelName, questions)
  );
  await client.realtime.send(
    "conversation.item.create",
    sendHelloMessageToInitiateConversation()
  );
  await client.realtime.send("response.create", {});
  await client.realtime.send(
    "session.update",
    getBotServerVadConfig(candidate.name, candidate.levelName, questions)
  );
};

const getRules = async () => {
  const metadata = await getActiveBotsMetaData();
  try {
    if (metadata) {
      const { interviewId } = metadata;
      const data = await getCandidateDetailsAndQuestions(interviewId);
      return data;
    }
  } catch (error) {
    console.log("Error fetching candidate details and questions:", error);
  }
};

console.log(`Websocket server listening on port ${PORT}`);
