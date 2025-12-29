import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { createUserChema, loginUserChema } from "./user.schema";
import { ValidationError } from "../../shared/errors/validationError";

export class UserController{
    private userService: UserService;

    constructor(userServ: UserService){
        this.userService = userServ;
    }

    register = async (req: Request, res: Response, _next: NextFunction)=>{
        const parsed = createUserChema.safeParse(req.body);

        if(parsed.error){
            throw new ValidationError(parsed.error);
        }

        const response = await this.userService.register(parsed.data.email, parsed.data.password);

        return res.status(201).json(response);
    }

    login = async (req: Request, res: Response, _next: NextFunction) => {
        const parsed = loginUserChema.safeParse(req.body);

        if(parsed.error){
            throw new ValidationError(parsed.error);
        }

        const response = await this.userService.login(parsed.data.email, parsed.data.password);

        res.status(200).json(response);

    }

}