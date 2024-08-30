import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type User } from "../usersData";
import {
  editUserFormSchema,
  type EditUserFormValues,
} from "./userEditFormSchema";

export const useUserForm = (user: User) => {
  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserFormSchema),
    mode: "onChange",
    defaultValues: {
      email: user.email,
      password: user.password,
      passwordConfirmation: user.passwordConfirmation,
      username: user.username,
      phone: user.phone,
      company: user.company,
      role: user.role,
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
