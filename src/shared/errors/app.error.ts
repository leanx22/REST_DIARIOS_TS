
export class AppError extends Error{
    public readonly message:string;
    public readonly statusCode: number;
    public readonly code: string | undefined;

    constructor(message: string, statusCode: number, code:string|undefined){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        if(code) this.code = code;
    }

    
}