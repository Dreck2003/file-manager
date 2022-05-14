import { Request } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config/process";

interface JwtPayload {
  id: number;
}

export const getToken = (req: Request) => {
  try {
    let auth = req.headers["authorization"];
    auth = auth?.split(" ").pop() as string;
    return jwt.verify(auth, CONFIG.JWT_SECRET as string) as JwtPayload;
  } catch (error) {
    console.log("Error en getToken Helper: ", error);
    return false;
  }
};
