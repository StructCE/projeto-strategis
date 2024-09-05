"use client";
import { type Product } from "../../productsData";
import { ProductEdit } from "./productEdit";
import { useProductForm } from "./useProductForm";

export const ProductEditContainer = (product: Product) => {
  const { form, onSubmitEdit, onSubmitRemove } = useProductForm(product);

  return (
    <ProductEdit
      product={product}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
