//Representación de un diary en mongo, NO es el modelo!
import { ObjectId } from "mongodb";

export interface DiaryDocument{
    _id: ObjectId,
    id: string,
    content: string,
    createdAt: Date,
    updatedAt: Date
}
