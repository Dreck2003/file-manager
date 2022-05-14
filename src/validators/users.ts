import { check } from "express-validator";
import { validates } from "./validates";

export const validatorCreateUser = [
  check(["name", "username"]).exists().notEmpty().isLength({ min: 5, max: 20 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 30 }),
  validates,
];

export const validatorLoginUser = [
  check("password").exists().notEmpty().isLength({ min: 8, max: 30 }),
  check("username").exists().notEmpty().isLength({ min: 5, max: 20 }),
  validates,
];
export const validatorForgotPassUser = [
  check("email").exists().notEmpty().isEmail(),
  validates,
];

export const validatorChangePassword = [
  check("password").exists().notEmpty().isLength({ min: 8, max: 30 }),
  check("newPassword").exists().notEmpty().isLength({ min: 8, max: 30 }),
  validates,
];
