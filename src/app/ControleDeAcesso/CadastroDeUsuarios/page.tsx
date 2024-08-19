"use client";
import { TableComponent } from "~/components/table/tableContainer";
import { UserRegisterContainer } from "./_components/userRegisterContainer";

const tabela_usuarios = [
  {
    nome: "Nome do Usuário 1",
    email: "usuario1@gmail.com",
    empresa: "Empresa 1",
    cargo: "Administrador",
  },
  {
    nome: "Nome do Usuário 2",
    email: "usuario2@gmail.com",
    empresa: "Empresa 2",
    cargo: "Operador",
  },
  {
    nome: "Nome do Usuário 3",
    email: "usuario3@gmail.com",
    empresa: "Empresa 3",
    cargo: "Estoquista",
  },
  {
    nome: "Nome do Usuário 4",
    email: "usuario4@gmail.com",
    empresa: "Empresa 4",
    cargo: "Requisitante",
  },
  {
    nome: "Nome do Usuário 5",
    email: "usuario5@gmail.com",
    empresa: "Empresa 5",
    cargo: "Personalizado",
  },
];

export default function CadastroDeUsuarios() {
  function handleDetailsPress(usuario: { email: string }) {
    console.log(`Abre Pop Up do Usuário: ${usuario.email}`);
  }

  return (
    <div className="h-screen w-full bg-[#F2F2F2] p-4 sm:p-8">
      <UserRegisterContainer />
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
          {tabela_usuarios.map((usuario, index) => (
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
    </div>
  );
}
