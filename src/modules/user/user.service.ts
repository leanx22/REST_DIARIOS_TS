import { randomUUID } from "node:crypto";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import bcrypt from 'bcrypt';
import { AuthResponse } from "../auth/authResponse.dto";
import { signToken } from "../../utils/jwt";
import { AuthenticationError } from "../../shared/errors/auth/authenticationError";
import { AlreadyExistsError } from "../../shared/errors/resource/alreadyExists";
import { ServerError } from "../../shared/errors/internal/serverError";


export class UserService{
    
    private userRepository: UserRepository;

    constructor(userRepo: UserRepository){
        this.userRepository = userRepo;
    }

    async register(email: string, password: string):Promise<AuthResponse>{

        const existingUser = await this.userRepository.findByEmail(email);

        if(existingUser){
            throw new AlreadyExistsError('User');
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
            throw new ServerError("Cant be created");    
        }

        const token = signToken({
            id: newUser.id,
            email: newUser.email
        });

        return {id:newUser.id, email:newUser.email, token: token};
        
    }

    async login(email: string, password: string): Promise<AuthResponse>{
        const loginErrorMessage = "The information entered does not correspond to an active user";

        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new AuthenticationError(loginErrorMessage);
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if(!isPasswordValid){
            throw new AuthenticationError(loginErrorMessage);
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