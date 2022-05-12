import { loginUser,createUser } from "./../controllers/users";
import { Router } from "express";
import { validatorCreateUser } from "../validators/users";

const router=Router();
router.use("/",validatorCreateUser,createUser);
router.use("/login",loginUser);

module.exports= router;



