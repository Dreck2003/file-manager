import { isLoggedInMiddleware } from "../middleware/auth";
import { uploadMiddleware } from "./../config/multer";
import { createFile, singleFile } from "./../controllers/files";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  isLoggedInMiddleware,
  uploadMiddleware.single("fileUpload"),
  createFile
);
router.get("/:key", isLoggedInMiddleware, singleFile);

module.exports = router;
