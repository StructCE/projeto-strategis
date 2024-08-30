import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type SectorOfUse } from "../../../../GeneralParametersData";
import {
  editSectorFormSchema,
  type EditSectorFormValues,
} from "./sectorEditFormSchema";

export const useSectorForm = (sector: SectorOfUse) => {
  const form = useForm<EditSectorFormValues>({
    resolver: zodResolver(editSectorFormSchema),
    mode: "onChange",
    defaultValues: {
      description: sector.description,
    },
  });

  function onSubmitEdit(data: EditSectorFormValues) {
    console.log("Editando setor:");
    console.log(JSON.stringify(data, null, 2)); // Editar setor
  }

  function onSubmitRemove(data: EditSectorFormValues) {
    console.log("Removendo setor:");
    console.log(JSON.stringify(data, null, 2)); // Remover setor
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
