import { useState } from "react";

export const checkPhoneIfValid = (phoneNumber: string) => {
  const areaCodes = [
    21, 22, 24, 26, 27, 31, 32, 33, 34, 41, 43, 44, 52, 55, 56, 61, 62, 71, 74,
    75, 76, 77, 78, 79, 81, 91,
  ];

  return areaCodes.some((areaCode) => {
    const phoneRegex = new RegExp(`^0?${areaCode}\\d{7}$`);
    return phoneRegex.test(phoneNumber);
  });
};

export const modifyInput = (input: string) => {
  let formattedInput = input.startsWith("0") ? input : `0${input}`;
  formattedInput = `${formattedInput.slice(0, 3)} ${formattedInput.slice(3, 6)} ${formattedInput.slice(6, 8)} ${formattedInput.slice(8, 10)}`;
  return formattedInput.trim();
};
