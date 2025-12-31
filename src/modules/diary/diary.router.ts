import { Router } from "express";
import { DiaryController } from './diary.controller'
import { ensureAuth } from "../../shared/middleware/authenticationMiddleware";

export const createDiaryRouter = (controller: DiaryController): Router => {
    const router = Router();

    router.post('/', ensureAuth,controller.create);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findById);
    router.put('/:id', ensureAuth,controller.updateById);
    router.delete('/:id', ensureAuth,controller.deleteById);

    return router;
};





