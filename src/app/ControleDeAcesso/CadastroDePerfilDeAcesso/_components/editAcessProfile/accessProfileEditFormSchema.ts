import { z } from "zod";

export const editAccessProfileFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Nome deve ter no máximo 60 caracteres.",
    }),
  // modules: z.array(z.string()).optional(), // Ver como fazer funcionar o multiselect com o zod
});

export type EditAccessProfileFormValues = z.infer<
  typeof editAccessProfileFormSchema
>;
