import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Product } from "../../productsData";
import {
  editProductFormSchema,
  type EditProductFormValues,
} from "./productEditFormSchema";

export const useProductForm = (product: Product) => {
  const form = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductFormSchema),
    mode: "onChange",
    defaultValues: {
      name: product.name,
      suppliers: product.suppliers.map((supplier) => supplier.name),
      status: product.status,
      parent_product: product.parent_product,
      buy_or_production: product.buy_or_production,
      buy_unit: product.buy_unit.description,
      buy_quantity: product.buy_quantity,
      buy_day: product.buy_day,
      stock_current: product.stock_current,
      stock_min: product.stock_min,
      stock_max: product.stock_max,
      type_of_control: product.type_of_control.description,
      product_category: product.product_category.description,
      sector_of_use: product.sector_of_use.description,
      address: {
        stock: product.address.stock,
        storage: product.address.storage,
        shelf: product.address.shelf,
      },
    },
  });

  function onSubmitEdit(data: EditProductFormValues) {
    console.log("Editando produto:");
    console.log(JSON.stringify(data, null, 2)); // Editar produto
  }

  function onSubmitRemove(data: EditProductFormValues) {
    console.log("Removendo produto:");
    console.log(JSON.stringify(data, null, 2)); // Remover produto
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
