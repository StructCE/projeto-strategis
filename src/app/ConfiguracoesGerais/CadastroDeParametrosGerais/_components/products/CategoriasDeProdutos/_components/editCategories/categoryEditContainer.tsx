"use client";
import { type CategoriaDoProduto } from "../../../../GeneralParametersData";
import { CategoryEdit } from "./categoryEdit";
import { useCategoryForm } from "./useCategoryForm";

export const CategoryEditContainer = (categoria: CategoriaDoProduto) => {
  const { form, onSubmitEdit, onSubmitRemove } = useCategoryForm(categoria);

  return (
    <CategoryEdit
      categoria={categoria}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
