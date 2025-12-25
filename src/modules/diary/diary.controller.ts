import { NextFunction, Request, Response } from "express";
import {DiaryService} from "./diary.service"
import { createDiarySchema, diaryIdSchema, updateDiarySchema } from "./diary.schema";
import { ValidationError } from "../../shared/errors/validationError";
import { AppError } from "../../shared/errors/app.error";

export class DiaryController{

    private readonly diaryService: DiaryService

    constructor (diaryService: DiaryService){
        this.diaryService = diaryService;
    }

    create = async (req: Request, res: Response, _next: NextFunction)=>{
        const parsed = createDiarySchema.safeParse(req.body);

        if(parsed.error){
            throw new ValidationError(parsed.error);
        }

        const result = await this.diaryService.create(parsed.data);

        if(result){
            return res.status(201).json({resource:result});
        }else{
            throw new AppError("Unable to create", 500, "APP_ERR");
        }
        
    }

    findAll = async (_req: Request, res: Response)=>{
        const diaries = await this.diaryService.findAll();
        return res.json(diaries); //ver bien que hace exactamente el metodo json
    }

    findById = async (req: Request, res: Response, _next: NextFunction)=>{
        const parsed = diaryIdSchema.safeParse(req.params);

        if(parsed.error){
            throw new ValidationError(parsed.error);
        }

        const diary = await this.diaryService.findById(parsed.data.id);
        
        return res.json(diary);
    }

    deleteById = async (req: Request, res: Response, _next: NextFunction)=>{
        const parsed = diaryIdSchema.safeParse(req.params);

        if(parsed.error){
            throw new ValidationError(parsed.error);
        }

        await this.diaryService.deleteById(parsed.data.id);
        return res.status(200).end();
    }

    updateById = async (req: Request, res: Response, _next: NextFunction)=>{
        const paramsParsed = diaryIdSchema.safeParse(req.params);

        if(paramsParsed.error){
            throw new ValidationError(paramsParsed.error);
        }

        const bodyParsed = updateDiarySchema.safeParse(req.body);
        if(bodyParsed.error){
            throw new ValidationError(bodyParsed.error);
        }

        await this.diaryService.update(paramsParsed.data.id, bodyParsed.data.content);
        return res.status(204).end();
    }

}