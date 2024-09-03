"use client";
import { type User } from "../usersData";
import { UserEdit } from "./productEdit";
import { useUserForm } from "./useProductForm";

export const UserEditContainer = (usuario: User) => {
  const { form, onSubmitEdit, onSubmitRemove } = useUserForm(usuario);

  return (
      <UserEdit
        usuario={usuario}
        form={form}
        onSubmitEdit={onSubmitEdit}
        onSubmitRemove={onSubmitRemove}
      />
  );
};
