import { CONFIG } from "./../config/process";
import { handleError } from "./../helpers/handleError";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { validatePass } from "../helpers/bcryptHelper";
import jwt from "jsonwebtoken";
import { sendMail } from "../config/email";
import { ForgotPassHtml } from "../helpers/templates/emailTemplate";

const prisma = new PrismaClient();

//TODO: http://localhost:3001/api/auth

export const loginUser = async (req: Request, res: Response) => {
  try {
    const data = matchedData(req);
    const user = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      return handleError(res, "User not exists", 401);
    }
    const validPassword: boolean = await validatePass(
      data.password,
      user.password
    );

    if (!validPassword) {
      return handleError(res, "The credentials are incorrect", 401);
    }

    const token = jwt.sign({ id: user.id }, CONFIG.JWT_SECRET, {
      expiresIn: "2d",
    });

    //Return jsonWebToken
    return res.status(200).json({
      error: null,
      content: {
        name: user.name,
        username: user.username,
        token,
      },
    });
  } catch (error) {
    console.log("Error in loginUser");
    return handleError(res, error, 500);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const data = matchedData(req);

    const isExistUser = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (!isExistUser) {
      return handleError(res, "User not exist", 401);
    }
    //If user exist, then:
    const token = jwt.sign({ id: isExistUser.id }, CONFIG.JWT_SECRET, {
      expiresIn: "48h",
    });
    const url = `http://localhost:3000/${token}`;
    const template = ForgotPassHtml(isExistUser.name, url);
    await sendMail(isExistUser.email, template);

    return res.status(200).json({ error: null, content: url });
  } catch (error) {
    console.log("Error en forgotPassword");
    return handleError(res, error, 500);
  }
};
