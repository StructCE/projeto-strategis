import { z } from "zod";

export const createShelfFormSchema = z.object({
  cabinetId: z.string({
    required_error: "Por favor selecione um armário/zona.",
  }),
  name: z
    .string()
    .min(3, {
      message: "Descrição/nome deve ter pelo menos 1 caractere.",
    })
    .max(60, {
      message: "Descrição/nome deve ter no máximo 60 caracteres.",
    }),
});

export type CreateShelfFormValues = z.infer<typeof createShelfFormSchema>;
