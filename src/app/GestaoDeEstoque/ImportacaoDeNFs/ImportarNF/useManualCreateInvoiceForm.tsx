import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createInvoiceFormSchema,
  type CreateInvoiceFormValues,
} from "./invoiceCreateFormSchema";

export const useManualCreateInvoiceForm = () => {
  const router = useRouter();
  const invoiceMutation = api.invoice.registerInvoice.useMutation({
    onSuccess: (newInvoice) => {
      console.log("Invoice created successfully:", newInvoice);
      toast.success("Nota fiscal criada com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating invoice:", error);
      toast.error("Erro ao criar nota fiscal.", {
        position: "bottom-right",
      });
    },
  });

  const form = useForm<CreateInvoiceFormValues>({
    resolver: zodResolver(createInvoiceFormSchema),
    mode: "onChange",
    defaultValues: {
      documentNumber: "",
      companyId: "",
      documentDate: undefined,
      documentTypeId: "",
      accountId: "",
      projectId: "",
      expenseType: "",
      recurrence: "",
      supplierId: "",
      installment: "",
      deadlineDate: undefined,
      confirmedStatus: "Confirmada",
      groupId: "",
      invoiceProducts: [
        {
          // name: "",
          // code: "",
          // ncm: 0,
          // cfop: 0,
          // unitId: "",
          productSupplierId: "",
          purchaseQuantity: 0,
          unitValue: 0,
          // controlTypeId: "",
          // categoryId: "",
          // sectorOfUseId: "",
          // stockId: "",
          // shelfId: "",
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "invoiceProducts",
  });

  function onSubmit(data: CreateInvoiceFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const invoiceData = {
      documentNumber: data.documentNumber,
      companyId: data.companyId,
      documentDate: data.documentDate,
      documentTypeId: data.documentTypeId,
      accountId: data.accountId,
      projectId: data.projectId,
      expenseType: data.expenseType,
      recurrence: data.recurrence,
      supplierId: data.supplierId,
      installment: data.installment,
      deadlineDate: data.documentDate,
      confirmedStatus: "Pendente",
      groupId: data.groupId,
      invoiceValue: data.invoiceValue,
      invoiceProducts: data.invoiceProducts.map((invoiceProduct) => ({
        // name: "",
        // code: "",
        // ncm: 0,
        // cfop: 0,
        // unitId: "",
        productSupplierId: invoiceProduct.productSupplierId,
        purchaseQuantity: invoiceProduct.purchaseQuantity,
        unitValue: invoiceProduct.unitValue,
        // controlTypeId: "",
        // categoryId: "",
        // sectorOfUseId: "",
        // stockId: "",
        // shelfId: "",
      })),
    };

    try {
      invoiceMutation.mutate({
        ...invoiceData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return {
    form,
    onSubmit,
    fieldsArray: fieldArray.fields,
    arrayAppend: fieldArray.append,
    arrayRemove: fieldArray.remove,
  };
};
