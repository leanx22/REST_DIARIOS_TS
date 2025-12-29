import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../errors/app.error";
import { UserPayload } from "../../utils/jwt";
import 'dotenv/config';

declare global { //Este es el mejor lugar donde declarar esto?
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return next(new AppError("No token provided", 401, "UNAUTHORIZED"));
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return next(new AppError("Invalid token format", 401, "UNAUTHORIZED"));
    }

    try{
        const secret = process.env.JWT_SECRET || 'CambiarEsto!';
        //if(!secret)throw new AppError();
        const decoded = jwt.verify(token, secret) as UserPayload;
        req.user = decoded;
        next();
    }catch(err: any){
        
        //if(err instanceof AppError){ //crear un nuevo tipo de error (como internal error o asi), y no enviarlo si no estamos en modo debug.
         //   return next(new AppError("JWT secret error", 500, "APP_ERROR"));    
        //}
        
        return next(new AppError("Invalid or expired token", 401, "UNAUTHORIZED"));
    }

}

