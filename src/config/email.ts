import { CONFIG } from "./process";
import nodemailer from "nodemailer";

/**
 *
 * @returns new Transporter for sendMail
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: CONFIG.EMAIL.USER, // generated ethereal user
      pass: CONFIG.EMAIL.PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

/**
 * 
 * @param email User email 
 * @param template HTML template
 */
export const sendMail = async (email:string,template:string) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    await transporter.sendMail({
      from: CONFIG.EMAIL.FROM,
      to: email,
      subject: "Forgot Password",
      html: template,
    });
  } catch (error) {
    console.log("Error en sendMail: ", error);
  }
};
