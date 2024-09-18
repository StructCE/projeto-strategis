import { z } from "zod";

const StockRepresentativeSchema = z.object({
  name: z
    .string({
      required_error: "Por favor digite o nome do responsável.",
    })
    .min(2, {
      message: "O nome do responsável deve ter pelo menos 3 caracteres.",
    }),

  role: z
    .string({
      required_error: "Por favor selecione o cargo.",
    })
    .min(1, {
      message: "Por favor selecione o cargo.",
    }),

  email: z
    .string({
      required_error: "Por favor digite o email do responsável.",
    })
    .email({
      message: "Email inválido.",
    }),

  phone: z
    .string()
    .min(8, {
      message:
        "Número de telefone inválido. O formato correto é (XX) XXXXX-XXXX.",
    })
    .max(16, {
      message:
        "Número de telefone inválido. O formato correto é (XX) XXXXX-XXXX.",
    })
    .optional(),
});

export const editStockFormSchema = z.object({
  code: z
    .string({
      required_error: "Por favor digite o código",
    })
    .min(3, { message: "O código deve possuir pelo menos 3 caracteres" })
    .max(10, { message: "O código deve possuir menos de 30 caracteres" }),
  name: z
    .string({
      required_error: "Por favor digite o nome do estoque",
    })
    .min(2, { message: "O nome do estoque deve ter pelomenos 2 caracteres" })
    .max(32, { message: "O estoque deve possuir menos de 30 caracteres" }),
  company: z
    .string({
      required_error: "Por favor selecione a empresa do estoque",
    })
    .min(1, { message: "Por favor selecione uma empresa do estoque" }),
  stockRepresentative: z.array(StockRepresentativeSchema).optional(),
  stockAddress: z
    .string()
    .min(2, { message: "O endereço deve ter pelo menos 3 caracteres" })
    .max(32, { message: "O endereço deve possuir menos de 30 caracteres" }),
  zone: z
    .string({
      required_error: "Por favor selecione um ou mais armários/zonas",
    })
    .min(1, { message: "Por favor selecione um ou mais armários/zonas" }),

  shelf: z
    .string({
      required_error: "Por favor selecione uma ou mais prateleiras",
    })
    .min(1, { message: "Por favor selecione uma ou mais prateleiras" }),
});

export type EditStockFormValues = z.infer<typeof editStockFormSchema>;
