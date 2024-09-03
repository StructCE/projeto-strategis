"use client";
import { ProductRegister } from "./_components/createProducts/productRegister";
import { useProductForm } from "./_components/createProducts/useProductForm";
import ManageProductsTable from "./_components/manageProducts/manageProducts";

export default function ProductsRegister() {
  const { form, onSubmit } = useProductForm();

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <ProductRegister form={form} onSubmit={onSubmit} />
      <ManageProductsTable />
    </div>
  );
}
