import dotenv from "dotenv";
dotenv.config();
import { connectMongo } from "./config/mongoose.js";
await connectMongo();

import express from "express";
import { startCron } from "./services/cronJob.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { processBookings } from "./services/bookingService.js";

const app = express();
const PORT = process.env.PORT || 9000;

// 🔹 Start cron
startCron();
processBookings();

// 🔹 Register routes
app.use("/", bookingRoutes);

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
