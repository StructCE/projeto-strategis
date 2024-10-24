import { z } from "zod";

export const editPaymentFormSchema = z.object({
  bankId: z.string({ required_error: "O banco é obrigatório." }).optional(),

  payedValue: z
    .preprocess(
      (value) => (typeof value === "string" ? parseFloat(value) : value), // Converte string para número
      z.number({ required_error: "O valor pago é obrigatório." }),
    )
    .optional(),

  paymentDate: z
    .preprocess(
      (value) => (typeof value === "string" ? new Date(value) : value),
      z.date({ required_error: "A data do pagamento é obrigatória" }),
    )
    .optional(),

  payedStatus: z.string({
    required_error: "O status do pagamento é obrigatório.",
  }),
});

export type EditPaymentFormValues = z.infer<typeof editPaymentFormSchema>;
