import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Bank } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  editBankFormSchema,
  type EditBankFormValues,
} from "./bankEditFormSchema";

export const useBankForm = (bank: Bank) => {
  const form = useForm<EditBankFormValues>({
    resolver: zodResolver(editBankFormSchema),
    mode: "onChange",
    defaultValues: {
      name: bank.name,
    },
  });

  function onSubmitEdit(data: EditBankFormValues) {
    console.log("Editando banco:");
    console.log(JSON.stringify(data, null, 2)); // Editar banco
  }

  function onSubmitRemove(data: EditBankFormValues) {
    console.log("Removendo banco:");
    console.log(JSON.stringify(data, null, 2)); // Remover banco
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
