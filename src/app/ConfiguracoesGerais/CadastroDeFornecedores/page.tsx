"use client";
import { SupplierRegister } from "./_components/createSuppliers/supplierRegister";
import { useSupplierForm } from "./_components/createSuppliers/useSupplierForm";
import { ManageSuppliersTable } from "./_components/manageSuppliers/manageSuppliers";

export default function SuppliersRegister() {
  const { form, onSubmit } = useSupplierForm();

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <SupplierRegister form={form} onSubmit={onSubmit} />
      <ManageSuppliersTable />
    </div>
  );
}
