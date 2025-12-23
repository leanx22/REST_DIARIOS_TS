import express from "express";
import { createDiaryModule } from "./src/modules/diary/diary.container";


const app = express();

app.use(express.json());

app.use("/diaries", createDiaryModule());

export default app;