import { z } from "zod";

const AddressSchema = z.object({
  storage: z.string({
    required_error: "Por favor selecione uma zona.",
  }),
  shelves: z.array(z.string()),
});

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

  stock_manager: z.string({
    required_error: "Por favor selecione responsável pelo estoque",
  }),

  address: z.array(AddressSchema).min(1),
});

export type CreateStockFormValues = z.infer<typeof createStockFormSchema>;
