import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
    email: z.string().email({ message: "E-mail invalido" }).toLowerCase(),
    password: z.string().min(4, { message: "Senha deve ter no mínimo 4 caracteres" }),
    confirmPassword: z.string().min(4, { message: "Senha deve ter no mínimo 4 caracteres" }),
    recoveryQuestion: z.object({
        question: z.string().min(3, { message: "Pergunta deve ter no mínimo 3 caracteres" }),
        answer: z.string().min(3, { message: "Resposta deve ter no mínimo 3 caracteres" }),
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
});