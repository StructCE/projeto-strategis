"use client";
import { ManageUsersTable } from "./manageUsers";
import { useManageUserTable } from "./useManageUserTable";

export const ManageUsersContainer = () => {
  const { handleDetailsPress } = useManageUserTable();
  return (
    <ManageUsersTable
      handleDetailsPress={handleDetailsPress}
    ></ManageUsersTable>
  );
};
