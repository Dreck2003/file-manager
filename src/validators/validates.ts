import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { handleError } from "../helpers/handleError";

export const validates=(req:Request,res:Response,next:NextFunction)=>{
	try{
		validationResult(req).throw();
		return next();
	}catch(error:any){
		// console.log("Error en validatorCreateUser: ",error.array());
		handleError(res,"Missing data or incorrect data");
             
	}
        
};