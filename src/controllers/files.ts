import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import { Request, Response } from "express";
import { getFileS3, UploadFile } from "../config/aws";
import { handleError } from "../helpers/handleError";
import { getToken } from "../helpers/getIdToken";
import { CONFIG } from "../config/process";

const prisma = new PrismaClient();
//TODO: http://localhost:3001/api/files

export const createFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      console.log("request file: ", req.file);

      return handleError(res, "Not exist the file", 400);
    }
    const result = await UploadFile(req.file);

    await fs.unlink(req.file.path);
    if (!result) {
      return handleError(res, "Not posible upload file", 500);
    }

    //This start created models and relations:

    const nameFile = req.body.nameFile;

    const baseUrl = `${CONFIG.BASE_URL}/api/files/singleFile`;

    const token = getToken(req);
    console.log({ token });
    if (!token) {
      return handleError(res, "JWT_ERROR", 500);
    }

    const newFile = await prisma.file.create({
      data: {
        name: nameFile,
        url: `${baseUrl}/${result.Key}`,
        key: result.Key,
        isDeleted: false,
        userId: token.id,
      },
      select: {
        name: true,
        url: true,
        key: true,
      },
    });

    return res.status(200).json({ error: null, content: newFile });
  } catch (error) {
    console.log("Error in createFile: ", error);
    return handleError(res, error, 500);
  }
};

//KEY ==> Is a File Key (file-DATATIME.ext);
export const singleFile = async (req: Request, res: Response) => {
  try {
    // console.log("Entro en single File");

    const key: string = req.params.key;
    if (!key) {
      return handleError(res, "The key does not exist", 400);
    }

    //Debemos asegurarnos de que la key existe en los archivos

    const isExistFile = await prisma.file.findFirst({
      where: {
        key: key,
      },
    });

    if (!isExistFile) {
      return handleError(res, "The file does not exist", 404);
    }

    const result = await getFileS3(key);

    if (!result) {
      return handleError(res, "The file not exist", 404);
    }
    console.log({ result: result });

    return result.pipe(res);
  } catch (error) {
    console.log("Error in singleFile");
    return handleError(res, error, 500);
  }
};

export const getUserFiles = async (req: Request, res: Response) => {
  try {
    const token = getToken(req);
    console.log("Paso por getUSerFiles");

    if (!token) {
      return handleError(res, "JWT_ERROR", 500);
    }

    const userFiles = await prisma.file.findMany({
      where: {
        userId: token.id,
      },
      select: {
        name: true,
        key: true,
        url: true,
        id: true,
      },
    });

    return res.status(200).json({ error: null, content: userFiles });
  } catch (error) {
    console.log("Error en getUSerFiles: ", error);
    return handleError(res, error, 500);
  }
};
