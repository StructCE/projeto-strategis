"use client";
import { type Local } from "../../../../GeneralParametersData";
import { PlaceEdit } from "./placeEdit";
import { usePlaceForm } from "./usePlaceForm";

export const PlaceEditContainer = (local: Local) => {
  const { form, onSubmitEdit, onSubmitRemove } = usePlaceForm(local);

  return (
    <PlaceEdit
      local={local}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
