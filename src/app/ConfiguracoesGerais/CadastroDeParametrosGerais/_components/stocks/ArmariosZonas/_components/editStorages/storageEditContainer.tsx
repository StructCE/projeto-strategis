"use client";
import { locais, type ArmarioZona } from "../../../../GeneralParametersData";
import { StorageEdit } from "./storageEdit";
import { useStorageForm } from "./useStorageForm";

export const StorageEditContainer = (armarioZona: ArmarioZona) => {
  const { form, onSubmitEdit, onSubmitRemove } = useStorageForm(
    armarioZona,
    locais,
  );

  return (
    <StorageEdit
      armarioZona={armarioZona}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
