"use client";
import { Building2, Search, UserCog } from "lucide-react";
import { Filter } from "~/components/filter";
import { companies, roles } from "../../usersData";
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
          state={filters.inputName}
          setState={filters.setInputName}
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
          state={filters.selectCompany}
          setState={filters.setSelectCompany}
        >
          {companies.map((company, index) => (
            <Filter.SelectItems
              value={company.name}
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
          state={filters.selectRole}
          setState={filters.setSelectRole}
        >
          {roles.map((role, index) => (
            <Filter.SelectItems
              value={role.name}
              key={index}
            ></Filter.SelectItems>
          ))}
        </Filter.Select>
      </Filter>
    </>
  );
}
