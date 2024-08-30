"use client";
import { type Shelf } from "../../../../GeneralParametersData";
import { ShelfEdit } from "./shelvesEdit";
import { useShelfForm } from "./useShelvesForm";

export const ShelfEditContainer = (shelf: Shelf) => {
  const { form, onSubmitEdit, onSubmitRemove } = useShelfForm(shelf);

  return (
    <ShelfEdit
      shelf={shelf}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
