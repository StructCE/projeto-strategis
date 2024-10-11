import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type UserWithRoles } from "../../usersData";
import {
  editUserFormSchema,
  type EditUserFormValues,
} from "./userEditFormSchema";

export const useUserForm = (user: UserWithRoles) => {
  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserFormSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.companies[0],
      role: user.roles[0],
    },
  });

  function onSubmitEdit(data: EditUserFormValues) {
    console.log("Editando usuário:");
    console.log(JSON.stringify(data, null, 2)); // Editar usuário
  }

  function onSubmitRemove(data: EditUserFormValues) {
    console.log("Removendo usuário:");
    console.log(JSON.stringify(data, null, 2)); // Remover usuário
  }

  return { form, onSubmitEdit, onSubmitRemove };
};
