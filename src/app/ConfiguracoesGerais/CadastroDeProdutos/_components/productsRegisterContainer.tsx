"use client";
import { ProductsRegister } from "./productsRegister";
import { productsTable } from "./productsRegisterData";
import { useProductsRegister } from "./useProductsRegister";

export const ProductsRegisterContainer = () => {
  const { handleDetailsPress } = useProductsRegister();
  return (
    <ProductsRegister
      handleDetailsPress={handleDetailsPress}
      productsTable={productsTable}
    ></ProductsRegister>
  );
};
