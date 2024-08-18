"use client"
import { useUserForm } from "./useUserForm";
import { UserRegister } from "./userRegister";

export const UserRegisterContainer = () => {
  const { form, onSubmit } = useUserForm();

  return (
    <>
      <UserRegister form={form} onSubmit={onSubmit} />
    </>
  );
};
