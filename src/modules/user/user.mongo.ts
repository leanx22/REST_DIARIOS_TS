import { ObjectId } from "mongodb";

export interface UserDocument{
    _id: ObjectId,
    id: string
    email: string
    password: string,
    createdAt: Date,
}
