import amqplib from "amqplib";
import { config } from "dotenv";
import ENV from "./constants";

config();

let connection: amqplib.ChannelModel;

export async function initRabbitMQ() {
  connection = await amqplib.connect(ENV.RABBIT_MQ_URL);
  console.log("🐰 Connected to RabbitMQ and created channels");
}

export function getConnection() {
  if (!connection) throw new Error("Connection not initiated!");
  return connection;
}
