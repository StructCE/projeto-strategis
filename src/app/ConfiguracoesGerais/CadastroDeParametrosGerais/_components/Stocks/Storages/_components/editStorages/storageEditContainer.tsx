"use client";
import { type Storage } from "../../../../GeneralParametersData";
import { StorageEdit } from "./storageEdit";
import { useStorageForm } from "./useStorageForm";

export const StorageEditContainer = (storage: Storage) => {
  const { form, onSubmitEdit, onSubmitRemove } = useStorageForm(storage);

  return (
    <StorageEdit
      storage={storage}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
