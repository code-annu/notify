import { Channel } from "amqplib";
import { CONSTANTS, EMAIL_QUEUE, RETRY_DELAYS } from "../config/constants";
import { getConnection } from "../config/rabbitmq.config";

let emailChannel: Channel;

export async function initEmailQueue() {
  emailChannel = await getConnection().createChannel();

  // Main exchange and Main queue
  await emailChannel.assertExchange(CONSTANTS.MAIN_EXCHANGE, "direct", {
    durable: true,
  });
  await emailChannel.assertQueue(EMAIL_QUEUE.MAIN_QUEUE, {
    durable: true,
    deadLetterExchange: CONSTANTS.DLX_EXCHANGE,
  });
  await emailChannel.bindQueue(
    EMAIL_QUEUE.MAIN_QUEUE,
    CONSTANTS.MAIN_EXCHANGE,
    EMAIL_QUEUE.MAIN_KEY,
  );

  // Dead letter exchange and dead queue
  emailChannel.assertExchange(CONSTANTS.DLX_EXCHANGE, "direct", {
    durable: true,
  });
  emailChannel.assertQueue(EMAIL_QUEUE.DLQ, { durable: true });
  emailChannel.bindQueue(
    EMAIL_QUEUE.DLQ,
    CONSTANTS.DLX_EXCHANGE,
    EMAIL_QUEUE.DLQ_KEY,
  );

  // Retry queues
  for (let i = 1; i <= RETRY_DELAYS.length; i++) {
    const queueName = `${EMAIL_QUEUE.RETRY_QUEUE}_${i}`;
    emailChannel.assertQueue(queueName, {
      durable: true,
      deadLetterExchange: CONSTANTS.MAIN_EXCHANGE,
      deadLetterRoutingKey: EMAIL_QUEUE.MAIN_KEY,
      messageTtl: RETRY_DELAYS[i - 1],
    });
    emailChannel.bindQueue(
      queueName,
      CONSTANTS.MAIN_EXCHANGE,
      EMAIL_QUEUE.RETRY_KEY,
    );
  }
}
