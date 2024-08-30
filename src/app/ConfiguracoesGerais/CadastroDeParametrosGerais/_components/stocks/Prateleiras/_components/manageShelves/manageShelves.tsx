import { TableComponent } from "~/components/table/tableContainer";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { locais } from "../../../../GeneralParametersData";
import { ShelfEditContainer } from "../editShelves/shelvesEditContainer";

export const ManageShelvesTable = () => {
  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2fr_130px]">
          <TableComponent.ValueTitle>Prateleira</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Endereço (Local, Armário/Zona)
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {locais.map((local) =>
          local.armariosZonas.map((armarioZona) =>
            armarioZona.prateleiras.map((prateleira, index) => (
              <TableComponent.Line
                className={`grid-cols-[1fr_2fr_130px] ${
                  index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
                key={index}
              >
                <TableComponent.Value>
                  {prateleira.descricao}
                </TableComponent.Value>
                <TableComponent.Value>
                  {local.descricao}, {armarioZona.descricao}
                </TableComponent.Value>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                      Detalhes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-7xl">
                    <DialogHeader>
                      <DialogTitle className="pb-1.5">
                        Utilize o campo abaixo para editar a prateleira ou o
                        botão para remover
                      </DialogTitle>
                      <ShelfEditContainer {...prateleira} />
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableComponent.Line>
            )),
          ),
        )}
      </TableComponent.Table>
    </TableComponent>
  );
};
