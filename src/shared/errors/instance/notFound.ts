import { ErrorCode } from "../../../types/errorCodes";
import { AppError } from "../appError";

export class NotFoundError extends AppError{
    constructor(resource: string){
        super(`${resource} not found`, 404, ErrorCode.NOT_FOUND);
    }
}