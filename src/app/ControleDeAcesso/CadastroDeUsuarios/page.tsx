"use client";
import { UserRegisterContainer } from "./_components/createUsers/userRegisterContainer";
import { ManageUsersContainer } from "./_components/manageUsers/manageUsers";

export default function CadastroDeUsuarios() {
  return (
    <div className="flex h-screen w-full flex-col gap-4 bg-fundo_branco p-4 sm:p-8">
      <UserRegisterContainer />
      <ManageUsersContainer />
    </div>
  );
}
