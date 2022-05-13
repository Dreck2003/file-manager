import { handleError } from "./../helpers/handleError";
import { Request, Response } from "express";
import { CONFIG } from "../config/process";
import axios from "axios";
import { matchedData } from "express-validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const changeFileName = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return handleError(res, "No file id provided", 400);
    }
    const data = matchedData(req);

    const newFile = await prisma.file.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.nameFile,
      },
      select: {
        name: true,
        url: true,
        key: true,
        id: true,
      },
    });

    return res.status(201).json({ error: null, content: newFile });
  } catch (error) {
    console.log("Error en changeFileName: ", error);
    return handleError(res, error, 500);
  }
};

export const getUnsplashImage = async (req: Request, res: Response) => {
  try {
    const query = req.query.image;

    if (!query) {
      return handleError(res, "The query not exist", 400);
    }
    const url = `https://api.unsplash.com/search/photos/?query=${query}&client_id=${CONFIG.UNSPLASH.ACCESS_KEY}`; //Return [{},{},{}]

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Basic ${CONFIG.UNSPLASH.ACCESS_KEY}`,
      },
    });
    if (data.errors) {
      return res.status(404).json({ error: data.errors[0], content: null });
    }

    const images = data.results.map((image: any) => {
      return {
        id: image.id,
        urls: {
          regular: image.urls.regular,
          small: image.urls.small,
          full: image.urls.full,
        },
        description: image.description,
        user: {
          name: image.user.name,
          id: image.user.id,
        },
      };
    });

    return res.status(200).json({ error: null, content: images });
  } catch (error) {
    console.log("Error en getUnsplashImage: ", error);
    return handleError(res, error, 500);
  }
};

export const getFileUrl = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!Number(id)) {
      return handleError(res, "Id not exist", 404);
    }

    const fileUrl = await prisma.file.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        name: true,
        url: true,
        key: true,
      },
    });

    return res.status(200).json({ error: null, content: fileUrl });
  } catch (error) {
    console.log("Error en getFileUrl: ", error);
    return handleError(res, error, 500);
  }
};
