import { z } from "zod";

export const createUserFormSchema = z.object({
  email: z
    .string({
      required_error: "Por favor digite um email.",
    })
    .email({
      message: "Email inválido.",
    }),

  name: z
    .string()
    .min(3, {
      message: "Nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Nome deve ter no máximo 60 caracteres.",
    }),

  phone: z
    .string()
    .min(8, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
    })
    .max(16, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
    })
    .optional(),

  company: z.string({
    required_error: "Por favor selecione uma empresa.",
  }),

  role: z.string({
    required_error: "Por favor selecione um cargo.",
  }),
});

export type CreateUserFormValues = z.infer<typeof createUserFormSchema>;
