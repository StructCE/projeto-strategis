import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type AccountPlan } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  editAccountPlanFormSchema,
  type EditAccountPlanFormValues,
} from "./accountPlanEditFormSchema";

export const useAccountPlanForm = (account_plan: AccountPlan) => {
  const form = useForm<EditAccountPlanFormValues>({
    resolver: zodResolver(editAccountPlanFormSchema),
    mode: "onChange",
    defaultValues: {
      name: account_plan.name,
      abbreviation: account_plan.abbreviation,
      accounts: account_plan.accounts,
    },
  });

  function onSubmitEdit(data: EditAccountPlanFormValues) {
    console.log("Editando plano de contas:");
    console.log(JSON.stringify(data, null, 2)); // Editar plano de contas
  }

  function onSubmitRemove(data: EditAccountPlanFormValues) {
    console.log("Removendo plano de contas:");
    console.log(JSON.stringify(data, null, 2)); // Remover plano de contas
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
