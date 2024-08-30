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
import { CategoriasDoProduto } from "../../../../GeneralParametersData";
import { CategoryEditContainer } from "../editCategories/categoryEditContainer";

export const ManageCategoriesTable = () => {
  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_130px]">
          <TableComponent.ValueTitle>
            Categoria de Produtos
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {CategoriasDoProduto.map((categoria, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{categoria.descricao}</TableComponent.Value>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                  <DialogTitle className="pb-1.5">
                    Utilize o campo abaixo para editar a categoria ou o botão
                    para remover
                  </DialogTitle>
                  <CategoryEditContainer {...categoria} />
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
