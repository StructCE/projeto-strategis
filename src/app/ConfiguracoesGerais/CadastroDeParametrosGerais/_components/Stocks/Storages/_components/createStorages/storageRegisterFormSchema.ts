import { z } from "zod";

export const createStorageFormSchema = z.object({
  place: z.string({
    required_error: "Por favor selecione um local.",
  }),
  description: z
    .string()
    .min(3, {
      message: "Descrição/nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Descrição/nome deve ter no máximo 60 caracteres.",
    }),
});

export type CreateStorageFormValues = z.infer<typeof createStorageFormSchema>;
