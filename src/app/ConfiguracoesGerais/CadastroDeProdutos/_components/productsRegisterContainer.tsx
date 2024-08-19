"use client";
import { ProductsRegister } from "./productsRegister";
import { useProductsRegister } from "./useProductsRegister";
import { productsTable } from "./productsRegisterData";

export const ProductsRegisterContainer = () => {
  const { handleDetailsPress } = useProductsRegister();
  return (
    <ProductsRegister
      handleDetailsPress={handleDetailsPress}
      productsTable={productsTable}
    ></ProductsRegister>
  );
};
