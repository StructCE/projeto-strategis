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

  modules: z
    .array(
      z.string(),
      // .transform((val) => Number(val))
      // .refine((val) => !isNaN(val)),
    )
    .optional(),
});

export type EditAccessProfileFormValues = z.infer<
  typeof editAccessProfileFormSchema
>;
