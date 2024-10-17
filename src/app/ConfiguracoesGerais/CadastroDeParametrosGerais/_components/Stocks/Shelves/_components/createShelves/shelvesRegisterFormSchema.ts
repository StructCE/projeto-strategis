import { z } from "zod";

export const createShelfFormSchema = z.object({
  cabinetId: z.string({
    required_error: "Por favor selecione um armário/zona.",
  }),
  name: z
    .string()
    .min(1, {
      message: "Descrição/nome deve ter pelo menos 1 caractere.",
    })
    .max(30, {
      message: "Descrição/nome deve ter no máximo 30 caracteres.",
    }),
});

export type CreateShelfFormValues = z.infer<typeof createShelfFormSchema>;
