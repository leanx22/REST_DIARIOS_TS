import { ErrorCode } from "../../../utils/errorCodes";
import { AppError } from "../appError";

export class AuthenticationError extends AppError{
    constructor(message: string | undefined){
        if(message){
            super(message, 401, ErrorCode.AUTHENTICATION);
        }else{
            super("You must be logged in first", 401, ErrorCode.AUTHENTICATION);
        }
        
    }
}