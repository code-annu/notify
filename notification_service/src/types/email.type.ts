export interface SendEmailPayload {
  to: {
    email: string;
    name?: string;
  };
  subject: string;
  text?: string;
  html?: string;
}
