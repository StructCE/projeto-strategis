import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type ProductWithFeatures } from "~/server/interfaces/product/product.route.interfaces";
import { api } from "~/trpc/react";
import {
  editProductFormSchema,
  type EditProductFormValues,
} from "./productEditFormSchema";

export const useProductForm = (product: ProductWithFeatures) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const productMutation = api.product.editProduct.useMutation({
    onSuccess: (updatedProduct) => {
      console.log("Product updated successfully:", updatedProduct);
      if (isDeleted === false) {
        alert("Produto atualizado com sucesso.");
      }
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      alert("Erro ao atualizar produto.");
    },
  });

  const deleteProductMutation = api.product.deleteProduct.useMutation({
    onSuccess: (deletedProduct) => {
      console.log("Product removed successfully:", deletedProduct);
      alert("Produto removido com sucesso.");
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error removing product:", error);
      alert("Erro ao remover produto.");
    },
  });

  const { data: productStock } = api.stock.getStockFromShelf.useQuery({
    shelfId: product.shelfId ?? "",
  });

  const selectedStock =
    productStock && productStock.length > 0 ? (productStock[0]?.id ?? "") : "";

  const form = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductFormSchema),
    mode: "onChange",
    defaultValues: {
      code: product.code,
      name: product.name,
      ncm: product.ncm.toString(),
      cfop: product.cfop.toString(),
      status: product.status ?? "",
      suppliersId: product.ProductSupplier.map(
        (supplier) => supplier.supplier.id,
      ),
      buyQuantity: product.buyQuantity?.toString(),
      buyDay: product.buyDay ?? "",
      currentStock: product.currentStock?.toString(),
      minimunStock: product.minimunStock?.toString(),
      maximumStock: product.maximumStock?.toString(),
      unitId: product.unitId,
      controlTypeId: product.controlTypeId ?? "",
      categoryId: product.categoryId ?? "",
      sectorOfUseId: product.sectorOfUseId ?? "",
      stockId: selectedStock,
      shelfId: product.shelfId ?? "",
      parentProductId: product.parentProductId ?? undefined,
      usersWithPermission: product.usersWithPermission?.map(
        (user) => user.userId,
      ),
    },
  });

  function onSubmitEdit(data: EditProductFormValues) {
    if (isDeleted) return;
    console.log(JSON.stringify(data, null, 2));

    try {
      productMutation.mutate({
        id: product.id,
        data: {
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
        },
      });
    } catch (error) {
      console.error("Error submitting update form:", error);
    }
  }

  function onSubmitRemove() {
    setIsDeleted(true);
    try {
      deleteProductMutation.mutate({
        id: product.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
