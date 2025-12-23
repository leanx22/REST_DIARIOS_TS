import z from "zod";

export type createDiaryInput = z.infer<typeof createDiarySchema>; //No lo comprendo bien
export type updateDiaryInput = z.infer<typeof updateDiarySchema>; //No lo comprendo bien

export const createDiarySchema = z.object({
    content: z.string().min(1, "El contenido no puede estar vacío!").max(10_000, "El contenido es muy largo!")
});

export const updateDiarySchema = z.object({
    content: z.string().min(1, "El contenido no puede estar vacío!").max(10_000, "El contenido es muy largo!")
});

export const diaryIdSchema = z.object({
  id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    "UUID incorrecto!"
  )
});

