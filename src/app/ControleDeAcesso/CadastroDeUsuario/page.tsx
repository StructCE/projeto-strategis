import { UserRegisterContainer } from "./_components/createUsers/userRegisterContainer";
import { ManageUsersContainer } from "./_components/manageUsers/manageUsersContainer";

export default function UsersRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <UserRegisterContainer />
      <ManageUsersContainer />
    </div>
  );
}
