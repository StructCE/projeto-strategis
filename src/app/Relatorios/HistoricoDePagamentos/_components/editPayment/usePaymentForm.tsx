import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type SerializedInvoice } from "~/server/interfaces/invoice/invoice.route.interfaces";
import { api } from "~/trpc/react";
import {
  editPaymentFormSchema,
  type EditPaymentFormValues,
} from "./paymentEditFormSchema";

export const usePaymentForm = (invoice: SerializedInvoice) => {
  const router = useRouter();
  const invoiceMutation = api.invoice.editInvoice.useMutation({
    onSuccess: (updatedInvoice) => {
      // console.log("Invoice updated successfully:", updatedInvoice);
      toast.success(
        "Nota fiscal atualizada com sucesso. Atualizando a página...",
        {
          position: "bottom-right",
        },
      );
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error updating invoice:", error);
      toast.error("Erro ao atualizar nota fiscal.", {
        position: "bottom-right",
      });
    },
  });

  const form = useForm<EditPaymentFormValues>({
    resolver: zodResolver(editPaymentFormSchema),
    mode: "onChange",
    defaultValues: {
      bankId: invoice.bank?.id,
      payedValue: invoice.invoiceValue,
      paymentDate: invoice.paymentDate,
      payedStatus: invoice.payedStatus,
    },
  });

  function onSubmit(data: EditPaymentFormValues) {
    // console.log(JSON.stringify(data, null, 2));

    const invoiceData = {
      bankId: data.bankId,
      payedValue: data.payedValue,
      paymentDate: data.paymentDate,
      payedStatus: data.payedStatus,
    };

    try {
      invoiceMutation.mutate({
        id: invoice.id,
        invoiceData: invoiceData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return { form, onSubmit };
};
