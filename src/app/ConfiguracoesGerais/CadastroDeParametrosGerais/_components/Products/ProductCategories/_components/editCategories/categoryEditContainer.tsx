"use client";
import { type ProductCategory } from "../../../../GeneralParametersData";
import { CategoryEdit } from "./categoryEdit";
import { useCategoryForm } from "./useCategoryForm";

export const CategoryEditContainer = (category: ProductCategory) => {
  const { form, onSubmitEdit, onSubmitRemove } = useCategoryForm(category);

  return (
    <CategoryEdit
      category={category}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
