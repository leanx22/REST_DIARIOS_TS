import { AppError } from "./app.error";

export class AuthError extends AppError{
    constructor(){
        super(`Bad credentials`, 401, "AUTH_ERROR");
    }
}