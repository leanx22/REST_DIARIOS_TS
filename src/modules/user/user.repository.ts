import { User } from "./user.model";

export interface UserRepository{
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}


