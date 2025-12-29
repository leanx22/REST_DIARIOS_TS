import { randomUUID } from "node:crypto";
import { AppError } from "../../shared/errors/app.error";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import bcrypt from 'bcrypt';
import { AuthResponse } from "../auth/authResponse.dto";
import { signToken } from "../../utils/jwt";
import { AuthError } from "../../shared/errors/authError";


export class UserService{
    
    private userRepository: UserRepository;

    constructor(userRepo: UserRepository){
        this.userRepository = userRepo;
    }

    async register(email: string, password: string):Promise<AuthResponse>{

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

        const token = signToken({
            id: newUser.id,
            email: newUser.email
        });

        return {id:newUser.id, email:newUser.email, token: token};
        
    }

    async login(email: string, password: string): Promise<AuthResponse>{
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new AuthError();
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if(!isPasswordValid){
            throw new AuthError();
        }

        const token = signToken({
            id: user.id,
            email: user.email
        });

        return {
            id: user.id,
            email: user.email,
            token: token
        }
    }

}