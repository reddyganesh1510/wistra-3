import express from "express";
import { getProcessed } from "../services/bookingService.js";

const router = express.Router();

// Root
router.get("/", (req, res) => {
  res.send("🚀 Interview Bot Orchestrator running");
});

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Processed bookings
router.get("/processed", (req, res) => {
  res.json(getProcessed());
});

export default router;
