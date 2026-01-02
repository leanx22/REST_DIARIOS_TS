import { ErrorCode } from "../../../utils/errorCodes";
import { AppError } from "../appError";

export class AuthorizationError extends AppError{
    constructor(message: string){
        super(message, 403, ErrorCode.UNAUTHORIZED);
    }
}