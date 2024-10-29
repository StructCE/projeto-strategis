import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createProductFormSchema,
  type CreateProductFormValues,
} from "./productRegisterFormSchema";

export const useProductForm = () => {
  const router = useRouter();
  const productMutation = api.product.createProduct.useMutation({
    onSuccess: (newProduct) => {
      console.log("Product created successfully:", newProduct);
      toast.success("Produto criado com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      toast.error("Erro ao criar produto.", {
        position: "bottom-right",
      });
    },
  });

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductFormSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
      name: "",
      ncm: "",
      cfop: "",
      status: "",
      suppliersId: [],
      usersWithPermission: [],
      unitId: "",
      buyQuantity: "",
      buyDay: "",
      currentStock: "",
      minimunStock: "",
      maximumStock: "",
      controlTypeId: "",
      categoryId: "",
      sectorOfUseId: "",
      shelfId: "",
    },
  });

  function onSubmit(data: CreateProductFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const productData = {
      code: data.code,
      name: data.name,
      ncm: Number(data.ncm),
      cfop: Number(data.cfop),
      status: data.status,
      ProductSupplier: data.suppliersId ?? [],
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
      usersWithPermission: data.usersWithPermission ?? [],
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
