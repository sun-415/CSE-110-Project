/**
 * Setup middleware and routes
 */
import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoutes";
import responseRoutes from "./routes/questionnaireResponseRoutes";

const app = express();

// Middleware setup
app.use(logger); // Log requests to backend
app.use(cors({})); // Setup cors
app.use(express.json()); // Allow JSON in req and res body

// Routes setup
app.use("/api/users", userRoutes);
app.use("/api/questionnaireResponses", responseRoutes);

// Error handler middleware (running next(error) in controller calls this)
app.use(errorHandler);

export default app; // Export the app instance
