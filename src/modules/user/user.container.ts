//import { UserRepositoryLocal } from './db/user.repo.local';
import { Router } from 'express';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { createUserRouter } from './user.routes';
import { UserRepositoryMongo } from './db/user.repo.mongo';

export const createUserModule = (): Router =>{
    //const userRepository = new UserRepositoryLocal();
    const userRepository = new UserRepositoryMongo();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    return createUserRouter(userController);
}