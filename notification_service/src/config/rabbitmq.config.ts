import amqplib from "amqplib";
import { initEmailQueue } from "../queue/email.queue";
import { config } from "dotenv";
import constants = require("./constants");

config();

let connection: amqplib.ChannelModel;

export async function initRabbitMQ() {
  connection = await amqplib.connect(constants.ENV.RABBIT_MQ_URL);

  // Create and setup email channel
  await initEmailQueue();

  console.log("🐰 Connected to RabbitMQ and created channels");
}

export function getConnection() {
  if (!connection) throw new Error("Connection not initiated!");
  return connection;
}
