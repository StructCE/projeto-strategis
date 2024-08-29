"use client";
import { type Locais } from "../../../../GeneralParametersData";
import { PlaceEdit } from "./placeEdit";
import { usePlaceForm } from "./usePlaceForm";

export const PlaceEditContainer = (local: Locais) => {
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
