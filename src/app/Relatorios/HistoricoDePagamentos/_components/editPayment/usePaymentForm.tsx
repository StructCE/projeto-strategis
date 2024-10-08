import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  editPaymentFormSchema,
  type EditPaymentFormValues,
} from "./paymentEditFormSchema";
import { type Payment } from "./paymentsData";

export const usePaymentForm = (payment: Payment) => {
  const form = useForm<EditPaymentFormValues>({
    resolver: zodResolver(editPaymentFormSchema),
    mode: "onChange",
    defaultValues: {
      bank: payment.bank?.name,
      value_payed: payment.value_payed,
      date_payment: payment.date_payment,
      payed_status: payment.payed_status,
    },
  });

  function onSubmit(data: EditPaymentFormValues) {
    console.log("Confirmando pagamento:");
    console.log(JSON.stringify(data, null, 2)); // Confirmar pagamento
  }

  return { form, onSubmit };
};
