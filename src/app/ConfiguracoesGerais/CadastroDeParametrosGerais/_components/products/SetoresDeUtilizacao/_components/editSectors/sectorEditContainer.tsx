"use client";
import { type SetorDeUtilizacao } from "../../../../GeneralParametersData";
import { SectorEdit } from "./sectorEdit";
import { useSectorForm } from "./useSectorForm";

export const SectorEditContainer = (setor: SetorDeUtilizacao) => {
  const { form, onSubmitEdit, onSubmitRemove } = useSectorForm(setor);

  return (
    <SectorEdit
      setor={setor}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
