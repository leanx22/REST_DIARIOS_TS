import { Collection } from "mongodb";
import {connectMongo } from "../../config/mongo"
import { Diary } from "./diary.model"
import { DiaryRepository } from "./diary.repository"
import { DiaryDocument } from "./diary.mongo"

export class MongoDiaryRepository implements DiaryRepository{
    
    private collection!: Collection<DiaryDocument>

    private async getCollection(): Promise<Collection<DiaryDocument>>{
        if(!this.collection){
            const db = await connectMongo();
            this.collection = db.collection<DiaryDocument>("diaries");
        }
        return this.collection;
    }

    private toDiary(doc: DiaryDocument): Diary{
        return{
            id: doc.id,
            creatorId: doc.creatorId,
            content: doc.content,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        }
    }

    async save(diary: Diary): Promise<boolean> {
        const collection = await this.getCollection();
        const result = await collection.insertOne({
            _id: undefined as any,
            id: diary.id,
            creatorId: diary.creatorId,
            content: diary.content,
            createdAt: diary.createdAt,
            updatedAt: diary.updatedAt
        });

        return result.acknowledged;
    }

    async findById(id: string): Promise<Diary | null> {
        const collection = await this.getCollection();

        const doc = await collection.findOne({id});
        if(!doc){
            return null;
        }
        return this.toDiary(doc);
    }

    async findAll(): Promise<Diary[]> {
        const collection = await this.getCollection();
        const res = await collection.find({}).toArray();
        return res.map(doc=>this.toDiary(doc));
    }

    async update(diary: Diary): Promise<boolean> {
        const collection = await this.getCollection();

        const updateResult = await collection.updateOne(
            {id: diary.id},
            {
                $set:{
                    content: diary.content,
                    updatedAt: diary.updatedAt
                }
            }
        );
        
        return updateResult.acknowledged;
    }

    async deleteById(id: string): Promise<boolean> {
        const collection = await this.getCollection();
        const deleteResult = await collection.deleteOne({id});
        return deleteResult.acknowledged;
    }

}



