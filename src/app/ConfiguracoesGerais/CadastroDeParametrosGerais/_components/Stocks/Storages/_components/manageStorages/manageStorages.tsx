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
import { storages } from "../../../../GeneralParametersData";
import { StorageEdit } from "./editStorages/storageEdit";

export const ManageStoragesTable = () => {
  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2fr_130px]">
          <TableComponent.ValueTitle>Armário/Zona</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Prateleiras</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {storages.map((storage, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_2fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{storage.description}</TableComponent.Value>
            <TableComponent.Value>
              {storage.shelves.map((shelf) => shelf.description).join(", ")}
            </TableComponent.Value>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-7xl"
              >
                <DialogHeader>
                  <DialogTitle className="pb-1.5">
                    Utilize o campo abaixo para editar o armário/zona ou o botão
                    para remover
                  </DialogTitle>
                  <StorageEdit storage={storage} />
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
