import { CONFIG } from "./../config/process";
import { handleError } from "./../helpers/handleError";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { encrypPass } from "../helpers/bcryptHelper";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//TODO: http://localhost:3001/api/users

interface JwtPayload {
  id: number;
}

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
    const isExist = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (isExist) {
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
    const token = jwt.sign({ id: newUser.id }, CONFIG.JWT_SECRET, {
      expiresIn: "2d",
    });

    return res.status(201).json({
      error: null,
      content: {
        name: newUser.name,
        username: newUser.username,
        token,
      },
    });
  } catch (error) {
    console.log("Error en createUser: ", error);
    return handleError(res, "User already exist", 500);
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const data = matchedData(req);

    const { id } = jwt.verify(
      req.params.token,
      CONFIG.JWT_SECRET as string
    ) as JwtPayload;

    const { password, newPassword } = data;

    if (password != newPassword) {
      return handleError(res, "Passwords do not match");
    }

    const changedPassword = await encrypPass(newPassword);
    const newUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        password: changedPassword,
      },
    });

    return res.status(201).json({
      error: null,
      content: `Password changed!,try to login again ${newUser.name}`,
    });
  } catch (error) {
    console.log("Error en updateUserPassword: ", error);
    return handleError(res, error, 500);
  }
};
