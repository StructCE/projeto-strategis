import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  createSupplierFormSchema,
  type CreateSupplierFormValues,
} from "./supplierRegisterFormSchema";

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

  const supplierMutation = api.supplier.createSupplier.useMutation({
    onSuccess: (newSupplier) => {
      console.log("Supplier created successfully:", newSupplier);
    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
    },
  });

  // const contactsMutation = api.contact.createContact.useMutation({
  //   onSuccess: (newSupplier) => {
  //     console.log("Supplier created successfully:", newSupplier);
  //   },
  //   onError: (error) => {
  //     console.error("Error creating supplier:", error);
  //   },
  // });

  function onSubmit(data: CreateSupplierFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const { contacts, ...supplierData } = data;

    try {
      supplierMutation.mutate({
        ...supplierData,
      });

      // if (contacts) {
      //   for (const contact of contacts) {
      //     contactMutation.mutate({ ...contact });
      //   }
      // }
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
