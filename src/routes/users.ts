import { validatorForgotPassUser,validatorCreateUser,validatorLoginUser } from "./../validators/users";
import { loginUser,createUser, forgotPassword } from "./../controllers/users";
import { Router } from "express";

const router=Router();
router.post("/",validatorCreateUser,createUser);
router.post("/login",validatorLoginUser,loginUser);
router.post("/forgotPassword",validatorForgotPassUser,forgotPassword);

module.exports= router;



