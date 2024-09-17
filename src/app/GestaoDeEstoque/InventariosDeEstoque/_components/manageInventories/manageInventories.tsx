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
import { inventories } from "../inventoriesData";
import ManageInventoriesFilters from "./manageInventoriesFilters/manageInventoriesFilters";

export default function ManageInventoriesTable() {
  return (
    <TableComponent className="gap-3">
      <TableComponent.Title>Histórico de Inventários</TableComponent.Title>
      <TableComponent.FiltersLine>
        <ManageInventoriesFilters />
      </TableComponent.FiltersLine>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2.5fr_2fr_130px]">
          <TableComponent.ValueTitle>
            Data do Inventário
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Nome do Inventário
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Responsável pelo Inventário
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {inventories.map((inventory, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_2.5fr_2fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{inventory.date}</TableComponent.Value>
            <TableComponent.Value>{inventory.name}</TableComponent.Value>
            <TableComponent.Value>{inventory.responsible}</TableComponent.Value>
            <Dialog>
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
                  {/* <UserEdit user={user} /> */}
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
