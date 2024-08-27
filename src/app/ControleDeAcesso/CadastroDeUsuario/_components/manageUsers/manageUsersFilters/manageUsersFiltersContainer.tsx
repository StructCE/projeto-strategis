"use client";
import ManageUsersFilters from "./manageUsersFilters";
import { useManageUsersFilters } from "./useManageUsersFilters";

export default function ManageUsersFiltersContainer() {
  const filters = useManageUsersFilters();
  return <ManageUsersFilters {...filters}></ManageUsersFilters>;
}
