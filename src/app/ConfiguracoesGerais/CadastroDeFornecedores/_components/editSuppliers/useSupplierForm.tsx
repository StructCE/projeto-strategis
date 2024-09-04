import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { type Supplier } from "../supplierData";
import {
  editSupplierFormSchema,
  type EditSupplierFormValues,
} from "./supplierEditFormSchema";

export const useSupplierForm = (supplier: Supplier) => {
  const form = useForm<EditSupplierFormValues>({
    resolver: zodResolver(editSupplierFormSchema),
    mode: "onChange",
    defaultValues: {
      name: supplier.name,
      cnpj: supplier.cnpj,
      email: supplier.email,
      phone: supplier.phone,
      state_registration: supplier.state_registration,
      address: supplier.address,
      neighborhood: supplier.neighborhood,
      city: supplier.city,
      state: supplier.state,
      cep: supplier.cep,
      contacts: supplier.contacts.map((contact) => ({
        name: contact.name,
        role: contact.role.value,
        email: contact.email,
        phone: contact.phone,
      })),
    },
  });

  function onSubmitEdit(data: EditSupplierFormValues) {
    console.log("Editando fornecedor:");
    console.log(JSON.stringify(data, null, 2)); // Editar fornecedor
  }

  function onSubmitRemove(data: EditSupplierFormValues) {
    console.log("Removendo fornecedor:");
    console.log(JSON.stringify(data, null, 2)); // Remover fornecedor
  }

  const fieldArray = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  return {
    form,
    onSubmitEdit,
    onSubmitRemove,
    fieldsArray: fieldArray.fields,
    fieldAppend: fieldArray.append,
    fieldRemove: fieldArray.remove,
  };
};
