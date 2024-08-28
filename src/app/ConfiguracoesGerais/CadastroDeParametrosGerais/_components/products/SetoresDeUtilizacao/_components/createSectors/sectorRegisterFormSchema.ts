import { z } from "zod";

export const createSectorFormSchema = z.object({
  descricao: z
    .string()
    .min(3, {
      message: "Nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Nome deve ter no máximo 60 caracteres.",
    }),
});

export type CreateSectorFormValues = z.infer<typeof createSectorFormSchema>;
