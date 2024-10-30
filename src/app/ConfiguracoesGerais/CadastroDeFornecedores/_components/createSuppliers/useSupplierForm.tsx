import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  createSupplierFormSchema,
  type CreateSupplierFormValues,
} from "./supplierRegisterFormSchema";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";

export const useSupplierForm = () => {
  const router = useRouter();
  const supplierMutation = api.supplier.createSupplier.useMutation({
    onSuccess: (newSupplier) => {
      // console.log("Supplier created successfully:", newSupplier);
      toast.success("Fornecedor criado com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
      toast.error("Erro ao criar fornecedor.", {
        position: "bottom-right",
      });
    },
  });

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
    // console.log(JSON.stringify(data, null, 2));

    const supplierData = {
      name: data.name,
      cnpj: data.cnpj,
      email: data.email,
      phone: data.phone,
      stateRegistration: data.stateRegistration,
      address: data.address,
      neighborhood: data.neighborhood,
      city: data.city,
      federativeUnit: data.federativeUnit,
      cep: data.cep,
      contacts: data.contacts?.map((contact) => ({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      })),
    };

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
