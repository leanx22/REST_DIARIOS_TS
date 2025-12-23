import { randomUUID } from "node:crypto";
import { Diary } from "./diary.model";
import { DiaryRepository } from "./diary.repository"
import { createDiaryInput } from "./diary.schema"

export class DiaryService{
    private readonly diaryRepository: DiaryRepository;
    
    
    constructor (diaryRepository: DiaryRepository){
        this.diaryRepository = diaryRepository;
    }

    async create(input: createDiaryInput): Promise<string|null>{
        const diary: Diary = {
            id: randomUUID(),
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
        return this.diaryRepository.findById(id); //Por que no valido que sea un id correcto?
    }

    async update(id:string, content: string): Promise<void>{
        const existing = await this.diaryRepository.findById(id);

        if(!existing){
            throw new Error("No existe el diario que se intenta eliminar.");
        }

        const updated: Diary = {
            ...existing,
            content,
            updatedAt: new Date()
        };

        return this.diaryRepository.update(updated);

    }

    async deleteById(id: string): Promise<void>{
        const existing = await this.diaryRepository.findById(id);

        if(!existing){
            throw new Error("No existe el diario que se intenta eliminar.");
        }

        return this.diaryRepository.deleteById(id);
    }
}