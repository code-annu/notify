export interface SendEmailRequestInput {
  to: { email: string; name: string };
}

export interface SendEmailPayload {
  to: { email: string; name: string };
  subject: string;
  text: string;
  html: string;
}
