"use client";
import { type SectorOfUse } from "../../../../GeneralParametersData";
import { SectorEdit } from "./sectorEdit";
import { useSectorForm } from "./useSectorForm";

export const SectorEditContainer = (sector: SectorOfUse) => {
  const { form, onSubmitEdit, onSubmitRemove } = useSectorForm(sector);

  return (
    <SectorEdit
      sector={sector}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
