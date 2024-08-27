import { TableComponent } from "~/components/table";
import ManageAccessProfilesFiltersContainer from "./manageAccessProfilesFilters/manageAccessProfilesFiltersContainer";
import { TabelaCargos } from "./manageAccessProfilesTableData";

type ManageAccessProfilesTableProps = {
  handleDetailsPress: ({ nome }: { nome: string }) => void;
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
        <ManageAccessProfilesFiltersContainer />
      </TableComponent.FiltersLine>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_3fr_130px]">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Módulos de Acesso
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {TabelaCargos.map((cargo, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_3fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{cargo.nome}</TableComponent.Value>
            <TableComponent.Value>
              {cargo.modulos.length > 4
                ? `${cargo.modulos.slice(0, 4).join(", ")}...`
                : cargo.modulos.join(", ")}
            </TableComponent.Value>
            <TableComponent.LineButton
              className="bg-cinza_destaque text-black hover:bg-hover_cinza_destaque"
              handlePress={() => props.handleDetailsPress(cargo)}
            >
              Detalhes
            </TableComponent.LineButton>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
