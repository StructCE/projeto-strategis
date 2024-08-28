"use client";
import { ManageAccessProfilesTable } from "./manageAccessProfiles";
import { useManageAccessProfileTable } from "./useManageAccessProfileTable";

export const ManageAccessProfilesContainer = () => {
  const { handleDetailsPress } = useManageAccessProfileTable();
  return (
    <ManageAccessProfilesTable
      handleDetailsPress={handleDetailsPress}
    ></ManageAccessProfilesTable>
  );
};
