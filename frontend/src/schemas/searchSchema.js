import { z } from "zod";

export const searchSchema = z.object({
    title: z
    .string()
    .nonempty({ message: "Campo obrigatório" })
    .refine((value) => !/^\s*$/.test(value),{ 
        message: "Campo obrigatório",
    })
})