import { z } from "zod";

const AddressSchema = z.object({
  storage: z.string({
    required_error: "Por favor selecione uma zona.",
  }),
  shelves: z.array(z.string()),
});

const StockRepresentativeSchema = {
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
};

export const createStockFormSchema = z.object({
  name: z
    .string({
      required_error: "Por favor digite o nome do estoque",
    })
    .min(2, { message: "O nome do estoque deve ter pelo menos 2 caracteres" })
    .max(32, {
      message: "O nome do estoque deve possuir menos de 32 caracteres",
    }),

  company: z
    .string({
      required_error: "Por favor selecione a empresa do estoque",
    })
    .min(1, { message: "Por favor selecione uma empresa do estoque" }),

  stock_representative: z.object(StockRepresentativeSchema).optional(),

  address: z.array(AddressSchema).min(1),
});

export type CreateStockFormValues = z.infer<typeof createStockFormSchema>;
