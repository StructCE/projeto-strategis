import { TableComponent } from "~/components/table/tableContainer";
import { type Role, roles } from "../accessProfilesData";
import ManageAccessProfilesFilters from "./manageAccessProfilesFilters/manageAccessProfilesFilters";

type ManageAccessProfilesTableProps = {
  handleDetailsPress: (role: Role) => void;
};

export const ManageAccessProfilesTable = (
  props: ManageAccessProfilesTableProps,
) => {
  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Perfis de Acesso</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um cargo para ver detalhes, editar ou remover
      </TableComponent.Subtitle>
      <TableComponent.FiltersLine>
        <ManageAccessProfilesFilters />
      </TableComponent.FiltersLine>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_4fr_130px]">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Módulos de Acesso
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {roles.map((role, indexRoles) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_4fr_130px] ${
              indexRoles % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={indexRoles}
          >
            <TableComponent.Value>{role.name}</TableComponent.Value>
            <TableComponent.Value>
              {role.modules
                .slice(0, 4)
                .map(
                  (module, i) =>
                    `${module.label}${i < role.modules.slice(0, 4).length - 1 ? ", " : ""}`,
                )}
              {role.modules.length > 4 ? "..." : "."}
            </TableComponent.Value>
            <TableComponent.LineButton
              className="bg-cinza_destaque text-black hover:bg-hover_cinza_destaque"
              handlePress={() => props.handleDetailsPress(role)}
            >
              Detalhes
            </TableComponent.LineButton>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
