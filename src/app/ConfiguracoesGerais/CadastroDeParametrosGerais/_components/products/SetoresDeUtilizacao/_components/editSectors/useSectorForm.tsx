import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type TipoDeControle } from "../../../../GeneralParametersData";
import {
  editSectorFormSchema,
  type EditSectorFormValues,
} from "./sectorEditFormSchema";

export const useSectorForm = (tipo: TipoDeControle) => {
  const form = useForm<EditSectorFormValues>({
    resolver: zodResolver(editSectorFormSchema),
    mode: "onChange",
    defaultValues: {
      descricao: tipo.descricao,
    },
  });

  function onSubmitEdit(data: EditSectorFormValues) {
    console.log("Editando categoria:");
    console.log(JSON.stringify(data, null, 2)); // Editar categoria
  }

  function onSubmitRemove(data: EditSectorFormValues) {
    console.log("Removendo categoria:");
    console.log(JSON.stringify(data, null, 2)); // Remover categoria
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
