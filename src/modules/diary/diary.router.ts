import { Router } from "express";
import { DiaryController } from './diary.controller'

export const createDiaryRouter = (controller: DiaryController): Router => {
    const router = Router();

    router.post('/', controller.create);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findById);
    router.put('/:id', controller.updateById);
    router.delete('/:id', controller.deleteById);

    return router;
};





