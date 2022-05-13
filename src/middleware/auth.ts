import { CONFIG } from "../config/process";
import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { handleError } from "../helpers/handleError";

interface JwtPayload {
  id: number;
}

export const isLoggedInMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let auth = req.headers["authorization"];
    if (!auth) {
      return handleError(res, "Not token", 401);
    }

    auth = auth.split(" ").pop() as string;
    //Si tiene un token
    const result = jwt.verify(auth, CONFIG.SECRET as string) as JwtPayload;
    if (!result.id) {
      return handleError(res, "The credentials are incorrect", 401);
    }
    next();
  } catch (error: any) {
    console.log("Error en isLoggedIn");
    return handleError(res, error, 500);
  }
};

export const isTokenParamsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.params.token;

    if (!token) {
      return handleError(res, "You dont have token", 401);
    }
    const result = jwt.verify(token, CONFIG.SECRET as string) as JwtPayload;
    if (!result.id) {
      return handleError(res, "The credentials are incorrect", 401);
    }
    next();
  } catch (error) {
    return handleError(res, error, 500);
  }
};
