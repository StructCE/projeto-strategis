"use client";
import { UserRegister } from "./_components/createUsers/userRegister";
import { useUserForm } from "./_components/createUsers/useUserForm";
import { ManageUsersTable } from "./_components/manageUsers/manageUsers";

export default function UsersRegister() {
  const { form, onSubmit } = useUserForm();
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <UserRegister form={form} onSubmit={onSubmit} />
      <ManageUsersTable />
    </div>
  );
}
