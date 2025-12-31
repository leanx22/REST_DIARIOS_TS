export class ServerError extends Error{
    public readonly message;

    constructor(message: string){
        super();
        this.message = message;
    }
}