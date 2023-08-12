import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv-safe";
import "express-async-errors";
import {
  handleHttpError,
  handlePrismaError,
  handleUnknownError,
  handleZodError,
} from "./middlewares/handleError";
import activityController from "./controllers/activity";
import { prisma } from "./prisma";

dotenv.config({
  example: ".example.env",
  path: ".env",
});

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/activity", activityController);

// Error handlers
app.use(handleZodError);
app.use(handlePrismaError);
app.use(handleHttpError);
app.use(handleUnknownError);

app.listen(process.env.PORT ?? 3000, async () => {
  await prisma.$connect();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
