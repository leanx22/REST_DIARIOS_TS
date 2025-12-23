import { Diary } from "./diary.model";

export interface DiaryRepository{
    save(diary: Diary): Promise<void>;
    findById(id: string): Promise<Diary|null>;
    findAll(): Promise<Diary[]>;
    update(diary: Diary): Promise<void>;
    deleteById(id: string): Promise<void>;
}



