import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  editSupplierFormSchema,
  type EditSupplierFormValues,
} from "./supplierEditFormSchema";
import { api } from "~/trpc/server";
import type { Supplier } from "~/server/interfaces/supplier/supplier.route.interfaces";
import type { Contact } from "../../supplierData";

export const useSupplierForm = (supplier: Supplier, contacts: Contact[]) => {
  const form = useForm<EditSupplierFormValues>({
    resolver: zodResolver(editSupplierFormSchema),
    mode: "onChange",
    defaultValues: {
      id: supplier.id,
      data: {
        name: supplier.name,
        cnpj: supplier.cnpj,
        email: supplier.email,
        phone: supplier.phone,
        stateRegistration: supplier.stateRegistration,
        address: supplier.address,
        neighborhood: supplier.neighborhood,
        city: supplier.city,
        federativeUnit: supplier.federativeUnit,
        cep: supplier.cep,
      },
      contacts: contacts.map((contact) => ({
        name: contact.name,
        role: contact.role,
        email: contact.email,
        phone: contact.phone,
      })),
    },
  });

  function onSubmitEdit(data: EditSupplierFormValues) {
    console.log("Editando fornecedor:");
    console.log(JSON.stringify(data, null, 2));

    const { contacts, ...supplierData } = data;

    const updatedSupplier = api.supplier.editSupplier(supplierData);
  }

  function onSubmitRemove(data: EditSupplierFormValues) {
    console.log("Removendo fornecedor:");
    console.log(JSON.stringify(data, null, 2));
    // const removedSupplier = api.supplier.deleteSupplier(data.id)
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
