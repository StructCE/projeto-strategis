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

  const form = useForm<EditInvoiceFormValues>({
    resolver: zodResolver(editInvoiceFormSchema),
    mode: "onChange",
    defaultValues: {
      // documentNumber: "",
      // companyId: "",
      // documentDate: undefined,
      documentTypeId: "",
      accountId: "",
      projectId: "",
      expenseType: "",
      recurrence: "",
      // supplierId: "",
      installment: "",
      // deadlineDate: undefined,
      // confirmedStatus: "Confirmada",
      groupId: "",
      // invoiceProducts: [
      //   {
      //     // name: "",
      //     // code: "",
      //     // ncm: 0,
      //     // cfop: 0,
      //     // unitId: "",
      //     productSupplierId: "",
      //     purchaseQuantity: 0,
      //     unitValue: 0,
      //     // controlTypeId: "",
      //     // categoryId: "",
      //     // sectorOfUseId: "",
      //     // stockId: "",
      //     // shelfId: "",
      //   },
      // ],
    },
  });

  // const fieldArray = useFieldArray({
  //   control: form.control,
  //   name: "invoiceProducts",
  // });

  function onSubmitConfirm(data: EditInvoiceFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const invoiceData = {
      // documentNumber: data.documentNumber,
      // companyId: data.companyId,
      // documentDate: data.documentDate,
      documentTypeId: data.documentTypeId,
      accountId: data.accountId,
      projectId: data.projectId,
      expenseType: data.expenseType,
      recurrence: data.recurrence,
      // supplierId: data.supplierId,
      installment: data.installment,
      // deadlineDate: data.documentDate,
      confirmedStatus: "Confirmada",
      groupId: data.groupId,
      // invoiceProducts: data.invoiceProducts.map((invoiceProduct) => ({
      //   // name: "",
      //   // code: "",
      //   // ncm: 0,
      //   // cfop: 0,
      //   // unitId: "",
      //   productSupplierId: invoiceProduct.productSupplierId,
      //   purchaseQuantity: invoiceProduct.purchaseQuantity,
      //   unitValue: invoiceProduct.unitValue,
      //   // controlTypeId: "",
      //   // categoryId: "",
      //   // sectorOfUseId: "",
      //   // stockId: "",
      //   // shelfId: "",
      // })),
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
      // documentNumber: data.documentNumber,
      // companyId: data.companyId,
      // documentDate: data.documentDate,
      documentTypeId: data.documentTypeId,
      accountId: data.accountId,
      projectId: data.projectId,
      expenseType: data.expenseType,
      recurrence: data.recurrence,
      // supplierId: data.supplierId,
      installment: data.installment,
      // deadlineDate: data.documentDate,
      confirmedStatus: "Rejeitada",
      groupId: data.groupId,
      // invoiceProducts: data.invoiceProducts.map((invoiceProduct) => ({
      //   // name: "",
      //   // code: "",
      //   // ncm: 0,
      //   // cfop: 0,
      //   // unitId: "",
      //   productSupplierId: invoiceProduct.productSupplierId,
      //   purchaseQuantity: invoiceProduct.purchaseQuantity,
      //   unitValue: invoiceProduct.unitValue,
      //   // controlTypeId: "",
      //   // categoryId: "",
      //   // sectorOfUseId: "",
      //   // stockId: "",
      //   // shelfId: "",
      // })),
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

  return {
    form,
    onSubmitConfirm,
    onSubmitReject,
    // fieldsArray: fieldArray.fields,
    // arrayAppend: fieldArray.append,
    // arrayRemove: fieldArray.remove,
  };
};
