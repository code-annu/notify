import nodemailer from "nodemailer";
import { ENV } from "../config/constants";
import { SendEmailPayload } from "../types/email.type";

export async function sendEmail(payload: SendEmailPayload) {
  const { to, subject, text, html } = payload;
  const transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: Number(ENV.SMTP_PORT),
    secure: false,
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `Notify ${ENV.SMTP_USER}`,
    to: to.email,
    subject: subject,
    text: text,
    html: html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(info);
  console.log(`Email sent to ${payload.to.email}`);
}

export async function sendEmailDummy(payload: SendEmailPayload) {
  const { to, subject, text, html } = payload;

  const randomNum = getRandomInteger(0, 10);
  console.log("number: ", randomNum);
  if (randomNum <= 8) {
    throw new Error("can't sent email");
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`Email sent ${to.email}`);
  return payload;
}

function getRandomInteger(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
