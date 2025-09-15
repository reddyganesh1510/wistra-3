import express from "express";
import { mockBookings, mockQuestionSet } from "./mockData.js";

const app = express();
app.use(express.json());

// Mock endpoint
app.post("/api/bookings/search", (req, res) => {
  console.log("📥 Received request:", req.body);

  // Always return mock data for now
  res.json(mockBookings);
});
app.get("/api/interviewquestions1/:id", (req, res) => {
  const { id } = req.params;

  // For mock, we just return the same set regardless of ID
  res.json(mockQuestionSet);
});

app.listen(2000, () => {
  console.log("✅ Mock InterviewNinja API running at http://localhost:2000");
});
