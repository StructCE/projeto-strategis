"use client";
import { type Supplier } from "../supplierData";
import { SupplierEdit } from "./supplierEdit";
import { useSupplierForm } from "./useSupplierForm";

export const SupplierEditContainer = (supplier: Supplier) => {
  const { form, onSubmitEdit, onSubmitRemove } = useSupplierForm(supplier);

  return (
    <SupplierEdit
      supplier={supplier}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
