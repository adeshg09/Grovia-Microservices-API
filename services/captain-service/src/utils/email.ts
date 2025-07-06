import { Resend } from "resend";
import { envConfig } from "../config/env.config";

const resend = new Resend(envConfig.RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Grovia <no-reply@Grovia.builtbyag09.tech>",
      to,
      subject,
      html,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};
