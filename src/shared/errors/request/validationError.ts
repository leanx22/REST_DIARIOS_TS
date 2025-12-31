import { ErrorCode } from "../../../types/errorCodes";
import { AppError } from "../appError";
import z, { ZodError } from "zod";

export class ValidationError extends AppError{
    constructor(zodErr: ZodError){
        super(z.prettifyError(zodErr), 400, ErrorCode.VALIDATION);
    }
}