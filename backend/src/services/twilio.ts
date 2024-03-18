import Twilio from "twilio";
import "dotenv/config";

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSID, authToken);

export const sendOTP = async (phoneNumber: string) => {
  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_ID!)
      .verifications.create({ to: phoneNumber, channel: "sms" });
    console.log(verification.status);
    return verification;
  } catch (error) {
    console.log(`Error sending sms to user: ${phoneNumber}`, error);
  }
};

export const verifyOTP = async (
  phoneNumber: string,
  otp: string
): Promise<boolean> => {
  try {
    const verificationCheck = await client.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_ID!)
    .verificationChecks.create({ to: phoneNumber, code: otp });
  console.log(verificationCheck.status);
  return verificationCheck.status === "approved";
  } catch (error) {
    console.error(`Error verifying code for ${phoneNumber}`, error);
    throw error;
  }
};
