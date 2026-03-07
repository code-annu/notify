import { Channel } from "amqplib";
import { CONSTANTS, EMAIL_QUEUE, RETRY_DELAYS } from "../config/constants";
import { getConnection } from "../config/rabbitmq.config";
import { sendEmailDummy } from "../service/email-service";
import { SendEmailPayload } from "../types/email.type";

let channel: Channel | null = null;
const getChannel = async (): Promise<Channel> => {
  if (!channel) {
    channel = await getConnection().createChannel();
  }
  return channel;
};

export async function emailConsumer() {
  const channel = await getChannel();

  channel.consume(EMAIL_QUEUE.MAIN_QUEUE, async (msg) => {
    if (!msg) return;
    const payload = JSON.parse(msg.content.toString()) as SendEmailPayload;
    const headers = msg.properties.headers || {};
    const retryCount = (headers["x-retries"] as number) || 0;

    try {
      await sendEmailDummy(payload);
      channel.ack(msg);
    } catch (err) {
      channel.ack(msg);
      if (retryCount < RETRY_DELAYS.length) {
        const newHeaders = { ...headers, "x-retries": retryCount + 1 };
        channel.sendToQueue(
          `${EMAIL_QUEUE.RETRY_QUEUE}_${retryCount + 1}`,
          Buffer.from(JSON.stringify(payload)),
          { headers: newHeaders },
        );
      } else {
        channel.publish(
          CONSTANTS.DLX_EXCHANGE,
          EMAIL_QUEUE.DLQ_KEY,
          Buffer.from(JSON.stringify(payload)),
        );
      }
    }
  });
}
