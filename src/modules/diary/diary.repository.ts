import { Diary } from "./diary.model";

export interface DiaryRepository{
    save(diary: Diary): Promise<boolean>;
    findById(id: string): Promise<Diary|null>;
    findAll(): Promise<Diary[]>;
    update(diary: Diary): Promise<boolean>;
    deleteById(id: string): Promise<boolean>;
}



