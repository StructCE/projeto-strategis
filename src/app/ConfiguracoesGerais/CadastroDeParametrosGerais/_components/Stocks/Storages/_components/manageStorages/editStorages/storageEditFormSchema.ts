import { z } from "zod";

export const editStorageFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Descrição/nome deve ter pelo menos 2 caracteres.",
    })
    .max(40, {
      message: "Descrição/nome deve ter no máximo 40 caracteres.",
    }),
});

export type EditStorageFormValues = z.infer<typeof editStorageFormSchema>;
