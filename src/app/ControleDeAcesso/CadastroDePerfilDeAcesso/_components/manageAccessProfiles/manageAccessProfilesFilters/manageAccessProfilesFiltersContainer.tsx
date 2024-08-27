import ManageAccessProfilesFilters from "./manageAccessProfilesFilters";
import { useManageAccessProfilesFilters } from "./useManageAccessProfilesFiltersContainer";

export default function ManageAccessProfilesFiltersContainer() {
  const filters = useManageAccessProfilesFilters();
  return <ManageAccessProfilesFilters {...filters} />;
}
