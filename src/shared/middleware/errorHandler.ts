import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { AppError } from "../errors/app.error";

export function errorHandler(error: unknown, _req: Request, res: Response, next: NextFunction){
   
    if(process.env.APP_DEBUG != undefined && process.env.APP_DEBUG === "true"){
        console.log("DEBUG MODE ERROR:");
        next(error);
        return;
    }

    if(error instanceof AppError){
        res.status(error.statusCode).json({
            errorCode:error.code,
            message:error.message
        });
        return;
    }

    if(error instanceof Error){
        res.status(500).json({
            message:error.message
        });
        return;
    }

    res.status(500).json({
        error:{
            message:"An error has occurred."
        }
    });

}