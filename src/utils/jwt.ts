import jwt from 'jsonwebtoken';
import 'dotenv/config';

export interface UserPayload {
    id: string;
    email: string;
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const signToken = (payload: UserPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h',
        algorithm: 'HS256'
    });
};



