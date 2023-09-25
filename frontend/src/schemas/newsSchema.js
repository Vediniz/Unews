import { z } from "zod";

export const newsSchema = z.object({
    title: z
    .string()
    .nonempty({ message: "Campo obrigatório" }),
    text: z
    .string()
    .nonempty({ message: "Campo obrigatório" }),
    image: z
    .string()
    .nonempty({ message: "Campo obrigatório" }),
})
    