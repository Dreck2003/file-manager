import {
  isLoggedInMiddleware,
  isTokenParamsMiddleware,
} from "../middleware/auth";
import { uploadMiddleware } from "./../config/multer";
import { createFile, getUserFiles, singleFile } from "./../controllers/files";
import { Router } from "express";
import {
  validatorChangeFileName,
  validatorCreateFile,
} from "../validators/files.validators";
import {
  changeFileName,
  downloadFile,
  getFileUrl,
  getUnsplashImage,
} from "../controllers/managerFile";

// TODO: http://localhost:3001/api/files/

const router = Router();
router.get("/download/:token/:key", isTokenParamsMiddleware, downloadFile);

// router.use("/", isLoggedInMiddleware);
//
router.post(
  "/",
  isLoggedInMiddleware,
  uploadMiddleware.single("fileUpload"),
  validatorCreateFile,
  createFile
);

router.get("/getFileUrl/:id", isLoggedInMiddleware, getFileUrl);
router.get("/singleFile/:key", isLoggedInMiddleware, singleFile);
router.get("/userFiles", isLoggedInMiddleware, getUserFiles);
router.get("/searchFile", isLoggedInMiddleware, getUnsplashImage);

router.put(
  "/changeNameFile/:id",
  validatorChangeFileName,
  isLoggedInMiddleware,
  changeFileName
);

module.exports = router;
