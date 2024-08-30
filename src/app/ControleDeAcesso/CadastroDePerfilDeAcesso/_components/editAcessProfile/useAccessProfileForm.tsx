import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type Role } from "../accessProfilesData";
import {
  editAccessProfileFormSchema,
  type EditAccessProfileFormValues,
} from "./accessProfileEditFormSchema";

export const useAccessProfileForm = (role: Role) => {
  const form = useForm<EditAccessProfileFormValues>({
    resolver: zodResolver(editAccessProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      name: role.name,
      // modules: role.modules,
    },
  });

  const [selectedModule, setSelectedModule] = useState<string[]>(
    role.modules.map((module) => module.value),
  );

  function onSubmitEdit(data: EditAccessProfileFormValues) {
    console.log("Editando cargo:");
    console.log(JSON.stringify(data, null, 2)); // Editar cargo
  }

  function onSubmitRemove(data: EditAccessProfileFormValues) {
    console.log("Removendo cargo:");
    console.log(JSON.stringify(data, null, 2)); // Remover cargo
  }

  return {
    form,
    selectedModule,
    setSelectedModule,
    onSubmitEdit,
    onSubmitRemove,
  };
};
