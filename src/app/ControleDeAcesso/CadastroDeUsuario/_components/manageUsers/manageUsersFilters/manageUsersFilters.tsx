import { Building2, Search, UserCog } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter/filterContainer";
import { Cargos, Empresas } from "../manageUsersTableData";

export default function ManageUsersFilters() {
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
          placeholder="Nome do Usuário"
          state={inputNome}
          setState={setInputNome}
        />
      </Filter>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Building2 className={className} />
          )}
        />
        <Filter.Select
          placeholder="Fornecedor"
          state={selectEmpresa}
          setState={setSelectEmpresa}
        >
          {Empresas.map((empresa, index) => (
            <Filter.SelectItems
              value={empresa.nome}
              key={index}
            ></Filter.SelectItems>
          ))}
        </Filter.Select>
      </Filter>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <UserCog className={className} />
          )}
        />
        <Filter.Select
          placeholder="Cargo"
          state={selectCargo}
          setState={setSelectCargo}
        >
          {Cargos.map((cargo, index) => (
            <Filter.SelectItems
              value={cargo.nome}
              key={index}
            ></Filter.SelectItems>
          ))}
        </Filter.Select>
      </Filter>
    </>
  );
}
