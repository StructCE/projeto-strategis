"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter/index";
import { stockCompanies } from "../../stockData";

export default function ManageStocksFilters() {
  const [inputCode, setInputCode] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputStockAddress, setInputStockAddress] = useState("");
  const [inputControlType, setInputControlType] = useState("");
  const [inputProductCategory, setInputProductCategory] = useState("");
  const [inputSectorUse, setInputSectorUse] = useState("");
  const [selectCompany, setSelectCompany] = useState("");

  return (
    <>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Código"
          state={inputCode}
          setState={setInputCode}
        />
      </Filter>

      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Nome"
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
          placeholder="Endereço do Estoque"
          state={inputStockAddress}
          setState={setInputStockAddress}
        />
      </Filter>

      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Tipo de Controle"
          state={inputControlType}
          setState={setInputControlType}
        />
      </Filter>

      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Categoria do Produto "
          state={inputProductCategory}
          setState={setInputProductCategory}
        />
      </Filter>

      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Setor de Utilização"
          state={inputSectorUse}
          setState={setInputSectorUse}
        />
      </Filter>

      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Select
          placeholder="Empresa"
          state={selectCompany}
          setState={setSelectCompany}
        >
          {stockCompanies.map((company, index) => (
            <Filter.SelectItems
              value={company.value}
              key={index}
            ></Filter.SelectItems>
          ))}
        </Filter.Select>
      </Filter>
    </>
  );
}
