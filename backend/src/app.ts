import express from "express";
import { errorHandler as handleError } from "./api/middleware/error.middleware";
import authRouter from "./api/router/auth.router";
import profileRouter from "./api/router/profile.router";
import { authenticate } from "./api/middleware/auth.middleware";
import appRouter from "./api/router/app.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/profile", authenticate, profileRouter);
app.use("/api/app", authenticate, appRouter);

app.use(handleError);

export default app;
