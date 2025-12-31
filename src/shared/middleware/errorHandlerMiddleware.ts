import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { AppError } from "../errors/appError";
import { ServerError } from "../errors/internal/serverError";
import { MongoError } from "mongodb";

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction){
   
    if(process.env.APP_DEBUG != undefined && process.env.APP_DEBUG === "true"){
        console.error("DEBUG MODE ERROR STACK:", error);
    }else{
        console.error("Error: ", error instanceof Error ? error.message : error);
    }

    if(error instanceof MongoError){ // Ojo, que esto atrapa TODOS los errores de mongo, y no todos son 503, lo tengo que cambiar después
        res.status(503).json({
            status: "error",
            message: "Database error, try again later."
        });
        return;
    }

    if(error instanceof ServerError){
        res.status(500).json({
            status: "error",
            message:"An error has occurred, try again later."
        });
        return;
    }

    if(error instanceof AppError){
        res.status(error.statusCode).json({
            status: "error",
            errorCode:error.internalCode,
            message:error.message
        });
        return;
    }

    if(error instanceof Error){
        res.status(500).json({
            status: "error",
            message:error.message
        });
        return;
    }

    res.status(500).json({
        status: "error",
        message:"An unknown error has occurred, try again later. If the problem persist, please contact the administrator."
    });

}