import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
    email: z.string().email({ message: "E-mail invalido" }).toLowerCase(),
    password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
})