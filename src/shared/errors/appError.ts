import { ErrorCode } from "../../utils/errorCodes";

export abstract class AppError extends Error{
    
    public readonly message:string;
    public readonly statusCode: number;
    public readonly internalCode: string | undefined;

    constructor(message: string, statusCode: number, internalCode:ErrorCode|undefined){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        if(internalCode) this.internalCode = internalCode;
    }    
}