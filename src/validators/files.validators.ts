import fs from "fs/promises";
import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { handleError } from "../helpers/handleError";

export const validatorCreateFile = [
  check("nameFile").exists().notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      // console.log("Error en validatorCreateUser: ",error.array());
      console.log();
      try {
        console.log("middleware for files: ", req.file);

        await fs.unlink(req.file?.path as string);
        return handleError(res, "Missing data or incorrect data");
      } catch (error) {
        return handleError(res, "Missing data or incorrect data");
      }
    }
  },
];
export const validatorChangeFileName = [
  check("nameFile").exists().notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      // console.log("Error en validatorCreateUser: ",error.array());
      return handleError(res, "Missing data or incorrect data", 400);
    }
  },
];
