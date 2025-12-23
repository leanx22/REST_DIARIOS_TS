import { Collection } from "mongodb";
import {connectMongo } from "../../config/mongo"
import { Diary } from "./diary.model"
import { DiaryRepository } from "./diary.repository"
import { DiaryDocument } from "./diary.mongo"

export class MongoDiaryRepository implements DiaryRepository{
    
    private collection!: Collection<DiaryDocument> //No comprendo

    private async getCollection(): Promise<Collection<DiaryDocument>>{ //no entiendo
        if(!this.collection){
            const db = await connectMongo();
            this.collection = db.collection<DiaryDocument>("diaries");
        }
        return this.collection;
    }

    private toDomain(doc: DiaryDocument): Diary{
        return{
            id: doc.id,
            content: doc.content,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        }
    }

    async save(diary: Diary): Promise<void> {
        const collection = await this.getCollection();
        await collection.insertOne({
            _id: undefined as any, //No comprendo el por que
            id: diary.id,
            content: diary.content,
            createdAt: diary.createdAt,
            updatedAt: diary.updatedAt
        });
    }

    async findById(id: string): Promise<Diary | null> {
        const collection = await this.getCollection();

        const doc = await collection.findOne({id}); //por que {id} y no {id:id}
        if(!doc){
            return null;
        }
        return this.toDomain(doc); //Se podria hacer mas facil sin necesidad de una funcion, tal vez omit o algo asi.
    }

    async findAll(): Promise<Diary[]> {
        const collection = await this.getCollection();
        const res = await collection.find({}).toArray();
        return res.map(this.toDomain);
    }

    async update(diary: Diary): Promise<void> {
        const collection = await this.getCollection();

        await collection.updateOne(
            {id: diary.id},
            {
                $set:{
                    content: diary.content,
                    updatedAt: diary.updatedAt
                }
            }
        );
    }

    async deleteById(id: string): Promise<void> {
        const collection = await this.getCollection();
        await collection.deleteOne({id});
    }

}



