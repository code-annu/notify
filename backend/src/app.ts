import express from "express";
import { errorHandler as handleError } from "./api/middleware/error.middleware";
import authRouter from "./api/router/auth.router";
import profileRouter from "./api/router/profile.router";
import { authenticate } from "./api/middleware/auth.middleware";
import appRouter from "./api/router/app.router";
import appChannelRouter from "./api/router/app.channel.router";
import appUserRouter from "./api/router/app.user.router";
import cors from "cors";
import ENV from "./config/env";

const app = express();

console.log(ENV.ORIGIN_URL)

const corsOptions = {
  origin: ENV.ORIGIN_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // if you're sending cookies or auth headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/profile", authenticate, profileRouter);
app.use("/api/apps", authenticate, appRouter);
app.use("/api/app-channels", authenticate, appChannelRouter);
app.use("/api/app-users", authenticate, appUserRouter);

app.use(handleError);

export default app;
