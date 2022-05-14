import { Router } from "express";
import { downloadAwsFile } from "../config/aws";
import { getFileUrl, getUnsplashImage } from "../controllers/managerFile";
import {
  isLoggedInMiddleware,
  isTokenParamsMiddleware,
} from "../middleware/auth";

const router = Router();

// TODO: http://localhost:3001/api/fileManager/

/**
 * GET DownloadFile:
 * @swagger
 * /api/fileManager/download/{token}/{key}:
 *  get:
 *   tags:
 *     - fileManager
 *   summary: Download the file
 *   description: This endpoint download a file using the token and key in params
 *   parameters:
 *    - in: "path"
 *      name: "key"
 *      schema:
 *        type: string
 *      required: true
 *      description: Need a file key
 *    - in: path
 *      name: token
 *      schema:
 *        type: string
 *      required: true
 *      description: Need a user token for security
 *
 *   responses:
 *      "200":
 *         description: Return a download file
 *      "401":
 *         description: You dont have token || The credentials are incorrects
 *      "403":
 *         description: Missing data (name,username,email,password)
 *      "400":
 *         description: The file not exist in database
 *   security:
 *      - bearerAuth: []
 */

router.get("/download/:token/:key", isTokenParamsMiddleware, downloadAwsFile);

/**
 * GET FILE_URL:
 * @swagger
 * /api/fileManager/getFileUrl/{id}:
 *  get:
 *   tags:
 *     - fileManager
 *   summary: GET file
 *   description: This endpoint get the url of File
 *
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: Need a file id
 *
 *   responses:
 *      "200":
 *         description: Return a found file
 *      "401":
 *         description: You dont have token || The credentials are incorrects
 *      "400":
 *         description: Id not exist
 *
 *   security:
 *      - bearerAuth: []
 *
 */
router.get("/getFileUrl/:id", isLoggedInMiddleware, getFileUrl);

/**
 * GET SEARCH_FILES:
 * @swagger
 * /api/fileManager/searchFile:
 *  get:
 *   tags:
 *     - fileManager
 *   summary: GET founds images that matcheas with query
 *   description: This endpoint returns images that are similar to the query
 *
 *   parameters:
 *    - in: query
 *      name: image
 *      schema:
 *        type: string
 *      required: true
 *      description: Need a file id
 *
 *   responses:
 *      "200":
 *         description: Return all images that are similar to the query
 *      "401":
 *         description: You dont have token || The credentials are incorrects
 *      "400":
 *         description: The query not exist
 *      "404":
 *        description: The images were not found
 *
 *   security:
 *      - bearerAuth: []
 *
 */
router.get("/searchFile", isLoggedInMiddleware, getUnsplashImage);

module.exports = router;
