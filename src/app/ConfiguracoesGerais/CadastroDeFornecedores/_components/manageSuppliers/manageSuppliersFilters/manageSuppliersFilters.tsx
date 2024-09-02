import { Search } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter/filterContainer";
import { states } from "../../supplierData";

export default function ManageSuppliersFilters() {
  const [inputName, setInputName] = useState("");
  const [selectCNPJ, setSelectCNPJ] = useState("");

  return (
    <>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Nome do Fornecedor"
          state={inputName}
          setState={setInputName}
        />
      </Filter>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Select
          placeholder="Estado do Fornecedor"
          state={selectCNPJ}
          setState={setSelectCNPJ}
        >
          {states.map((state, index) => (
            <Filter.SelectItems
              value={state.value}
              key={index}
            ></Filter.SelectItems>
          ))}
        </Filter.Select>
      </Filter>
    </>
  );
}
