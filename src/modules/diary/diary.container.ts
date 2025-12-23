import { MongoDiaryRepository } from './diary.repository.imp'
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { createDiaryRouter } from './diary.router';
import { Router } from 'express';

export const createDiaryModule = (): Router =>{
    const diaryRepository = new MongoDiaryRepository();
    const diaryService = new DiaryService(diaryRepository);
    const diaryController = new DiaryController(diaryService);

    return createDiaryRouter(diaryController);
}