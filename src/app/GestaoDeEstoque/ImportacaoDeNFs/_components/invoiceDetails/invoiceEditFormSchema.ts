import { z } from "zod";

export const editInvoiceFormSchema = z.object({
  // documentNumber: z.string({
  //   required_error: "O número do documento é obrigatório.",
  // }),

  // companyId: z.string({
  //   required_error: "O nome da empresa é obrigatório.",
  // }),

  // documentDate: z.preprocess(
  //   (value) => (typeof value === "string" ? new Date(value) : value),
  //   z.date({ required_error: "A data de emissão é obrigatória." }),
  // ),

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

  // supplierId: z.string({
  //   required_error: "O fornecedor é obrigatório.",
  // }),

  installment: z.string({
    required_error: "Digite o número da parcela.",
  }),

  // deadlineDate: z.preprocess(
  //   (value) => (typeof value === "string" ? new Date(value) : value),
  //   z.date({ required_error: "A data de vencimento é obrigatória." }),
  // ),

  // confirmedStatus: z.string({
  //   required_error: "O status de confirmação é obrigatório.",
  // }),

  groupId: z.string({
    required_error: "O nome do grupo é obrigatório.",
  }),
});

export type EditInvoiceFormValues = z.infer<typeof editInvoiceFormSchema>;
