import { handleError } from "./../helpers/handleError";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { encrypPass } from "../helpers/user";

const prisma = new PrismaClient();

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
      select: {
        name: true,
        username: true,
      },
    });

    return res.status(201).json({ error: null, content: newUser });
  } catch (error: any) {
    console.log("Error en createUser: ", error);
    return handleError(res, error, 500);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const data = matchedData(req);
    return res.send({ error: data });
  } catch (error: any) {
    console.log("Error in loginUser");
    return handleError(res, error, 500);
  }
};
