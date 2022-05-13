import { isLoggedInMiddleware } from "../middleware/auth";
import { uploadMiddleware } from "./../config/multer";
import { createFile, getUserFiles, singleFile } from "./../controllers/files";
import { Router } from "express";
import {
  validatorChangeFileName,
  validatorCreateFile,
} from "../validators/files.validators";
import {
  changeFileName,
  getFileUrl,
  getUnsplashImage,
} from "../controllers/managerFile";

// TODO: http://localhost:3001/api/files/

const router = Router();

router.use("/", isLoggedInMiddleware);

router.post(
  "/",
  // isLoggedInMiddleware,
  uploadMiddleware.single("fileUpload"),
  validatorCreateFile,
  createFile
);

router.get("/getFileUrl/:id", getFileUrl);
router.get("/singleFile/:key", singleFile);
router.get("/userFiles", getUserFiles);
router.get("/searchFile", getUnsplashImage);

router.put("/changeNameFile/:id", validatorChangeFileName, changeFileName);

// router.get("/download/:key", downloadFile);

module.exports = router;
