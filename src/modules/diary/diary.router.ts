import { Router } from "express";
import { DiaryController } from './diary.controller'
import { ensureAuth } from "../../shared/middleware/authenticationMiddleware";

export const createDiaryRouter = (controller: DiaryController): Router => {
    const router = Router();

    /**
     * @swagger
     * /diaries:
     *   post:
     *     summary: Creates a new diary entry.
     *     tags: [Diaries]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - content
     *             properties:
     *               content:
     *                 type: string
     *                 example: My first diary
     *     responses:
     *       201:
     *         description: Entry created successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                   id:
     *                     type: string
     *                     example: 47387699-e2da-4ab8-8dc0-50ff5f76844e
     *                   creatorId:
     *                     type: string
     *                     example: 0494db56-07f3-4048-b569-0acac9f33f60
     *                   content:
     *                     type: string
     *                     example: My first diary
     *                   createdAt:
     *                     type: date
     *                     example: 2026-01-02T20:49:13.223Z
     *                   updatedAt:
     *                     type: date
     *                     example: 2026-01-02T20:49:13.223Z  
     *       401:
     *         description: Unauthorized.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: error
     *                 errorCode:
     *                   type: string
     *                   example: AUTHENTICATION_ERROR
     *                 message:
     *                   type: string
     *                   example: Invalid or expired token
     *       400:
     *         description: Bad request.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: error
     *                 errorCode:
     *                   type: string
     *                   example: VALIDATION_FAILED
     *                 message:
     *                   type: string
     *                   example: Invalid input; expected foo, received bar -> at field
     */
    router.post('/', ensureAuth, controller.create);

    /**
     * @swagger
     * /diaries:
     *   get:
     *     summary: Get all diary entries.
     *     tags: [Diaries]
     *     responses:
     *       200:
     *         description: Diary entries were found successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     example: 47387699-e2da-4ab8-8dc0-50ff5f76844e
     *                   creatorId:
     *                     type: string
     *                     example: 39c5db61-047f-4766-80d8-97ac199222ea
     *                   content:
     *                     type: string
     *                     example: Today was a great day!    
     *                   createdAt:
     *                     type: string
     *                     example: 2026-01-02T20:49:13.223Z           
     *                   updatedAt:
     *                     type: string
     *                     example: 2026-01-02T20:49:13.223Z
     */
    router.get('/', controller.findAll);

    /**
     * @swagger
     * /diaries/{id}:
     *   get:
     *     summary: Get a diary entry by ID.
     *     tags: [Diaries]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Diary ID.
     *     responses:
     *       200:
     *         description: Diary entry found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                   id:
     *                     type: string
     *                     example: 47387699-e2da-4ab8-8dc0-50ff5f76844e
     *                   creatorId:
     *                     type: string
     *                     example: 0494db56-07f3-4048-b569-0acac9f33f60
     *                   content:
     *                     type: string
     *                     example: Today was a great day!
     *                   createdAt:
     *                     type: date
     *                     example: 2026-01-02T20:49:13.223Z
     *                   updatedAt:
     *                     type: date
     *                     example: 2026-01-02T20:49:13.223Z  
     *       404:
     *         description: Diary entry not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: error
     *                 errorCode:
     *                   type: string
     *                   example: NOT_FOUND
     *                 message:
     *                   type: string
     *                   example: Diary not found
     *       400:
     *         description: Bad request.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: error
     *                 errorCode:
     *                   type: string
     *                   example: VALIDATION_FAILED
     *                 message:
     *                   type: string
     *                   example: Invalid UUID -> at id                
     */
    router.get('/:id', controller.findById);

    /**
     * @swagger
     * /diaries/{id}:
     *   put:
     *     summary: Updates an existing diary
     *     tags: [Diaries]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Diary ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               content:
     *                 type: string
     *                 example: Today is a sad day
     *     responses:
     *       200:
     *         description: Resource updated.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                   id:
     *                     type: string
     *                     example: 47387699-e2da-4ab8-8dc0-50ff5f76844e
     *                   creatorId:
     *                     type: string
     *                     example: 0494db56-07f3-4048-b569-0acac9f33f60
     *                   content:
     *                     type: string
     *                     example: Today is a sad day
     *                   createdAt:
     *                     type: date
     *                     example: 2026-01-02T20:49:13.223Z
     *                   updatedAt:
     *                     type: date
     *                     example: 2026-01-02T20:58:31.163Z
     *       401:
     *         description: Unauthorized.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: error
     *                 errorCode:
     *                   type: string
     *                   example: AUTHENTICATION_ERROR
     *                 message:
     *                   type: string
     *                   example: Invalid or expired token
     *       404:
     *         description: Diary entry not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: error
     *                 errorCode:
     *                   type: string
     *                   example: NOT_FOUND
     *                 message:
     *                   type: string
     *                   example: Diary not found
     */
    router.put('/:id', ensureAuth, controller.updateById);

    /**
     * @swagger
     * /diaries/{id}:
     *   delete:
     *     summary: Delete a diary entry.
     *     tags: [Diaries]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Diary ID
     *     responses:
     *       204:
     *         description: Deleted successfully.
     *       401:
     *         description: Unauthorized.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: error
     *                 errorCode:
     *                   type: string
     *                   example: AUTHENTICATION_ERROR
     *                 message:
     *                   type: string
     *                   example: Invalid or expired token
     *       404:
     *         description: Diary entry not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: error
     *                 errorCode:
     *                   type: string
     *                   example: NOT_FOUND
     *                 message:
     *                   type: string
     *                   example: Diary not found
     */
    router.delete('/:id', ensureAuth, controller.deleteById);

    return router;
};





