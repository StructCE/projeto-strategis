import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type User } from "../usersData";
import {
  editUserFormSchema,
  type EditUserFormValues,
} from "./productEditFormSchema";

export const useUserForm = (usuario: User) => {
  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserFormSchema),
    mode: "onChange",
    defaultValues: {
      email: usuario.email,
      senha: usuario.senha,
      senhaConfirmacao: usuario.senhaConfirmacao,
      nome: usuario.nome,
      telefone: usuario.telefone,
      empresa: usuario.empresa,
      cargo: usuario.cargo,
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
