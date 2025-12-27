import { UserRepository } from "../user.repository";
import { User } from "../user.model";

export class UserRepositoryLocal implements UserRepository{

    private users: User[] = [];

    async findByEmail(email: string): Promise<User|null> {
        return this.users.find(u=>u.email === email) ?? null;
    }

    async create(user: User): Promise<User>{
        this.users.push(user);
        return user;
    }


}