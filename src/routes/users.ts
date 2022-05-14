import {
  validatorChangePassword,
  validatorCreateUser,
} from "./../validators/users";
import { createUser, updateUserPassword } from "./../controllers/users";
import { Router } from "express";

const router = Router();

//TODO: http://localhost:3001/api/users

/**
 * POST USER:
 * @swagger
 * /api/users:
 *  post:
 *   tags:
 *     - users
 *   summary: Create user
 *   description: This endpoint creates a user and returns the new user with token. name.length>5,username.length>5
 *   requestBody:
 *        content:
 *             application/json:
 *                schema:
 *                    $ref: "#/components/schemas/User"
 *   responses:
 *      "201":
 *          description: Return a new User with token
 *      "400":
 *          description: The user already exists Missing || data (name,username,email,password) or the data is wrong
 *
 */
router.post("/", validatorCreateUser, createUser);

/**
 * PUT USER:
 * @swagger
 * /api/users/{token}:
 *  put:
 *   tags:
 *     - users
 *   summary: Change the User password
 *   description: This endpoint creates a user and returns the new user with token. name.length>5,username.length>5
 *
 *   parameters:
 *    - in: path
 *      name: token
 *      schema:
 *        type: string
 *      required: true
 *      description: Need a token
 *
 *   requestBody:
 *        content:
 *             application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                      password:
 *                           type: string
 *                      newPassword:
 *                           type: string
 *                    required:
 *                       - email
 *                       - newPassword
 *   responses:
 *      "201":
 *          description: Return a new User with token
 *      "400":
 *          description: The user already exists || Missing data (  ,newPassword) or the data is wrong
 *   security:
 *      - bearerAuth: []
 */

router.put("/:token", validatorChangePassword, updateUserPassword);

module.exports = router;
