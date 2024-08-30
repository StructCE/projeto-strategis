"use client";
import { type User } from "../usersData";
import { useUserForm } from "./useUserForm";
import { UserEdit } from "./userEdit";

export const UserEditContainer = (user: User) => {
  const { form, onSubmitEdit, onSubmitRemove } = useUserForm(user);

  return (
    <UserEdit
      user={user}
      form={form}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
