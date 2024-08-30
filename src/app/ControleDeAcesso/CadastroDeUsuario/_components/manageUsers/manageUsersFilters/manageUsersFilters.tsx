import { Building2, Search, UserCog } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter/filterContainer";
import { companies, roles } from "../../usersData";

export default function ManageUsersFilters() {
  const [inputNome, setInputNome] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [selectRole, setSelectRole] = useState("");

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
          placeholder="Empresa"
          state={selectCompany}
          setState={setSelectCompany}
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
          state={selectRole}
          setState={setSelectRole}
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
