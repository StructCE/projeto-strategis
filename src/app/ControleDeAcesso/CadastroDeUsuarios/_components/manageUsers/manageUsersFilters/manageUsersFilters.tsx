"use client";
import { Building2, Search, UserCog } from "lucide-react";
import { Filter } from "~/components/filter";
import { Cargos, Empresas } from "../../usersData";
import { useManageUsersFilters } from "./useManageUsersFilters";

export default function ManageUsersFilters() {
  const filters = useManageUsersFilters();
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
          state={filters.inputNome}
          setState={filters.setInputNome}
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
          state={filters.selectEmpresa}
          setState={filters.setSelectEmpresa}
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
          state={filters.selectCargo}
          setState={filters.setSelectCargo}
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
