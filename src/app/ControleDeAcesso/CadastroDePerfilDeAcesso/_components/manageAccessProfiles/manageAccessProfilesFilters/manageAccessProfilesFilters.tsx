import { Search } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter/filterContainer";

export default function ManageAccessProfilesFilters() {
  const [inputNome, setInputNome] = useState("");

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
          state={inputNome}
          setState={setInputNome}
        />
      </Filter>
    </>
  );
}
