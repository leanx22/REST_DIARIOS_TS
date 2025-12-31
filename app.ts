import express from "express";
import { createDiaryModule } from "./src/modules/diary/diary.container";
import { errorHandler } from "./src/shared/middleware/errorHandlerMiddleware";
import { createUserModule } from "./src/modules/user/user.container";


const app = express();

app.use(express.json());


app.use("/diaries", createDiaryModule());
app.use('/users', createUserModule());

app.use(errorHandler);

export default app;