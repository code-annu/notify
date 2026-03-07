import { emailConsumer } from "./email-consumer";

export function startConsumers() {
  emailConsumer();
}
