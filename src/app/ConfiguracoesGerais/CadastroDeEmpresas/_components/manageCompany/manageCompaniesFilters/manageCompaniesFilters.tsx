"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter/index";
import { RegimeTribuario } from "../companiesData";

export default function ManageCompaniesFilters() {
  const [companyNameInput, setcompanyNameInput] = useState("");
  const [cnpjInput, setCNPJInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [selectStateRegistration, setSelectStateRegistration] = useState("");
  const [selectTaxRegime, setSelectTaxRegime] = useState("");
  const [addressInput, setAddressInput] = useState("");

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
          state={companyNameInput}
          setState={setcompanyNameInput}
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
          state={cnpjInput}
          setState={setCNPJInput}
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
          state={emailInput}
          setState={setEmailInput}
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
          state={selectStateRegistration}
          setState={setSelectStateRegistration}
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
          state={selectTaxRegime}
          setState={setSelectTaxRegime}
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
          state={addressInput}
          setState={setAddressInput}
        />
      </Filter>
    </>
  );
}
