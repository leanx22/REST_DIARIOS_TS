import { AppError } from "./app.error";
import z, { ZodError } from "zod";

export class ValidationError extends AppError{
    constructor(zodErr: ZodError){
        super(z.prettifyError(zodErr), 400, "VAL_ERROR");
    }
}