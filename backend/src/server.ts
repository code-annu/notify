import app from "./app";
import ENV from "./config/constants";
import { initRabbitMQ } from "./config/rabbitmq.config";

const startServer = async () => {
  try {
    await initRabbitMQ();
  } catch (err) {
    console.log("Failed to connect to RabbitMQ: ", err);
  }

  app.listen(ENV.PORT, () => {
    console.log(`Server is running http://localhost:${ENV.PORT}`);
  });
};

startServer();
