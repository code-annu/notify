import { config } from "dotenv";

config();

export const ENV = {
  RABBIT_MQ_URL: process.env.RABBIT_MQ_URL!,
  PORT: process.env.PORT!,
  QUEUE_EMAIL: process.env.QUEUE_EMAIL!,
  QUEUE_SMS: process.env.QUEUE_SMS,
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: process.env.SMTP_PORT!,
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASS: process.env.SMTP_PASS!,
  MAIN_EXCHANGE: process.env.MAIN_EXCHANGE!,
  MAIN_QUEUE: process.env.MAIN_QUEUE!,
  DLX_EXCHANGE: process.env.DLX_EXCHANGE!,
  DLQ: process.env.DLQ!,
  KEY_SMS: process.env.KEY_SMS!,
  KEY_EMAIL: process.env.KEY_EMAIL!,
};

export const CONSTANTS = {
  X_RETRIES: "x-retries",
  MAIN_EXCHANGE: "notifications",
  DLX_EXCHANGE: "notifications_dead",
};

export const EMAIL_QUEUE = {
  MAIN_QUEUE: "email_queue",
  MAIN_KEY: "email",
  DLQ: "email_dead_queue",
  DLQ_KEY: "email_dead",
  RETRY_QUEUE: "email_retry_queue",
  RETRY_KEY: "retry_key",
};

export const RETRY_DELAYS = [5000, 15000, 30000];
