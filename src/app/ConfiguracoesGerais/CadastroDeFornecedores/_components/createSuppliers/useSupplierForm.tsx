import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  createSupplierFormSchema,
  type CreateSupplierFormValues,
} from "./supplierRegisterFormSchema";

import { useFieldArray } from "react-hook-form";
// import { api } from "~/trpc/server";
import { api } from "~/trpc/react";

export const useSupplierForm = () => {
  const form = useForm<CreateSupplierFormValues>({
    resolver: zodResolver(createSupplierFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      cnpj: "",
      email: "",
      phone: "",
      stateRegistration: "",
      address: "",
      neighborhood: "",
      city: "",
      federativeUnit: "",
      cep: "",
      contacts: [{ name: "", email: "", phone: "" }],
    },
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  function onSubmit(data: CreateSupplierFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const { contacts, ...supplierData } = data;
    const {
      data: newSupplier = [],
      error,
      isLoading,
    } = api.supplier.createSupplier.useQuery(supplierData);

    // if (contacts) {
    //   for (const contact of contacts) {
    //     api.contact.createContact({
    //       ...contact,
    //       companyCnpj: newSupplier.cnpj,
    //     });
    //   }
    // }
  }

  return {
    form,
    onSubmit,
    fieldsArray: fieldArray.fields,
    arrayAppend: fieldArray.append,
    arrayRemove: fieldArray.remove,
  };
};
