"use client";
import { type User } from "../manageUsers/useUserTable";
import { useUserForm } from "./useUserForm";
import { UserEdit } from "./userEdit";

export const UserEditContainer = (usuario: User) => {
  const { form, onSubmitEdit, onSubmitRemove } = useUserForm(usuario);

  return (
    <>
      <UserEdit
        usuario={usuario}
        form={form}
        onSubmitEdit={onSubmitEdit}
        onSubmitRemove={onSubmitRemove}
      />
    </>
  );
};
