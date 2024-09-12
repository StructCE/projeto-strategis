import { z } from "zod";

export const stockFormSchema = z.object({
  name: z
    .string({
      required_error: "Por favor digite o nome do estoque",
    })
    .min(2, { message: "O nome do estoque deve ter pelomenos 2 caracteres" })
    .max(32, { message: "O estoque deve possuir menos de 30 caracteres" }),
  code: z
    .string({
      required_error: "Por favor digite o código",
    })
    .min(3, { message: "O código deve possuir pelomentos 3 caracteres" })
    .max(10, { message: "O código deve possuir menos de 30 caracteres" }),
});
