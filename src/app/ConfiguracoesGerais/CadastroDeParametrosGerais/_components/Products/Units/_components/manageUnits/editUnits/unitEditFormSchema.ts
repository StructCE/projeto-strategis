import { z } from "zod";

export const editUnitFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Descrição/nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Descrição/nome deve ter no máximo 60 caracteres.",
    }),

  abbreviation: z.string().max(6, {
    message: "Sigla deve ter no máximo 6 caracteres.",
  }),

  unitsPerPack: z.number().default(1),
});

export type EditUnitFormValues = z.infer<typeof editUnitFormSchema>;
