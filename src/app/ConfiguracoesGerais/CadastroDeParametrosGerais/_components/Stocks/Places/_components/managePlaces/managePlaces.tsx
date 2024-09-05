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
import { Places } from "../../../../GeneralParametersData";
import { PlaceEdit } from "./editPlaces/placeEdit";

export const ManagePlacesTable = () => {
  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_3fr_130px]">
          <TableComponent.ValueTitle>Local</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Armários/Zonas (Prateleiras)
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {Places.map((place, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_3fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{place.description}</TableComponent.Value>
            <TableComponent.Value>
              {place.storages.map((storage, index) => (
                <p key={index}>
                  {storage.description} (
                  {storage.shelves.map((shelf) => shelf.description).join(", ")}
                  )
                </p>
              ))}
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
                    Utilize o campo abaixo para editar o local ou o botão para
                    remover
                  </DialogTitle>
                  <PlaceEdit place={place} />
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
