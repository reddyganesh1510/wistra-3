import express from "express";
import {
  getInterviewStatusById,
  updateSideCarLogs,
} from "../services/interviewService.js";
import { evaluateSideCarLogs } from "../services/openAiService.js";

const router = express.Router();

router.get("/api/interviewStatus/:id", async (req, res) => {
  console.log("Fetching status for interview ID:", req.params.id);
  const status = await getInterviewStatusById(req.params.id);
  console.log("Status:", status);
  res.json({ status: status });
});

router.post("/api/pushSideCarLogs/:id", async (req, res) => {
  const sidecarInsights = await evaluateSideCarLogs(JSON.stringify(req.body));

  const interview = await updateSideCarLogs(req.params.id, sidecarInsights);
  res.json({ interview: interview });
});

export default router;
