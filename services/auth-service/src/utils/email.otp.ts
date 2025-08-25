import nodemailer from "nodemailer";
import { envConfig } from "../config/env.config";

// Create Zoho SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.in",
  port: 587,
  secure: false, // TLS
  auth: {
    user: envConfig.ZOHO_EMAIL, // noreply@grovia.builtbyag09.tech
    pass: envConfig.ZOHO_PASSWORD, // Your Zoho password
  },
});

const otpStore = new Map<
  string,
  { otp: string; expiresAt: number; attempts: number }
>();

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPViaZoho = async (
  email: string
): Promise<{ success: boolean }> => {
  try {
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    otpStore.set(email, { otp, expiresAt, attempts: 0 });

    await transporter.sendMail({
      from: '"Grovia" <noreply@grovia.builtbyag09.tech>', // Your custom domain!
      to: email,
      subject: "Your Grovia Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e5e9; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">GROVIA</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Secure Authentication System</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px; background: white;">
            <h2 style="color: #333; margin: 0 0 16px 0; font-size: 22px;">Verification Required</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5; margin: 0 0 24px 0;">
              Please enter the following code to verify your identity:
            </p>
            
            <!-- OTP Display -->
            <div style="text-align: center; margin: 32px 0;">
              <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; display: inline-block;">
                <div style="background: white; border-radius: 8px; padding: 16px 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                  <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 4px; font-family: monospace;">${otp}</span>
                </div>
              </div>
            </div>
            
            <!-- Warning -->
            <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; margin: 24px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                <strong>⚠️ Security Notice:</strong><br>
                • This code expires in <strong>10 minutes</strong><br>
                • Never share this code with anyone<br>
                • If you didn't request this, ignore this email
              </p>
            </div>
            
            <p style="color: #9ca3af; font-size: 13px; margin: 24px 0 0 0; text-align: center;">
              This email was sent from our automated system at Grovia
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 12px;">
              © 2025 Grovia • noreply@grovia.builtbyag09.tech
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ OTP sent via Zoho SMTP");
    return { success: true };
  } catch (error: any) {
    console.error("❌ Zoho SMTP failed:", error);
    throw new Error(`Failed to send OTP: ${error.message}`);
  }
};

export const verifyOTPViaEmail = async (
  email: string,
  inputOtp: string
): Promise<boolean> => {
  const storedData = otpStore.get(email);

  if (!storedData) {
    throw new Error("OTP not found or expired");
  }

  if (Date.now() > storedData.expiresAt) {
    otpStore.delete(email);
    throw new Error("OTP has expired");
  }

  if (storedData.attempts >= 3) {
    otpStore.delete(email);
    throw new Error("Too many failed attempts");
  }

  if (storedData.otp === inputOtp.trim()) {
    otpStore.delete(email);
    return true;
  } else {
    storedData.attempts++;
    otpStore.set(email, storedData);
    throw new Error("Invalid OTP");
  }
};
