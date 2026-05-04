import CryptoJS from "crypto-js";

export const cryptoEncryptForWebOTP = async () => {
    let ciphertext = JSON.stringify({
        keyString: new Date().toString(),
        secretKey: process.env.REACT_APP_OTP_TOKEN_SECRET_KEY
    })


    const bytes = CryptoJS.AES.encrypt(ciphertext, process.env.REACT_APP_OTP_TOKEN_PASS_KEY);
    const decryptedString = bytes.toString()

    return decryptedString
}