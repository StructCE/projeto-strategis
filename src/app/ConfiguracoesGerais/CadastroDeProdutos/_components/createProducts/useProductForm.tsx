import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createProductFormSchema,
  type CreateProductFormValues,
} from "./productRegisterFormSchema";

import { api } from "~/trpc/react";
import type { ProductRouteInterfaces } from "~/server/interfaces/product/product.route.interfaces";

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
      buy_unit: "",
      buy_quantity: "",
      buy_day: "",
      stock_current: "",
      stock_min: "",
      stock_max: "",
      type_of_control: "",
      product_category: "",
      sector_of_use: "",
      address: { stock: "", storage: "", shelf: "" },
    },
  });

  function onSubmit(data: CreateProductFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const productData: ProductRouteInterfaces["Product"] = {
      id: data.code,
      name: data.name,
      status: data.status,
      buyQuantity: Number(data.buy_quantity),
      buyDate: new Date(), // TODO: change to buyDay
      currentStock: Number(data.stock_current),
      minimunStock: Number(data.stock_min),
      maximumStock: Number(data.stock_max),
      currentInventory: 0, // TODO: change to lastInventory

      unitId: data.buy_unit,
      controlTypeId: data.type_of_control,
      categoryId: data.product_category,
      sectorOfUseId: data.sector_of_use,

      shelfId: data.address.shelf,
      cabinetId: data.address.storage,
      stockId: data.address.stock, // Estoque do restaurante
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
