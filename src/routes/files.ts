import { isLoggedInMiddleware } from "../middleware/auth";
import { uploadMiddleware } from "./../config/multer";
import { createFile, getUserFiles, singleFile } from "./../controllers/files";
import { Router } from "express";
import {
  validatorChangeFileName,
  validatorCreateFile,
} from "../validators/files.validators";
import { changeFileName } from "../controllers/managerFile";

// TODO: http://localhost:3001/api/files/

const router = Router();

/**
 * CREATE File:
 * @swagger
 * /api/files/:
 *  post:
 *   tags:
 *     - files
 *   summary: Create File
 *   description: This endpoint download create an file
 *   requestBody:
 *        content:
 *             application/json:
 *                schema:
 *                    $ref: "#/components/schemas/File"
 *
 *   responses:
 *      "200":
 *         description: Return a new File, whitouh error
 *      "401":
 *         description: You dont have token || The credentials are incorrects
 *      "403":
 *         description: Missing data (nameFile)
 *      "400":
 *         description: The file not exist
 *      "500":
 *         description: It was not possible to upload the file || JWT_ERROR
 *
 *   security:
 *      - bearerAuth: []
 */

router.post(
  "/",
  isLoggedInMiddleware,
  uploadMiddleware.single("fileUpload"),
  validatorCreateFile,
  createFile
);

/**
 * GET File(pipe):
 * @swagger
 * /api/files/singleFile/{key}:
 *  get:
 *   tags:
 *     - files
 *   summary: Get File
 *   description:
 *        "This endpoint get file through chunks For example: set src to image : '.../api/single/key' --> render the image in tha tag html"
 *   parameters:
 *    - in: "path"
 *      name: "key"
 *      schema:
 *        type: string
 *      required: true
 *      description: Need a file key
 *
 *   responses:
 *      "200":
 *         description: Transmitting the file
 *      "401":
 *         description: You dont have token || The credentials are incorrects
 *      "400":
 *         description: The key does not exist"
 *   security:
 *      - bearerAuth: []
 */

router.get("/singleFile/:key", isLoggedInMiddleware, singleFile);

/**
 * GET UserFiles:
 * @swagger
 * /api/files/userFiles:
 *  get:
 *   tags:
 *     - files
 *   summary: Get UserFiles
 *   description: This endpoint get user files using TOKEN
 *
 *   responses:
 *      "200":
 *         description: Return a download file
 *      "401":
 *         description: You dont have token || The credentials are incorrects
 *      "400":
 *         description: The file not exist
 *
 *   security:
 *      - bearerAuth: []
 *
 */

router.get("/userFiles", isLoggedInMiddleware, getUserFiles);

/**
 * PUT ChangeFile:
 * @swagger
 * /api/files/changeNameFile/{id}:
 *  put:
 *   tags:
 *     - files
 *   summary: Update File name
 *   description: This endpoint change a file name
 *
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: Need a file id
 *   requestBody:
 *        content:
 *             application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                      nameFile:
 *                        type: string
 *
 *   responses:
 *      "200":
 *         description: Return a download file
 *      "401":
 *         description: You dont have token || The credentials are incorrects
 *      "400":
 *         description: The file not exist
 *      "403":
 *         description: Missing data or is wrong
 *      "500":
 *         description: Error in database
 *      "404":
 *        description: The File not exist
 *
 *   security:
 *      - bearerAuth: []
 *
 */
router.put(
  "/changeNameFile/:id",
  validatorChangeFileName,
  isLoggedInMiddleware,
  changeFileName
);

module.exports = router;
