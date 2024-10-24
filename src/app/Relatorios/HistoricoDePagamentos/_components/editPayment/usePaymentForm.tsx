import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type SerializedInvoice } from "~/server/interfaces/invoice/invoice.route.interfaces";
import {
  editPaymentFormSchema,
  type EditPaymentFormValues,
} from "./paymentEditFormSchema";

export const usePaymentForm = (invoice: SerializedInvoice) => {
  const form = useForm<EditPaymentFormValues>({
    resolver: zodResolver(editPaymentFormSchema),
    mode: "onChange",
    defaultValues: {
      bank: invoice.bank?.id,
      value_payed: invoice.payedValue,
      date_payment: invoice.paymentDate,
      payed_status: invoice.payedStatus,
    },
  });

  function onSubmit(data: EditPaymentFormValues) {
    console.log("Confirmando pagamento:");
    console.log(JSON.stringify(data, null, 2)); // Confirmar pagamento
  }

  return { form, onSubmit };
};
