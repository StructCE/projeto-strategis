import { AccessProfilesRegister } from "./_components/createAccessProfile/accessProfileRegister";
import { ManageAccessProfilesTable } from "./_components/manageAccessProfiles/manageAccessProfiles";

export default function AccessProfileRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <AccessProfilesRegister />
      <ManageAccessProfilesTable />
    </div>
  );
}
