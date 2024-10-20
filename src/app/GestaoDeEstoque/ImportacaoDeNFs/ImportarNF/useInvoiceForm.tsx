import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  createInvoiceFormSchema,
  type CreateInvoiceFormValues,
} from "./invoiceCreateFormSchema";

export const useCreateInvoiceForm = () => {
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
          name: "",
          code: "",
          ncm: 0,
          cfop: 0,
          unitId: "",
          purchaseQuantity: 0,
          unitValue: 0,
          controlTypeId: "",
          categoryId: "",
          sectorOfUseId: "",
          stockId: "",
          shelfId: "",
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "invoiceProducts",
  });

  function onSubmit(data: CreateInvoiceFormValues) {
    console.log("Criando nf:");
    console.log(JSON.stringify(data, null, 2)); // Criar nf
  }

  return {
    form,
    onSubmit,
    fieldsArray: fieldArray.fields,
    arrayAppend: fieldArray.append,
    arrayRemove: fieldArray.remove,
  };
};
