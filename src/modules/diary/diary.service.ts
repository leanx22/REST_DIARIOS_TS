import { randomUUID } from "node:crypto";
import { Diary } from "./diary.model";
import { DiaryRepository } from "./diary.repository"
import { createDiaryInput } from "./diary.schema"
import { NotFoundError } from "../../shared/errors/instance/notFound";
import { ServerError } from "../../shared/errors/internal/serverError";
import { AuthorizationError } from "../../shared/errors/auth/authorizationError";

export class DiaryService{
    private readonly diaryRepository: DiaryRepository;
    
    
    constructor (diaryRepository: DiaryRepository){
        this.diaryRepository = diaryRepository;
    }

    async create(input: createDiaryInput, creatorId: string): Promise<Diary>{
        const diary: Diary = {
            id: randomUUID(),
            creatorId: creatorId,
            content: input.content,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const isSaved = await this.diaryRepository.save(diary);
        if(!isSaved){
            throw new ServerError("Persistance error: Cant create a diary");
        }
        return diary;
    }

    async findAll(): Promise<Diary[]>{
        return this.diaryRepository.findAll();
    }

    async findById(id: string): Promise<Diary>{
        const diary = await this.diaryRepository.findById(id);

        if(!diary){
            throw new NotFoundError("Diary");
        }

        return diary;
    }

    //find by user id

    async update(id:string, content: string, userId: string): Promise<Diary>{
        const existing = await this.diaryRepository.findById(id);

        if(!existing){
            throw new NotFoundError("Diary");
        }

        if(existing.creatorId !== userId){
            throw new AuthorizationError("You cant perform this action!");
        }

        const updated: Diary = {
            ...existing,
            content,
            updatedAt: new Date()
        };

        const updateOk = this.diaryRepository.update(updated);
        
        if(!updateOk){
            throw new ServerError("Cant update resource.");
        }

        return updated;
    }

    async deleteById(id: string, userId: string): Promise<void>{
        const existing = await this.diaryRepository.findById(id);

        if(!existing){
            throw new NotFoundError("Diary");
        }

        if(existing.creatorId !== userId){
            throw new AuthorizationError("You dont have permission");
        }

        const deleteOk = this.diaryRepository.deleteById(id);
        if(!deleteOk){
            throw new ServerError("Cant delete resource.");
        }
        
    }
}