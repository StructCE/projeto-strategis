import { z } from "zod";

export const editUserFormSchema = z
  .object({
    email: z
      .string({
        required_error: "Por favor digite um email.",
      })
      .email({
        message: "Email inválido.",
      }),
    password: z
      .string({
        required_error: "Por favor digite uma senha.",
      })
      .min(8, {
        message: "A senha deve ter pelo menos 8 caracteres.",
      })
      .max(128, {
        message: "A senha deve ter no máximo 128 caracteres.",
      }),
    passwordConfirmation: z.string({
      required_error: "Por favor confirme a senha.",
    }),
    username: z
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
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem.",
    path: ["password_confirmation"],
  });

export type EditUserFormValues = z.infer<typeof editUserFormSchema>;
