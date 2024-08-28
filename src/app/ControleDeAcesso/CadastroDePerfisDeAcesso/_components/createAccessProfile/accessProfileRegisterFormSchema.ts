import { z } from "zod";

export const createAccessProfileFormSchema = z.object({
  nome: z
    .string()
    .min(3, {
      message: "Nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Nome deve ter no máximo 60 caracteres.",
    }),
  modulos: z.array(z.string()).optional(), // Ver como fazer funcionar o multiselect com o zod
});

export type CreateAccessProfileFormValues = z.infer<
  typeof createAccessProfileFormSchema
>;
