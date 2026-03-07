import express from "express";
import { ENV } from "./config/constants";
import { initRabbitMQ } from "./config/rabbitmq.config";
import { startConsumers } from "./consumer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startApp = async () => {
  await initRabbitMQ();
  startConsumers();

  app.listen(ENV.PORT, () => {
    console.log(`Server is listening at port ${ENV.PORT}`);
  });
};

startApp();
