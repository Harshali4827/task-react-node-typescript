import CryptoJS from "crypto-js";
const BACKEND_SECRET =
  process.env
    .BACKEND_SECRET as string;

const FRONTEND_SECRET =
  process.env
    .FRONTEND_SECRET as string;

export const backendEncrypt = (
  text: string
) => {
  return CryptoJS.AES.encrypt(
    text || "",
    BACKEND_SECRET
  ).toString();
};

export const backendDecrypt = (
  cipherText: string
) => {
  try {
    if (!cipherText) {
      return "";
    }

    const bytes =
      CryptoJS.AES.decrypt(
        cipherText,
        BACKEND_SECRET
      );

    return bytes.toString(
      CryptoJS.enc.Utf8
    );
  } catch (error) {
    console.log(
      "Backend Decrypt Error:",
      error
    );

    return "";
  }
};

export const frontendDecrypt = (
  cipherText: string
) => {
  try {
    if (!cipherText) {
      return "";
    }

    const bytes =
      CryptoJS.AES.decrypt(
        cipherText,
        FRONTEND_SECRET
      );

    return bytes.toString(
      CryptoJS.enc.Utf8
    );
  } catch (error) {
    console.log(
      "Frontend Layer Decrypt Error:",
      error
    );

    return "";
  }
};