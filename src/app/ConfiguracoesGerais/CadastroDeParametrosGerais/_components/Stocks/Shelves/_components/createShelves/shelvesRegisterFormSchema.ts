import { z } from "zod";

export const createShelfFormSchema = z.object({
  local: z.string({
    required_error: "Por favor selecione um local.",
  }),
  armarioZona: z.string({
    required_error: "Por favor selecione um armário/zona.",
  }),
  descricao: z
    .string()
    .min(3, {
      message: "Descrição/nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Descrição/nome deve ter no máximo 60 caracteres.",
    }),
});

export type CreateShelfFormValues = z.infer<typeof createShelfFormSchema>;
