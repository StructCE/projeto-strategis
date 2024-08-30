"use client";
import { type Place } from "../../../../GeneralParametersData";
import { PlaceEdit } from "./placeEdit";
import { usePlaceForm } from "./usePlaceForm";

export const PlaceEditContainer = (place: Place) => {
  const { form, onSubmitEdit, onSubmitRemove } = usePlaceForm(place);

  return (
    <PlaceEdit
      place={place}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
