"use client";
import { UserRegisterContainer } from "./_components/createUsers/userRegisterContainer";
import { ManageUsersContainer } from "./_components/manageUsers/manageUsersContainer";

export default function CadastroDeUsuarios() {
  return (
    <div className="h-screen w-full bg-fundo_branco p-4 sm:p-8">
      <UserRegisterContainer />
      <ManageUsersContainer />
    </div>
  );
}
