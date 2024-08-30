"use client";
import { AccessProfileRegister } from "./_components/createAccessProfile/accessProfileRegister";
import { useAccessProfileForm } from "./_components/createAccessProfile/useAccessProfileForm";
import { ManageAccessProfilesTable } from "./_components/manageAccessProfiles/manageAccessProfiles";

export default function AccessProfile() {
  const { form, onSubmit, selectedModule, setSelectedModule } =
    useAccessProfileForm();

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <AccessProfileRegister
        form={form}
        onSubmit={onSubmit}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
      />
      <ManageAccessProfilesTable />
    </div>
  );
}
