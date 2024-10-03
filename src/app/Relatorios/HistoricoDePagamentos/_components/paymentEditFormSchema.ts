import { z } from "zod";

export const editPaymentFormSchema = z.object({
  bank: z.string({ required_error: "O banco é obrigatório." }),

  value_payed: z.preprocess(
    (value) => (typeof value === "string" ? parseFloat(value) : value), // Converte string para número
    z.number({ required_error: "O valor pago é obrigatório." }),
  ),

  date_payment: z.preprocess(
    (value) => (typeof value === "string" ? new Date(value) : value),
    z.date({ required_error: "A data do pagamento é obrigatória" }),
  ),

  payed_status: z.string({
    required_error: "O status do pagamento é obrigatório.",
  }),
});

export type EditPaymentFormValues = z.infer<typeof editPaymentFormSchema>;
