import { z } from "zod";

export const createInvoiceFormSchema = z.object({
  documentNumber: z.string({
    required_error: "O número do documento é obrigatório.",
  }),

  companyId: z.string({
    required_error: "O nome da empresa é obrigatório.",
  }),

  documentDate: z.preprocess(
    (value) => (typeof value === "string" ? new Date(value) : value),
    z.date({ required_error: "A data de emissão é obrigatória." }),
  ),

  documentTypeId: z.string({
    required_error: "O tipo de documento é obrigatório.",
  }),

  accountId: z.string({
    required_error: "O nome da conta é obrigatório.",
  }),

  projectId: z.string({
    required_error: "O nome do projeto é obrigatório.",
  }),

  expenseType: z.string({
    required_error: "O tipo de despesa é obrigatório.",
  }),

  recurrence: z.string({
    required_error: "O tipo de recorrência é obrigatório.",
  }),

  supplierId: z.string({
    required_error: "O fornecedor é obrigatório.",
  }),

  installment: z.string({
    required_error: "Digite o número da parcela.",
  }),

  deadlineDate: z.preprocess(
    (value) => (typeof value === "string" ? new Date(value) : value),
    z.date({ required_error: "A data de vencimento é obrigatória." }),
  ),

  confirmedStatus: z.string({
    required_error: "O status de confirmação é obrigatório.",
  }),

  groupId: z.string({
    required_error: "O nome do grupo é obrigatório.",
  }),

  invoiceProducts: z.array(
    z.object({
      // name: z.string({
      //   required_error: "O nome do produto é obrigatório.",
      // }),

      // code: z.string({
      //   required_error: "O código do produto é obrigatório.",
      // }),

      // ncm: z.preprocess(
      //   (value) => (typeof value === "string" ? parseFloat(value) : value), // Converte string para número
      //   z.number({ required_error: "O NCM é obrigatório." }),
      // ),

      // cfop: z.preprocess(
      //   (value) => (typeof value === "string" ? parseFloat(value) : value), // Converte string para número
      //   z.number({ required_error: "O CFOP é obrigatório." }),
      // ),

      // unitId: z.string({
      //   required_error: "A unidade de compra é obrigatória.",
      // }),

      productSupplierId: z.string({
        required_error: "O produto é obrigatório.",
      }),

      purchaseQuantity: z.preprocess(
        (value) => (typeof value === "string" ? parseFloat(value) : value), // Converte string para número
        z.number({ required_error: "A quantidade de compra é obrigatória." }),
      ),

      unitValue: z.preprocess(
        (value) => (typeof value === "string" ? parseFloat(value) : value), // Converte string para número
        z.number({
          required_error: "O valor por unidade do produto é obrigatório.",
        }),
      ),

      // controlTypeId: z.string({
      //   required_error: "O tipo de controle é obrigatório.",
      // }),

      // categoryId: z.string({
      //   required_error: "A categoria do produto é obrigatória.",
      // }),

      // sectorOfUseId: z.string({
      //   required_error: "O setor de uso é obrigatório.",
      // }),

      // stockId: z.string().optional(),

      // shelfId: z.string({
      //   required_error: "Selecione o local de armazenamento do produto",
      // }),
    }),
  ),
});

export type CreateInvoiceFormValues = z.infer<typeof createInvoiceFormSchema>;
