"use client";
import { type TypeOfControl } from "../../../../GeneralParametersData";
import { TypeEdit } from "./typeEdit";
import { useTypeForm } from "./useTypeForm";

export const TypeEditContainer = (type: TypeOfControl) => {
  const { form, onSubmitEdit, onSubmitRemove } = useTypeForm(type);

  return (
    <TypeEdit
      type={type}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
