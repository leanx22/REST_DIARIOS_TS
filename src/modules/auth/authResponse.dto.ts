import { UserDTO } from "../user/user.dto";

export interface AuthResponse extends UserDTO{
    token: string;
}