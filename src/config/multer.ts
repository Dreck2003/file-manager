import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    const pathStorage = `${__dirname}/../uploads`;
    console.log("destino!");

    cb(null, pathStorage);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const ext = file.originalname.trim().split(".").pop();
    const fileName = `file-${Date.now()}.${ext}`;
    console.log("fileName!");
    cb(null, fileName);
  },
});

export const uploadMiddleware = multer({
  storage: storage,
});
