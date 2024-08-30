"use client";
import { type Prateleira } from "../../../../GeneralParametersData";
import { ShelfEdit } from "./shelvesEdit";
import { useShelfForm } from "./useShelvesForm";

export const ShelfEditContainer = (prateleira: Prateleira) => {
  const { form, onSubmitEdit, onSubmitRemove } = useShelfForm(prateleira);

  return (
    <ShelfEdit
      prateleira={prateleira}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
