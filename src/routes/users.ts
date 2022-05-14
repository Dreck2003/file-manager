import { validatorCreateUser } from "./../validators/users";
import { createUser } from "./../controllers/users";
import { Router } from "express";

const router = Router();

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
 *      "403":
 *          description: Missing data (name,username,email,password) or the data is wrong
 *      "400":
 *          description: The user already exists
 *
 */
router.post("/", validatorCreateUser, createUser);

module.exports = router;
