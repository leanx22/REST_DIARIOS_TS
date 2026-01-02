import { ErrorCode } from "../../../utils/errorCodes";
import { AppError } from "../appError";

export class AlreadyExistsError extends AppError{
    constructor(resource: string){
        super(`${resource} already exists`, 409, ErrorCode.ALREADY_EXISTS);
    }
}