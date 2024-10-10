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

function onSubmit(data: CreateSupplierFormValues) {
  console.log(JSON.stringify(data, null, 2));

  const { contacts, ...supplierData } = data;

  const supplierMutation = api.supplier.createSupplier.useMutation({
    onSuccess: (newSupplier) => {
      console.log("Supplier created successfully:", newSupplier);

      // if (contacts) {
      //   for (const contact of contacts) {
      //     api.contact
      //       .createContact({
      //         ...contact,
      //         supplierId: newSupplier.id,
      //       })
      //       .then((contactData) => {
      //         console.log("Contact created successfully:", contactData);
      //       })
      //       .catch((error) => {
      //         console.error("Error creating contact:", error);
      //       });
      //   }
      // }

    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
    },
  });

  try {
    supplierMutation.mutate({
      ...supplierData,
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
