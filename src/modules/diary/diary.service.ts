import { randomUUID } from "node:crypto";
import { Diary } from "./diary.model";
import { DiaryRepository } from "./diary.repository"
import { createDiaryInput } from "./diary.schema"
import { NotFoundError } from "../../shared/errors/notFound";
import { AppError } from "../../shared/errors/app.error";

export class DiaryService{
    private readonly diaryRepository: DiaryRepository;
    
    
    constructor (diaryRepository: DiaryRepository){
        this.diaryRepository = diaryRepository;
    }

    async create(input: createDiaryInput, creatorId: string): Promise<string|null>{
        const diary: Diary = {
            id: randomUUID(),
            creatorId: creatorId,
            content: input.content,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await this.diaryRepository.save(diary); //Por que no retorna si la operacion salio bien o no?
        return diary.id;
    }

    async findAll(): Promise<Diary[]>{
        return this.diaryRepository.findAll();
    }

    async findById(id: string): Promise<Diary | null>{
        const diary = await this.diaryRepository.findById(id);

        if(!diary){
            throw new NotFoundError("Diary");
        }

        return diary;

    }

    //find by user id

    async update(id:string, content: string, userId: string): Promise<void>{
        const existing = await this.diaryRepository.findById(id);

        if(!existing){
            throw new NotFoundError("Diary");
        }

        if(existing.creatorId !== userId){
            throw new AppError("You dont have permission", 401, "UNAUTHORIZED");
        }

        const updated: Diary = {
            ...existing,
            content,
            updatedAt: new Date()
        };

        return this.diaryRepository.update(updated);

    }

    async deleteById(id: string, userId: string): Promise<void>{
        const existing = await this.diaryRepository.findById(id);

        if(!existing){
            throw new NotFoundError("Diary");
        }

        if(existing.creatorId !== userId){
            throw new AppError("You dont have permission", 401, "UNAUTHORIZED");
        }

        return this.diaryRepository.deleteById(id);
    }
}