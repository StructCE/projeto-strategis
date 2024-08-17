"use client";
import { TableComponent } from "~/components/table/tableContainer";
import { Input } from "~/components/ui/input";

const tabela_produtos = [
  {
    codigo: 235,
    produto: "Guaraná Antartica Zero",
    estoque_atual: 29.0,
    estoque_minimo: 40.0,
    estoque_maximo: 60.0,
  },
  {
    codigo: 236,
    produto: "Guaraná Antartica",
    estoque_atual: 72.0,
    estoque_minimo: 60.0,
    estoque_maximo: 80.0,
  },
  {
    codigo: 237,
    produto: "Produto 3",
    estoque_atual: 50.0,
    estoque_minimo: 40.0,
    estoque_maximo: 60.0,
  },
  {
    codigo: 238,
    produto: "Produto 4",
    estoque_atual: 50.0,
    estoque_minimo: 40.0,
    estoque_maximo: 60.0,
  },
  {
    codigo: 239,
    produto: "Produto 5",
    estoque_atual: 50.0,
    estoque_minimo: 40.0,
    estoque_maximo: 60.0,
  },
];

export default function CadastroDeProdutos() {
  function handleDetailsPress(produto: { codigo: number }) {
    console.log(`Abre Pop Up do Produto: ${produto.codigo}`);
  }

  return (
    <div className="h-screen w-full bg-[#F2F2F2] p-4 sm:p-8">
      <TableComponent>
        <TableComponent.Title>Gerenciar Produtos</TableComponent.Title>
        <TableComponent.Subtitle>
          Selecione um prouduto para editar ou remover, ou edite nos campos da
          tabela abaixo
        </TableComponent.Subtitle>
        <TableComponent.Subtitle>FILTROS AQUI</TableComponent.Subtitle>
        <TableComponent.Table>
          <TableComponent.LineTitle className="grid-cols-[70px_1fr_100px_100px_100px_130px] justify-between gap-7 sm:gap-14">
            <TableComponent.ValueTitle className="items-center justify-center text-center">
              Código
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="items-center justify-center text-center">
              Estoque Atual
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="items-center justify-center text-center">
              Estoque Mínimo
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="items-center justify-center text-center">
              Estoque Máximo
            </TableComponent.ValueTitle>
            <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
          </TableComponent.LineTitle>
          {tabela_produtos.map((produto, index) => (
            <TableComponent.Line
              className={`grid-cols-[70px_1fr_100px_100px_100px_130px] justify-between gap-7 sm:gap-14 ${
                index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
              }`}
              key={index}
            >
              <TableComponent.Value className="items-center justify-center text-center">
                {produto.codigo}
              </TableComponent.Value>
              <TableComponent.Value>
                <Input
                  value={produto.produto}
                  className="h-7 bg-cinza_destaque sm:h-8"
                />
              </TableComponent.Value>
              <TableComponent.Value className="items-center justify-center text-center">
                <Input
                  value={produto.estoque_atual}
                  className="h-7 bg-cinza_destaque text-center sm:h-8"
                  type="number"
                />
              </TableComponent.Value>
              <TableComponent.Value className="items-center justify-center text-center">
                <Input
                  value={produto.estoque_minimo}
                  className="h-7 bg-cinza_destaque text-center sm:h-8"
                  type="number"
                />
              </TableComponent.Value>
              <TableComponent.Value className="items-center justify-center text-center">
                <Input
                  value={produto.estoque_maximo}
                  className="h-7 bg-cinza_destaque text-center sm:h-8"
                  type="number"
                />
              </TableComponent.Value>
              <TableComponent.LineButton
                className="hover:bg-hover_cinza_destaque bg-cinza_destaque text-black"
                handlePress={() => handleDetailsPress(produto)}
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
