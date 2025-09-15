import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const evaluateSideCarLogs = async (logs) => {
  // Build dynamic prompt
  const prompt = `
You are a precise security analyst. 
Analyze activity logs and return ONLY valid JSON. 
Ignore all normal key presses and mouse movements. 
Only consider action-based events like copy, paste, or clipboard access. 
If apps other than chrome are used, flag them as suspicious.

Logs to analyze (redacted as requested):
${logs}

Instructions:
1) Identify suspicious actions such as copy or paste where clipboard content length > 200 characters.
2) Highlight if the active window is a browser (e.g., Google Chrome) during the action.
3) Detect repeated copy actions in a short time frame.
4) Do NOT flag individual keystrokes or mouse movements.
5) For each suspicious entry, provide severity 0-10 (higher for long clipboard content or repeated copies).
6) Respond only in JSON parseable format:
7) dont add OpenAI response: backticks json
{
  suspicious: [ { id: "<log entry id>", excerpt: "<log excerpt>", reason: "<why flagged>", severity: <0-10> } ],
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
  });

  try {
    // Parse JSON safely
    const text = response.choices[0].message.content;

    console.log("OpenAI response:", text);

    return text;
  } catch (err) {
    console.error("Failed to parse JSON from OpenAI:", err);
  }
};
