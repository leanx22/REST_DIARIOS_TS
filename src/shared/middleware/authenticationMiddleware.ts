import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UserPayload } from "../../utils/jwt";
import 'dotenv/config';
import { AuthenticationError } from "../errors/auth/authenticationError";
import { ServerError } from "../errors/internal/serverError";

declare global { //Este es el mejor lugar donde declarar esto?
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}

export const ensureAuth = (req: Request, _res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return next(new AuthenticationError("No authentication header provided"));
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return next(new AuthenticationError("No token provided"));
    }

    try{
        const secret = process.env.JWT_SECRET;
        if(!secret)throw new ServerError("JWT SECRET NOT FOUND!");
        const decoded = jwt.verify(token, secret) as UserPayload;
        req.user = decoded;
        next();
    }catch(err: any){
        return next(new AuthenticationError("Invalid or expired token"));
    }
}

