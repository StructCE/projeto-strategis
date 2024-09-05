import { AccessProfileRegister as AccessProfilesRegisterComponent } from "./_components/createAccessProfile/accessProfileRegister";
import { ManageAccessProfilesTable as ManageAccessProfilesTableComponent } from "./_components/manageAccessProfiles/manageAccessProfiles";

export default function AccessProfileRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <AccessProfilesRegisterComponent />
      <ManageAccessProfilesTableComponent />
    </div>
  );
}
