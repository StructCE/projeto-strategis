import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  editInvoiceFormSchema,
  type EditInvoiceFormValues,
} from "./invoiceEditFormSchema";

export const useInvoiceForm = () => {
  const form = useForm<EditInvoiceFormValues>({
    resolver: zodResolver(editInvoiceFormSchema),
    mode: "onChange",
  });

  function onSubmitConfirm(data: EditInvoiceFormValues) {
    console.log("Confirmando nf:");
    console.log(JSON.stringify(data, null, 2)); // Confirmar nf
  }

  function onSubmitReject(data: EditInvoiceFormValues) {
    console.log("Rejeitando nf:");
    console.log(JSON.stringify(data, null, 2)); // Rejeitar nf
  }

  return { form, onSubmitConfirm, onSubmitReject };
};
