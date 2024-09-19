import { z } from "zod";

export const createReasonFormSchema = z.object({
  description: z
    .string()
    .min(3, {
      message: "Descrição deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Descrição deve ter no máximo 60 caracteres.",
    }),
});

export type CreateReasonFormValues = z.infer<typeof createReasonFormSchema>;
