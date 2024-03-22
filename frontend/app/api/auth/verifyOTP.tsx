import axios from "axios";

export default async function verifyOTP(
  readyPhoneNumber: string,
  OTP: string,
  currentStep: number
) {
  const response = await axios.post(
    "http://localhost:3002/api/auth/verify-otp",
    {
      phoneNumber: readyPhoneNumber,
      otp: OTP,
      currentStep: currentStep,
    }
  );
  return response;
}
