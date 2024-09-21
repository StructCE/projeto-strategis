import { TableComponent } from "~/components/table";
import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { saidas } from "../exitsData";
import ExitsHistoryFilters from "./exitsHistoryFilters/exitsHistoryFilters";

export default function ExitsHistory() {
  return (
    <TableComponent>
      <TableComponent.Title>Histórico de Saídas</TableComponent.Title>

      <TableComponent.FiltersLine>
        <ExitsHistoryFilters />
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[repeat(5,_1fr)_130px]">
          <TableComponent.ValueTitle>Número</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Data</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Responsável</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Solicitante</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Área</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {saidas.map((saida, index) => (
          <TableComponent.Line
            className={`grid-cols-[repeat(5,_1fr)_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{saida.numero}</TableComponent.Value>
            <TableComponent.Value>{saida.data}</TableComponent.Value>
            <TableComponent.Value>{saida.responsavel}</TableComponent.Value>
            <TableComponent.Value>{saida.requisitante}</TableComponent.Value>
            <TableComponent.Value>{saida.area}</TableComponent.Value>
            <TableComponent.Value>
              <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                Detalhes
              </Button>
            </TableComponent.Value>

            {/* <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                  <DialogTitle className="pb-1.5">
                    Utilize os campos abaixo para editar os dados do usuário ou
                    o botão para remover
                  </DialogTitle>
                  <UserEdit user={user} />
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
