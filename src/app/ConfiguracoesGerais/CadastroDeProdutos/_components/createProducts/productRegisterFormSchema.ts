import { z } from "zod";

export const createProductFormSchema = z.object({
  code: z.string({ required_error: "O código do produto é obrigatório." }),

  name: z
    .string({
      required_error: "Digite o nome do produto.",
    })
    .min(1, { message: "Digite o nome do produto." }),

  ncm: z
    .string({ required_error: "Digite o código NCM do produto" })
    .length(8, {
      message: "O código NCM deve ter oito digitos (XXXXXXXX)",
    }),

  cfop: z
    .string({ required_error: "Digite o código CFOP do produto" })
    .length(4, {
      message: "O código CFOP deve ter quatro digitos (XXXX)",
    }),

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

  shelfId: z.string({
    required_error: "Selecione o local de armazenamento do produto",
  }),
});

export type CreateProductFormValues = z.infer<typeof createProductFormSchema>;
