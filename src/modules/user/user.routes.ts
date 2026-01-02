import { Router } from "express";
import { UserController } from "./user.controller";

export const createUserRouter = (controller: UserController): Router => {
    const router = Router();

    /**
     * @swagger
     * /users/register:
     *   post:
     *     summary: Create a new user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 example: user@email.com
     *               password:
     *                 type: string
     *                 example: password123
     *     responses:
     *       201:
     *         description: User registered successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   example: e03b96f9-865b-44bd-bbf1-cd797b9e1276
     *                 email:
     *                   type: string
     *                   example: user@email.com
     *                 token:
     *                   type: string
     *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
     *                   example: ALREADY_EXISTS
     *                 message:
     *                   type: string
     *                   example: Registration failed
     */
    router.post('/register', controller.register);

    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: User login
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 example: user@email.com
     *               password:
     *                 type: string
     *                 example: password123
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   example: e03b96f9-865b-44bd-bbf1-cd797b9e1276
     *                 email:
     *                   type: string
     *                   example: user@email.com
     *                 token:
     *                   type: string
     *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     *       401:
     *         description: Bad credentials, not found.
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
     *                   example: The information entered does not correspond to an active user
     */
    router.post('/login', controller.login);

    return router;
};
