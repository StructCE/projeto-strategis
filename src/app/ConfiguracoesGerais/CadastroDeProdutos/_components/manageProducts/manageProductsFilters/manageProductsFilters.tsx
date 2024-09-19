import { Building2, Search, UserCog } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter";

export default function ManageProductsFilters() {
  const [inputNome, setInputNome] = useState("");
  const [selectEmpresa, setSelectEmpresa] = useState("");
  const [selectCargo, setSelectCargo] = useState("");

  return (
    <>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Nome do Produto"
          state={inputNome}
          setState={setInputNome}
        />
      </Filter>
    </>
  );
}
