import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type SerializedInvoice } from "~/server/interfaces/invoice/invoice.route.interfaces";
import { api } from "~/trpc/react";
import {
  editInvoiceFormSchema,
  type EditInvoiceFormValues,
} from "./invoiceEditFormSchema";

export const useEditInvoiceForm = (invoice: SerializedInvoice) => {
  const invoiceMutation = api.invoice.editInvoice.useMutation({
    onSuccess: (updatedInvoice) => {
      console.log("Invoice updated successfully:", updatedInvoice);
      alert("Nota fiscal atualizada com sucesso.");
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error updating invoice:", error);
      alert("Erro ao atualizar nota fiscal.");
    },
  });

  const rejectMutation = api.invoice.rejectInvoice.useMutation({
    onSuccess: (updatedInvoice) => {
      console.log("Invoice rejected successfully:", updatedInvoice);
      alert("Nota fiscal rejeitada com sucesso.");
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error rejecting invoice:", error);
      alert("Erro ao rejeitar nota fiscal.");
    },
  });

  const form = useForm<EditInvoiceFormValues>({
    resolver: zodResolver(editInvoiceFormSchema),
    mode: "onChange",
    defaultValues: {
      documentTypeId: invoice.documentType?.id ?? "",
      accountId: invoice.account?.id ?? "",
      projectId: invoice.project?.id ?? "",
      expenseType: invoice.expenseType ?? "",
      recurrence: invoice.recurrence ?? "",
      installment: invoice.installment ?? "",
      groupId: invoice.group?.id ?? "",
    },
  });

  function onSubmitConfirm(data: EditInvoiceFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const invoiceData = {
      documentTypeId: data.documentTypeId,
      accountId: data.accountId,
      projectId: data.projectId,
      expenseType: data.expenseType,
      recurrence: data.recurrence,
      installment: data.installment,
      confirmedStatus: "Confirmada",
      groupId: data.groupId,
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

  function onSubmitReject(data: EditInvoiceFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const invoiceData = {
      documentTypeId: data.documentTypeId ?? "",
      accountId: data.accountId ?? "",
      projectId: data.projectId ?? "",
      expenseType: data.expenseType ?? "",
      recurrence: data.recurrence ?? "",
      installment: data.installment ?? "",
      confirmedStatus: "Rejeitada",
      groupId: data.groupId ?? "",
    };

    try {
      rejectMutation.mutate({
        id: invoice.id,
        invoiceData: invoiceData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return {
    form,
    onSubmitConfirm,
    onSubmitReject,
  };
};
