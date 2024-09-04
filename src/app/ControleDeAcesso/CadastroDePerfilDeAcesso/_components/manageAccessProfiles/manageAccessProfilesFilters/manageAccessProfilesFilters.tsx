"use client";
import { Search } from "lucide-react";
import { Filter } from "~/components/filter";
import { useManageAccessProfilesFilters } from "./useManageAccessProfilesFiltersContainer";

export default function ManageAccessProfilesFilters() {
  const filters = useManageAccessProfilesFilters();
  return (
    <>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Nome do Cargo"
          state={filters.inputNome}
          setState={filters.setInputNome}
        />
      </Filter>
    </>
  );
}
