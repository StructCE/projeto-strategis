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
      document_number: "",
      company: { name: "" },
      date_document: undefined,
      document: { name: "" },
      account_plan: { name: "", account: "" },
      project: { name: "" },
      expense_type: "",
      recurrence: "",
      supplier: { name: "" },
      bank: { name: "" },
      installment: "",
      value_payed: 0,
      date_deadline: undefined,
      date_payment: undefined,
      confirmed_status: "Confirmada",
      payed_status: "",
      group: { name: "" },
      products: [
        {
          name: "",
          code: "",
          ncm: 0,
          cfop: 0,
          buy_unit: "",
          purchase_quantity: 0,
          value_unit: 0,
          type_of_control: "",
          product_category: "",
          sector_of_use: "",
          address: {
            stock: "",
            storage: "",
            shelf: "",
          },
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "products",
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
