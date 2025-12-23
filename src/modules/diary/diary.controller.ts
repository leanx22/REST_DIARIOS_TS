import { Request, Response } from "express";
import {DiaryService} from "./diary.service"
import { createDiarySchema, diaryIdSchema, updateDiarySchema } from "./diary.schema";

export class DiaryController{

    private readonly diaryService: DiaryService

    constructor (diaryService: DiaryService){
        this.diaryService = diaryService;
    }

    create = async (req: Request, res: Response)=>{
        const parsed = createDiarySchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({message: parsed.error});
        }

        const result = await this.diaryService.create(parsed.data);

        if(result){
            return res.status(201).json({resource:result});
        }else{
            return res.status(400).json({message:"No se pudo crear!"});
        }
        
    }

    findAll = async (_req: Request, res: Response)=>{
        const diaries = await this.diaryService.findAll();
        return res.json(diaries); //ver bien que hace exactamente el metodo json
    }

    findById = async (req: Request, res: Response)=>{
        const parsed = diaryIdSchema.safeParse(req.params);

        if(!parsed.success){
            return res.status(400).json({message: parsed.error.message});
        }

        const diary = await this.diaryService.findById(parsed.data.id);

        if(!diary){
            return res.status(404).json({message: "No se encontró el diario."});
        }

        return res.json(diary);
    }

    deleteById = async (req: Request, res: Response)=>{
        const parsed = diaryIdSchema.safeParse(req.params);

        if(!parsed.success){
            return res.status(400).json({message: parsed.error.message});
        }

        try{
            await this.diaryService.deleteById(parsed.data.id);
            return res.status(200).end();
        }catch(err: any){
            return res.status(404).json({message: `No se pudo eliminar: ${err.message}`});
        }

    }

    updateById = async (req: Request, res: Response)=>{
        const paramsParsed = diaryIdSchema.safeParse(req.params);
        if(!paramsParsed.success){
            return res.status(400).json({message: paramsParsed.error.message});
        }

        const bodyParsed = updateDiarySchema.safeParse(req.body);
        if(!bodyParsed.success){
            return res.status(400).json({message: bodyParsed.error.message});
        }

        try{

            await this.diaryService.update(paramsParsed.data.id, bodyParsed.data.content);
            return res.status(204).end();

        }catch(err: any){
            return res.status(404).json({message: `No se pudo modificar: ${err.message}`});
        }
    }

}