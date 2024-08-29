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
import { PlaceEditContainer } from "../editPlaces/placeEditContainer";

export const ManagePlacesTable = () => {
  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2fr_130px]">
          <TableComponent.ValueTitle>Local</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Armários/Zonas (Prateleiras)
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {locais.map((local, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_2fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{local.descricao}</TableComponent.Value>
            <TableComponent.Value>
              {local.armariosZonas.map((armario_zona, index) => (
                <p key={index}>
                  {armario_zona.descricao} (
                  {armario_zona.prateleiras
                    .map((prateleira) => prateleira.descricao)
                    .join(", ")}
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
                  <PlaceEditContainer {...local} />
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
