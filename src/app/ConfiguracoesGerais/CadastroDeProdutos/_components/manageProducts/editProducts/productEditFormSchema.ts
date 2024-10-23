import { z } from "zod";

export const addressSchema = z.object({
  stock: z
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

export const editProductFormSchema = z.object({
  code: z.string({ required_error: "O código do produto é obrigatório." }),

  name: z
    .string({
      required_error: "Digite o nome do produto.",
    })
    .min(1, { message: "Digite o nome do produto." }),

  ncm: z.string({ required_error: "Digite o código NCM do produto" }),

  cfop: z.string({ required_error: "Digite o código CFOP do produto" }),

  suppliersId: z.array(z.string()).optional(),
  // .min(1, { message: "Selecione um ou mais fornecedores." }),

  status: z
    .string({
      required_error: "Selecione o status do produto.",
    })
    .min(1, { message: "Selecione o status do produto." }),

  parentProductId: z.string().optional(),

  usersWithPermission: z.array(z.string()).optional(),

  unitId: z
    .string({
      required_error: "Selecione a unidade de compra.",
    })
    .min(1, { message: "Selecione a unidade de compra." }),

  buyQuantity: z
    .string({
      required_error: "Digite a quantidade de compra.",
    })
    .min(1, { message: "Quantidade de compra deve ser maior que zero." }),

  buyDay: z
    .string({
      required_error: "Selecione o dia de compra.",
    })
    .min(1, { message: "Selecione o dia de compra." }),

  currentStock: z
    .string({
      required_error: "Digite o estoque atual.",
    })
    .min(1, { message: "Estoque atual deve ser maior que zero." }),

  minimunStock: z.string({
    required_error: "Digite o estoque mínimo.",
  }),

  maximumStock: z.string({
    required_error: "Digite o estoque máximo.",
  }),

  controlTypeId: z
    .string({
      required_error: "Selecione o tipo de controle.",
    })
    .min(1, { message: "Selecione o tipo de controle." }),

  categoryId: z
    .string({
      required_error: "Selecione a categoria do produto.",
    })
    .min(1, { message: "Selecione a categoria do produto." }),

  sectorOfUseId: z
    .string({
      required_error: "Selecione o setor de utilização do produto.",
    })
    .min(1, { message: "Selecione o setor de utilização do produto." }),

  stockId: z.string().optional(),

  // address: addressSchema,
  shelfId: z.string({
    required_error: "Selecione o local de armazenamento do produto",
  }),
});

export type EditProductFormValues = z.infer<typeof editProductFormSchema>;
