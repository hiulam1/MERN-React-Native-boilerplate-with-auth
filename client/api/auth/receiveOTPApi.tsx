import axios from "axios";
export default async function receiveOTP(readyPhoneNumber: string) {
  const response = await axios.post(`http://localhost:3002/api/auth/send-otp`, {
    phoneNumber: readyPhoneNumber,
  });
  return response;
}
