import { loginUser,createUser } from "./../controllers/users";
import { Router } from "express";
import { validatorCreateUser,validatorLoginUser } from "../validators/users";

const router=Router();
router.post("/",validatorCreateUser,createUser);
router.post("/login",validatorLoginUser,loginUser);

module.exports= router;



