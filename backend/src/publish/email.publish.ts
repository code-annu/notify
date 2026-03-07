import { Channel } from "amqplib";
import { CONSTANTS } from "../config/constants";
import { getConnection } from "../config/rabbitmq.config";
import { SendEmailPayload } from "../domain/entity/notify.email.entity";

let channel: Channel | null = null;

const getChannel = async (): Promise<Channel> => {
  if (!channel) {
    channel = await getConnection().createChannel();
  }
  return channel;
};

export async function publishEmail(payload: SendEmailPayload) {
  console.log("Publishing email...");
  const channel = await getChannel();

  channel.publish(
    CONSTANTS.MAIN_EXCHANGE,
    CONSTANTS.EMAIL_KEY,
    Buffer.from(JSON.stringify(payload)),
  );
}
