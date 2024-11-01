import { z } from "zod";

export const editReasonFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Descrição deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Descrição deve ter no máximo 60 caracteres.",
    }),
});

export type EditReasonFormValues = z.infer<typeof editReasonFormSchema>;
