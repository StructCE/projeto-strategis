import { z } from "zod";

export const createProductFormSchema = z.object({
  name: z
    .string({
      required_error: "Digite o nome do produto.",
    })
    .min(1, { message: "Digite o nome do produto." }),

  status: z
    .string({
      required_error: "Selecione o status do produto.",
    })
    .min(1, { message: "Selecione o status do produto." }),

  suppliers: z
    .array(z.string())
    .min(1, { message: "Selecione um ou mais fornecedores." }),

  buy_unit: z
    .string({
      required_error: "Selecione a unidade de compra.",
    })
    .min(1, { message: "Selecione a unidade de compra." }),

  buy_quantity: z
    .string({
      required_error: "Digite a quantidade de compra.",
    })
    .min(1, { message: "Quantidade de compra deve ser maior que zero." }),

  buy_day: z
    .string({
      required_error: "Selecione o dia de compra.",
    })
    .min(1, { message: "Selecione o dia de compra." }),

  stock_current: z
    .string({
      required_error: "Digite o estoque atual.",
    })
    .min(1, { message: "Estoque atual deve ser maior que zero." }),

  stock_min: z.string({
    required_error: "Digite o estoque mínimo.",
  }),

  stock_max: z.string({
    required_error: "Digite o estoque máximo.",
  }),

  type_of_control: z
    .string({
      required_error: "Selecione o tipo de controle.",
    })
    .min(1, { message: "Selecione o tipo de controle." }),

  product_category: z
    .string({
      required_error: "Selecione a categoria do produto.",
    })
    .min(1, { message: "Selecione a categoria do produto." }),

  sector_of_use: z
    .string({
      required_error: "Selecione o setor de utilização do produto.",
    })
    .min(1, { message: "Selecione o setor de utilização do produto." }),

  place: z
    .string({
      required_error: "Selecione um local.",
    })
    .min(1, { message: "Selecione um local." }),

  storage: z
    .string({
      required_error: "Selecione um armário/zona.",
    })
    .min(1, { message: "Selecione um armário/zona." }),

  shelf: z
    .string({
      required_error: "Selecione uma prateleira.",
    })
    .min(1, { message: "Selecione uma prateleira." }),
});

export type CreateProductFormValues = z.infer<typeof createProductFormSchema>;
