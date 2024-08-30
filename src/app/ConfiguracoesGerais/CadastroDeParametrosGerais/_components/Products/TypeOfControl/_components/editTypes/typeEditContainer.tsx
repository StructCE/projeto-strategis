"use client";
import { type TipoDeControle } from "../../../../GeneralParametersData";
import { TypeEdit } from "./typeEdit";
import { useTypeForm } from "./useTypeForm";

export const TypeEditContainer = (tipo: TipoDeControle) => {
  const { form, onSubmitEdit, onSubmitRemove } = useTypeForm(tipo);

  return (
    <TypeEdit
      tipo={tipo}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
