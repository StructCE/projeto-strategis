import { z } from "zod";

export const editUserFormSchema = z.object({
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

  UserRole: z
    .array(
      z.object({
        companyId: z.string({
          required_error: "Por favor selecione uma empresa.",
        }),
        roleId: z.string({
          required_error: "Por favor selecione um cargo.",
        }),
      }),
    )
    .min(1, {
      message: "É necessário selecionar ao menos uma empresa e cargo.",
    }),
});

export type EditUserFormValues = z.infer<typeof editUserFormSchema>;
