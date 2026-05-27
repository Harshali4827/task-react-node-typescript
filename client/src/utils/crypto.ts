import CryptoJS from "crypto-js";

const FRONTEND_SECRET =
  "mern_frontend_encrypt_key_2026";


export const encryptData = (
  text: string
) => {
  return CryptoJS.AES.encrypt(
    text || "",
    FRONTEND_SECRET
  ).toString();
};

export const decryptData = (
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
      "Frontend Decrypt Error:",
      error
    );

    return "";
  }
};