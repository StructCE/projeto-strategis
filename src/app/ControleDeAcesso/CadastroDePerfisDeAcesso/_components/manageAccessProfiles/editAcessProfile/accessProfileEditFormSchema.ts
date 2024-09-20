import { z } from "zod";

const ModuleSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const editAccessProfileFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Nome deve ter no máximo 60 caracteres.",
    }),
  modules: z.array(ModuleSchema).optional(), // Ver como fazer funcionar o multiselect com o zod
});

export type EditAccessProfileFormValues = z.infer<
  typeof editAccessProfileFormSchema
>;
