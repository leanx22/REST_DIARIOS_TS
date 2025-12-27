import { randomUUID } from "node:crypto";
import { AppError } from "../../shared/errors/app.error";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import bcrypt from 'bcrypt';
import { UserDTO } from "./user.dto";

export class UserService{
    
    private userRepository: UserRepository;

    constructor(userRepo: UserRepository){
        this.userRepository = userRepo;
    }

    async register(email: string, password: string):Promise<UserDTO>{

        const existingUser = await this.userRepository.findByEmail(email);

        if(existingUser){
            throw new AppError("Registration failed", 400, "ALREADY_EXISTS");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user: User = {
            id: randomUUID(),
            email,
            passwordHash,
            createdAt: new Date()
        };

        const newUser = await this.userRepository.create(user);
        
        if(!newUser){
            throw new AppError("Unable to register", 500, "DB_ERROR");    
        }

        return {id:newUser.id, email:newUser.email}
        
    }

}