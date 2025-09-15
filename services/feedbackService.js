import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const evaluateInterview = async (
  transcript,
  questionsJson,
  level,
  logs
) => {
  // Build dynamic prompt
  let prompt = `You are an expert interviewer evaluator. 
Candidate Level: ${level}
Evaluate the following candidate's answers based on these questions and evaluation points:

`;

  questionsJson.interviewPrompts.forEach((q, idx) => {
    prompt += `Question ${idx + 1}: ${q.prompt}\n`;
    q.answerChecks.forEach((ac) => {
      prompt += `- AnswerCheck: ${
        ac.name
      } (Evaluation Areas: ${ac.evaluationAreas.join(", ")})\n`;
    });
    prompt += "\n";
  });

  prompt += `Candidate Transcript:
${transcript}

`;

  if (logs && logs.length > 0) {
    prompt += `
Additionally, use the following proctoring sidecar logs for any suspicious activities during the interview along with the evaluation:
${logs}
`;
  }
  prompt += `Instructions:
- Provide an overall feedback summarizing the candidate's strengths, weaknesses, and skills, be linent as its an R1 interview.
- Based on the transcript, give an overall verdict: APPROVE or REJECT.
- Respond only in JSON format:
{
  "feedback": "<Overall analysis of candidate>",
  "verdict": "<APPROVE/REJECT>"
}`;
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
  });

  try {
    // Parse JSON safely
    const text = response.choices[0].message.content;
    const result = JSON.parse(text);
    return result;
  } catch (err) {
    console.error("Failed to parse JSON from OpenAI:", err);
    return { feedback: [], verdict: "REJECT" };
  }
};

export const evaluateFeedbackForInterviewBetweenInterviewerAndCandidate =
  async (transcript, level, logs) => {
    let prompt = `You are an expert interviewer evaluator. 
Candidate Level: ${level}

You are given a transcript of a real interview between a human interviewer and a candidate. 
Your task:
1. Identify the main questions asked by the interviewer.
2. Summarize the candidate's responses to each question.
3. Evaluate the quality of the candidate's answers based on clarity, technical depth, relevance, and communication.
4. Provide overall feedback highlighting strengths, weaknesses, and potential skills.
5. Be lenient in judgment as this is an R1 interview round.
6. Finally, give a clear verdict: APPROVE or REJECT.

Transcript:
${transcript}

`;
    if (logs && logs.length > 0) {
      prompt += `
Additionally, use the following proctoring sidecar logs for any suspicious activities during the interview along with the evaluation:
${logs}
`;
    }
    prompt += `Instructions:
- Provide an overall feedback summarizing the candidate's strengths, weaknesses, and skills, be linent as its an R1 interview.
- Based on the transcript, give an overall verdict: APPROVE or REJECT.
- Respond only in JSON format:
{
  "feedback": "<Overall analysis of candidate>",
  "verdict": "<APPROVE/REJECT>"
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    try {
      // Parse JSON safely
      const text = response.choices[0].message.content;
      const result = JSON.parse(text);
      return result;
    } catch (err) {
      console.error("Failed to parse JSON from OpenAI:", err);
      return { feedback: [], verdict: "REJECT" };
    }
  };
