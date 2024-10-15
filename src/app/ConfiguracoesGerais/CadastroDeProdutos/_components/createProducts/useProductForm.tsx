import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createProductFormSchema,
  type CreateProductFormValues,
} from "./productRegisterFormSchema";

import type { ProductRouteInterfaces } from "~/server/interfaces/product/product.route.interfaces";
import { api } from "~/trpc/react";

export const useProductForm = () => {
  const productMutation = api.product.createProduct.useMutation({
    onSuccess: (newProduct) => {
      console.log("Product created successfully:", newProduct);
      alert("Produto criado com sucesso.");
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      alert("Erro ao criar produto.");
    },
  });

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductFormSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
      name: "",
      status: "",
      suppliers: [],
      users_with_permission: [],
      unitId: "",
      buyQuantity: "",
      buyDay: "",
      currentStock: "",
      minimunStock: "",
      maximumStock: "",
      controlTypeId: "",
      categoryId: "",
      sectorOfUseId: "",
      // address: { stock: "", storage: "", shelf: "" },
      shelfId: "",
    },
  });

  function onSubmit(data: CreateProductFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const productData = {
      code: data.code,
      name: data.name,
      status: data.status,
      buyQuantity: Number(data.buyQuantity),
      buyDay: data.buyDay,
      currentStock: Number(data.currentStock),
      minimunStock: Number(data.minimunStock),
      maximumStock: Number(data.maximumStock),
      lastInventory: Number(data.currentStock),

      unitId: data.unitId,
      controlTypeId: data.controlTypeId,
      categoryId: data.categoryId,
      sectorOfUseId: data.sectorOfUseId,
      shelfId: data.shelfId,
      parentProductId: data.parentProductId ?? undefined,

      // cabinetId: data.address.storage,
      // stockId: data.address.stock, // Estoque do restaurante
    };

    try {
      productMutation.mutate({
        ...productData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return { form, onSubmit };
};
