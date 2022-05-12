import { handleError } from "./../helpers/handleError";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { encrypPass, validatePass } from "../helpers/user";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const secret: string = process.env.JWT_SECRET || "secret";

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = matchedData(req);
    const isNewUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (isNewUser) {
      //Si existe un usuario con el mismo email:
      return handleError(res, "User already exists", 400);
    }

    //Hasheamos la contraseña 👍
    const newPassword = await encrypPass(data.password);
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: newPassword,
        username: data.username,
      },
    });
    const token = jwt.sign({ id: newUser.id }, secret, {
      expiresIn: "48h",
    });

    return res.status(201).json({
      error: null,
      content: {
        name: newUser.name,
        username: newUser.username,
        token,
      },
    });
  } catch (error: any) {
    console.log("Error en createUser: ", error);
    return handleError(res, error, 500);
  }
};

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

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "48h",
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
  } catch (error:any) {
    console.log("Error in loginUser");
    return handleError(res, error, 500);
  }
};
