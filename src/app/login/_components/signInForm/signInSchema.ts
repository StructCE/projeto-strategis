import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Deu error" }) // falta combinar os erros da autenticação.
    .max(256),
});
