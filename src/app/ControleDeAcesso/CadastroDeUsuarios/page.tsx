import { UserRegister } from "./_components/createUsers/userRegister";
import { ManageUsersTable } from "./_components/manageUsers/manageUsers";

export default function UsersRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <UserRegister />
      <ManageUsersTable />
    </div>
  );
}
