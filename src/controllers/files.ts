import fs from "fs/promises";
import { Request, Response } from "express";
import { getFileS3, UploadFile } from "../config/aws";
import { handleError } from "../helpers/handleError";

export const createFile = async (req: Request, res: Response) => {
  try {
    console.log("The request File is: ", req.file);
    if (!req.file) {
      return handleError(res, "Not exist the file", 400);
    }
    const result = await UploadFile(req.file);
    console.log("The result of the bucket is: ", result);
    await fs.unlink(req.file.path);

    return res.send({ error: null, content: result?.Key });
  } catch (error: any) {
    console.log("Error in createFile: ", error);
    return handleError(res, error, 500);
  }
};

//KEY ==> Is a File Key (file-DATATIME.ext);
export const singleFile = async (req: Request, res: Response) => {
  try {
    const key: string = req.params.key;
    if (!key) {
      return handleError(res, "The key does not exist", 400);
    }

    const result = await getFileS3(key);

    if (!result) {
      return handleError(res, "The file not exist", 404);
    }

    return result.pipe(res);
  } catch (error: any | string) {
    console.log("Error in singleFile");
    return handleError(res, error, 500);
  }
};
