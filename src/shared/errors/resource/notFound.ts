import { ErrorCode } from "../../../utils/errorCodes";
import { AppError } from "../appError";

export class NotFoundError extends AppError{
    constructor(resource: string){
        super(`${resource} not found`, 404, ErrorCode.NOT_FOUND);
    }
}