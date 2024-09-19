import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
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
import InventoryDetails from "./inventoryDetails/inventoryDetailsTable";
import ManageInventoriesFilters from "./manageInventoriesFilters/manageInventoriesFilters";

export default function ManageInventoriesTable() {
  return (
    <TableComponent className="gap-3">
      <TableComponent.Title>Histórico de Inventários</TableComponent.Title>
      <TableComponent.FiltersLine>
        <ManageInventoriesFilters />
      </TableComponent.FiltersLine>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2fr_1.5fr_130px]">
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
            className={`grid-cols-[1fr_2fr_1.5fr_130px] ${
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
              <DialogContent className="max-w-7xl overflow-x-auto p-3 pb-5 pt-10 sm:p-6">
                <DialogHeader>
                  <DialogTitle className="w-fit pb-1.5">
                    Informações do {inventory.name}
                  </DialogTitle>
                  <DialogDescription className="w-fit text-base text-black">
                    <p className="w-fit">
                      <span className="font-semibold">Data do Inventário:</span>{" "}
                      {inventory.date}
                    </p>
                    <p className="w-fit">
                      <span className="font-semibold">
                        Responsável pelo Inventário:
                      </span>{" "}
                      {inventory.responsible}
                    </p>
                    <p className="w-fit font-semibold">Contagem:</p>
                  </DialogDescription>

                  <InventoryDetails inventory={inventory} />

                  <TableButtonComponent className="w-fit pt-2 sm:pt-4 lg:w-full">
                    <TableButtonComponent.Button className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao max-[425px]:w-full">
                      Realizar Ajuste de Estoque Automático
                    </TableButtonComponent.Button>
                  </TableButtonComponent>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
