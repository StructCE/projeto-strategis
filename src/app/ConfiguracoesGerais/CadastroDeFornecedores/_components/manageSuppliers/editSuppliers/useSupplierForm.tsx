import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { Supplier } from "~/server/interfaces/supplier/supplier.route.interfaces";
import { api } from "~/trpc/react";
import {
  editSupplierFormSchema,
  type EditSupplierFormValues,
} from "./supplierEditFormSchema";

export const useSupplierForm = (supplier: Supplier) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const supplierMutation = api.supplier.editSupplier.useMutation({
    onSuccess: (updatedSupplier) => {
      console.log("Supplier updated successfully:", updatedSupplier);
      if (isDeleted === false) {
        alert("Fornecedor atualizado com sucesso.");
      }
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error updating supplier:", error);
      alert("Erro ao atualizar fornecedor.");
    },
  });

  const deleteSupplierMutation = api.supplier.removeSupplier.useMutation({
    onSuccess: (removedSupplier) => {
      console.log("Supplier removed successfully:", removedSupplier);
      alert("Fornecedor removido com sucesso.");
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error removing supplier:", error);
      alert("Erro ao remover fornecedor.");
    },
  });

  const form = useForm<EditSupplierFormValues>({
    resolver: zodResolver(editSupplierFormSchema),
    mode: "onChange",
    defaultValues: {
      name: supplier.name,
      cnpj: supplier.cnpj,
      email: supplier.email,
      phone: supplier.phone ?? "",
      stateRegistration: supplier.stateRegistration,
      address: supplier.address,
      neighborhood: supplier.neighborhood,
      city: supplier.city,
      federativeUnit: supplier.federativeUnit,
      cep: supplier.cep,
      contacts: supplier.contacts?.map((contact) => ({
        name: contact.name,
        email: contact.email,
        phone: contact.phone ?? "",
      })),
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  function onSubmitEdit(data: EditSupplierFormValues) {
    if (isDeleted) return;
    console.log(JSON.stringify(data, null, 2));

    try {
      supplierMutation.mutate({
        id: supplier.id,
        data: {
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
          contacts: data.contacts?.map((contact, index) => ({
            id: supplier.contacts?.[index]?.id ?? "",
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          })),
        },
      });
    } catch (error) {
      console.error("Error submitting edit form:", error);
    }
  }

  function onSubmitRemove() {
    setIsDeleted(true);
    try {
      deleteSupplierMutation.mutate({
        id: supplier.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return {
    form,
    onSubmitEdit,
    onSubmitRemove,
    fieldsArray: fieldArray.fields,
    fieldAppend: fieldArray.append,
    fieldRemove: fieldArray.remove,
  };
};
