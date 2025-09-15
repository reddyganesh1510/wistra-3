import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const QUESTIONS_API = process.env.QUESTIONS_API;

export const getQuestionsForSetAndGenerateMetadata = async (setId) => {
  console.log("Fetching questions from:", `${QUESTIONS_API}${setId}`);
  const res = await axios.get(QUESTIONS_API + setId);
  const questions = res.data || [];

  const prompts = questions.map((q) => {
    let prompt = `${q.description}\n\n`;

    return {
      questionId: q.questionId,
      prompt,
      answerChecks: q.answerChecks || [],
      expectedAnswers: q.expectedAnswers || "",
    };
  });

  return { interviewPrompts: prompts };
};
