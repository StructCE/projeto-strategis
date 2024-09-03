import { z } from "zod";

export const editProductFormSchema = z
  .object({
    email: z
      .string({
        required_error: "Por favor digite um email.",
      })
      .email({
        message: "Email inválido.",
      }),
    senha: z
      .string({
        required_error: "Por favor digite uma senha.",
      })
      .min(8, {
        message: "A senha deve ter pelo menos 8 caracteres.",
      })
      .max(128, {
        message: "A senha deve ter no máximo 128 caracteres.",
      }),
    senhaConfirmacao: z.string({
      required_error: "Por favor confirme a senha.",
    }),
    nome: z
      .string()
      .min(3, {
        message: "Nome deve ter pelo menos 3 caracteres.",
      })
      .max(60, {
        message: "Nome deve ter no máximo 60 caracteres.",
      }),
    telefone: z
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
    empresa: z.string({
      required_error: "Por favor selecione uma empresa.",
    }),
    cargo: z.string({
      required_error: "Por favor selecione um cargo.",
    }),
  })
  .refine((data) => data.senha === data.senhaConfirmacao, {
    message: "As senhas não coincidem.",
    path: ["password_confirmation"],
  });

export type EditProductFormValues = z.infer<typeof editProductFormSchema>;
