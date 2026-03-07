import { config } from "dotenv";

config();

console.log("This ENV file is executed");

const ENV = {
  PORT: process.env.PORT || 3000,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN!,
  DATABASE_URL: process.env.DATABASE_URL!,
  DIRECT_URL: process.env.DIRECT_URL!,
  SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL!,
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY!,
  ORIGIN_URL: process.env.ORIGIN_URL!,
  RABBIT_MQ_URL: process.env.RABBIT_MQ_URL!,
};

export const CONSTANTS = {
  MAIN_EXCHANGE: "notifications",
  DLX_EXCHANGE: "notifications_dead",
  EMAIL_KEY: "email",
};

export default ENV;
