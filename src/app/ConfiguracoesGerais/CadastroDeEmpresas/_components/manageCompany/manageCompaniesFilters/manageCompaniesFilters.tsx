"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter/index";
import { RegimeTribuario } from "../companiesData";

export default function ManageCompaniesFilters() {
  const [inputName, setInputName] = useState("");
  const [selectState, setSelectState] = useState("");

  return (
    <>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Empresa"
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
        <Filter.Input
          placeholder="CNPJ"
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
        <Filter.Input
          placeholder="Email"
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
        <Filter.Input
          placeholder="Inscrição Estadual"
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
          placeholder="Regime Tributário"
          state={selectState}
          setState={setSelectState}
        >
          {RegimeTribuario.map((tributo, index) => (
            <Filter.SelectItems
              value={tributo.value}
              key={index}
            ></Filter.SelectItems>
          ))}
        </Filter.Select>
      </Filter>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Endereço"
          state={inputName}
          setState={setInputName}
        />
      </Filter>
    </>
  );
}
