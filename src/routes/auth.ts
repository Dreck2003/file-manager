import {
  validatorForgotPassUser,
  validatorLoginUser,
} from "../validators/users";
import { Router } from "express";
import { forgotPassword, loginUser } from "../controllers/auth";

const router = Router();

//TODO: http://localhost:3001/api/auth

/**
 * POST USER:
 * @swagger
 * /api/auth/login:
 *  post:
 *   tags:
 *     - auth
 *   summary: Login User
 *   description: This endpoint returns a user with token
 *   requestBody:
 *        content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                     username:
 *                         type: string
 *                     password:
 *                          type: string
 *                  required:
 *                     - email
 *                     - password
 *   responses:
 *      "200":
 *        description: Return a new User whith token
 *      "401":
 *        description: The user not exist || The credentials are incorrects
 *      "400":
 *         description: Error in json request || Missing data (name,username,email,password)
 *
 */
router.post("/login", validatorLoginUser, loginUser);

/**
 * PUT USER:
 * @swagger
 * /api/auth/forgotPassword:
 *  put:
 *   tags:
 *     - auth
 *   summary: Forgot Password
 *   description: This endpoint returns a url for callback what would used for frontend, and sendMail for create new password
 *   requestBody:
 *        content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    email:
 *                         type: "string"
 *                  required:
 *                     - email
 *
 *   responses:
 *      "200":
 *         description: Return a url to be consumed by frontend
 *      "401":
 *         description: The user not exist || The credentials are incorrects
 *      "400":
 *         description: Error in json request || Missing data (email)
 */
router.put("/forgotPassword", validatorForgotPassUser, forgotPassword);

module.exports = router;
