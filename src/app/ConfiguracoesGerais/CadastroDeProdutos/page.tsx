"use client";
import { ProductRegister } from "./_components/createProducts/productRegister";
import ManageProductsTable from "./_components/manageProducts/manageProducts";

export default function ProductsRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <ProductRegister />
      <ManageProductsTable />
    </div>
  );
}
