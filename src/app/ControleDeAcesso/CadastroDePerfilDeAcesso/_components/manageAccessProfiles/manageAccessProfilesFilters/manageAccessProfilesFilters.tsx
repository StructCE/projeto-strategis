import { Search } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter/filterContainer";

export default function ManageAccessProfilesFilters() {
  const [inputRole, setInputRole] = useState("");
  const [selectModule, setSelectModule] = useState("");

  return (
    <>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Cargo"
          state={inputRole}
          setState={setInputRole}
        />
      </Filter>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Módulo"
          state={selectModule}
          setState={setSelectModule}
        />
      </Filter>
    </>
  );
}
