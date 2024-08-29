import { z } from "zod";

export const editStorageFormSchema = z.object({
  local: z.string({
    required_error: "Por favor selecione um local.",
  }),
  descricao: z
    .string()
    .min(3, {
      message: "Nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Nome deve ter no máximo 60 caracteres.",
    }),
});

export type EditStorageFormValues = z.infer<typeof editStorageFormSchema>;
