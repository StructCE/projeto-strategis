import AccessProfileRegisterContainer from "./_components/createAccessProfile/accessProfileRegisterContainer";
import { ManageAccessProfilesContainer } from "./_components/manageAccessProfiles/manageAccessProfilesContainer";

export default function AccessProfileRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <AccessProfileRegisterContainer />
      <ManageAccessProfilesContainer />
    </div>
  );
}
