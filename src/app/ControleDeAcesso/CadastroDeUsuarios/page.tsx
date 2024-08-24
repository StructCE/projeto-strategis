import { UserRegisterContainer } from "./_components/createUsers/userRegisterContainer";
import { ManageUsersContainer } from "./_components/manageUsers/manageUsersContainer";

export default function UsersRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco p-4 pb-32 sm:p-8 sm:pb-8">
      <UserRegisterContainer />
      <ManageUsersContainer />
    </div>
  );
}
