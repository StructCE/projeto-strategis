import { TableComponent } from "~/components/table/tableContainer";
import { TabelaUsuarios } from "./manageUsersTableData";
import { useUserTable } from "./useUserTabel";

export const ManageUsersContainer = () => {
  const { handleDetailsPress } = useUserTable();

  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Usuários</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um usuário para editar ou remover
      </TableComponent.Subtitle>
      <TableComponent.Subtitle>FILTROS AQUI</TableComponent.Subtitle>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[repeat(4,_1fr)_130px]">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Email</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Cargo</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {TabelaUsuarios.map((usuario, index) => (
          <TableComponent.Line
            className={`grid-cols-[repeat(4,_1fr)_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{usuario.nome}</TableComponent.Value>
            <TableComponent.Value>{usuario.email}</TableComponent.Value>
            <TableComponent.Value>{usuario.empresa}</TableComponent.Value>
            <TableComponent.Value>{usuario.cargo}</TableComponent.Value>
            <TableComponent.LineButton
              className="bg-cinza_destaque text-black hover:bg-hover_cinza_destaque"
              handlePress={() => handleDetailsPress(usuario)}
            >
              Detalhes
            </TableComponent.LineButton>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
