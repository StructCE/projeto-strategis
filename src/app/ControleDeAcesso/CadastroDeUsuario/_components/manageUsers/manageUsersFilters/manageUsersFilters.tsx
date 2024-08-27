import { Building2, Search, UserCog } from "lucide-react";
import { Filter } from "~/components/filter";
import { Cargos, Empresas } from "../../usersData";

type ManageUsersFiltersProps = {
  inputNome: string;
  setInputNome: (value: string) => void;
  selectEmpresa: string;
  setSelectEmpresa: (value: string) => void;
  selectCargo: string;
  setSelectCargo: (value: string) => void;
};

export default function ManageUsersFilters(props: ManageUsersFiltersProps) {
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
          state={props.inputNome}
          setState={props.setInputNome}
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
          state={props.selectEmpresa}
          setState={props.setSelectEmpresa}
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
          state={props.selectCargo}
          setState={props.setSelectCargo}
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
