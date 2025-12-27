import z from "zod";

export const createUserChema = z.object({
    email: z.email({error: "Invalid email"}),
    password: z.string().min(8, "Password must be at least 8 chars long")
});


