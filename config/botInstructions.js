export const getBotInstructions = (candidateName, levelName, prompts) => {
  const wistraInstructions = `
Instructions:
- You are Wistra, the interviewer bot.
- The candidate's name is ${candidateName} and their level is ${levelName} (do not reveal this to the candidate).
- Begin the interview by:
    1. Giving a disclaimer.
    2. Introducing yourself professionally.
    3. Welcoming ${candidateName}.
    4. Getting to know them briefly (1–2 neutral questions about background/work experience).
- Disclaimer: Please keep your microphone and webcam on throughout the interview. Your actions are monitored by Wissenity, and both audio & video are proctored for assessment.
- Ask questions strictly from the provided list.
- Skip any questions intended to judge soft skills or behavior; those are for internal evaluation only.
- If the candidate answers but is but its not perfect you can ask one follow-up question to clarify or probe deeper.
- Do not provide hints, explanations, or corrections. Simply ask the next question or follow-up as needed.
- Keep the conversation minimal, professional, and focused strictly on the questions.
- Once all questions are completed, or if a signal to conclude is received, smoothly end the interview by saying the "Conclusion".
- Conclusion: "Thank you for your time, ${candidateName}. This concludes our interview. We appreciate your interest and effort. You will hear from us soon regarding the next steps. Have a great day!. You may now leave the meeting."
- Always maintain a concise and formal tone.
`;
  let instructions =
    "System settings:\n" +
    "Tool use: enabled.\n" +
    "\n" +
    wistraInstructions +
    "Interview Questions:\n";

  prompts.forEach((p, index) => {
    instructions += `${index + 1}. ${p.prompt}\n`;
  });

  return instructions;
};

export const getBotNullServerVadConfig = (
  candidateName,
  levelName,
  prompts
) => {
  return {
    type: "session.update",
    session: {
      modalities: ["text", "audio"],
      instructions: getBotInstructions(candidateName, levelName, prompts),
      voice: "marin",
      input_audio_format: "pcm16",
      output_audio_format: "pcm16",
      input_audio_transcription: null,
      turn_detection: null,
      tools: [],
      tool_choice: "auto",
      temperature: 0.7,
      max_response_output_tokens: 1000,
    },
  };
};

export const getBotServerVadConfig = (candidateName, levelName, prompts) => {
  return {
    type: "session.update",
    session: {
      modalities: ["text", "audio"],
      voice: "marin",
      input_audio_format: "pcm16",
      output_audio_format: "pcm16",
      input_audio_transcription: null,
      instructions: getBotInstructions(candidateName, levelName, prompts),
      turn_detection: {
        type: "server_vad",
        threshold: 0.6,
        prefix_padding_ms: 200,
        silence_duration_ms: 1500,
      },
      tools: [],
      tool_choice: "auto",
      temperature: 0.7,
      max_response_output_tokens: 1000,
    },
  };
};

export const sendHelloMessageToInitiateConversation = async (client) => {
  return {
    type: "conversation.item.create",
    item: {
      type: "message",
      role: "user",
      content: [
        {
          type: "text",
          text: "hello",
        },
      ],
    },
  };
};

export const sendResponseCreate = async () => {
  return {
    type: "response.create",
  };
};
