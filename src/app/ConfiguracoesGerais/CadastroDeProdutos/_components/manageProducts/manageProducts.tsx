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
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ProductEditContainer } from "../editProducts/productEditContainer";
import { products, units } from "../productsData";
import ManageProductsFilters from "./manageProductsFilters/manageProductsFilters";

export default function ManageProductsTable() {
  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Produtos</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um prouduto para editar ou remover, ou edite nos campos da
        tabela abaixo
      </TableComponent.Subtitle>

      <TableComponent.FiltersLine>
        <ManageProductsFilters />
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[70px_1fr_100px_100px_100px_100px_130px] gap-8">
          <TableComponent.ValueTitle className="text-center">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Unidade
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Atual
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Mínimo
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Máximo
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {products.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[70px_1fr_100px_100px_100px_100px_130px] gap-8 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value className="items-center justify-center text-center">
              {product.code}
            </TableComponent.Value>
            <TableComponent.Value>
              <Input
                defaultValue={product.name}
                className="h-7 bg-cinza_destaque sm:h-8"
              />
            </TableComponent.Value>
            <TableComponent.Value className="items-center justify-center text-center">
              <Select defaultValue={product.buy_unit.unit}>
                <SelectTrigger className="h-7 bg-cinza_destaque text-center sm:h-8">
                  <SelectValue placeholder="Selecione a unidade de compra" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit, index) => (
                    <SelectItem value={unit.unit} key={index}>
                      {unit.unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableComponent.Value>
            <TableComponent.Value className="items-center justify-center text-center">
              <Input
                defaultValue={product.stock_current}
                className="h-7 bg-cinza_destaque text-center sm:h-8"
              />
            </TableComponent.Value>
            <TableComponent.Value className="items-center justify-center text-center">
              <Input
                defaultValue={product.stock_min}
                className="h-7 bg-cinza_destaque text-center sm:h-8"
              />
            </TableComponent.Value>
            <TableComponent.Value className="items-center justify-center text-center">
              <Input
                defaultValue={product.stock_max}
                className="h-7 bg-cinza_destaque text-center sm:h-8"
              />
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
                    Utilize os campos abaixo para editar os dados do produto ou
                    o botão para remover
                  </DialogTitle>
                  <ProductEditContainer {...product} />
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
