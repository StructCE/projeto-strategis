import { z } from "zod";

export const editInvoiceFormSchema = z.object({
  document: z.string({ required_error: "O tipo de documento é obrigatório." }),

  account_plan: z.object({
    name: z.string({ required_error: "O plano de contas é obrigatório." }),

    account: z.string({ required_error: "A conta é obrigatória." }),
  }),

  project: z.string({ required_error: "O projeto é obrigatório" }),

  expense_type: z.string({
    required_error: "O tipo de despesa é obrigatório.",
  }),

  recurrence: z.string({
    required_error: "O tipo de recorrência é obrigatório.",
  }),

  installment: z.string({ required_error: "Digite o número da parcela" }),

  group: z.string({ required_error: "O grupo é obrigatório." }),
});

export type EditInvoiceFormValues = z.infer<typeof editInvoiceFormSchema>;
