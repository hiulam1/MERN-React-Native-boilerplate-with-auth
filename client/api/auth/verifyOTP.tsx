import axios from "axios";

export default async function verifyOTP(
  readyPhoneNumber: string,
  OTP: string,
  currentStep: number
) {
  try {
    const response = await axios.post(
      "http://localhost:3002/api/auth/verify-otp",
      {
        phoneNumber: readyPhoneNumber,
        otp: OTP,
        currentStep: currentStep,
      }
    );
    return response;
  } catch (error) {
    if ((error as any).response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error((error as any).response.data.message); // Assuming the server sends back an error message under data.message
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("An unexpected error occurred");
    }
  }
}
