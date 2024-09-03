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
import { products } from "../productsData";
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
        <TableComponent.LineTitle className="grid-cols-[70px_1fr_100px_100px_100px_130px] justify-between gap-7 sm:gap-14">
          <TableComponent.ValueTitle className="text-center">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
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
            className={`grid-cols-[70px_1fr_100px_100px_100px_130px] justify-between gap-7 sm:gap-14 ${
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
              <Input
                defaultValue={product.stock_current}
                className="h-7 bg-cinza_destaque text-center sm:h-8"
                type="number"
              />
            </TableComponent.Value>
            <TableComponent.Value className="items-center justify-center text-center">
              <Input
                defaultValue={product.stock_min}
                className="h-7 bg-cinza_destaque text-center sm:h-8"
                type="number"
              />
            </TableComponent.Value>
            <TableComponent.Value className="items-center justify-center text-center">
              <Input
                defaultValue={product.stock_max}
                className="h-7 bg-cinza_destaque text-center sm:h-8"
                type="number"
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
                  {/* <UserEditContainer {...usuario} /> */}
                  <DialogDescription className="text-md flex flex-col gap-1 text-black">
                    <p>
                      <span className="font-medium">Nome:</span> {product.name}
                    </p>
                    <p>
                      <span className="font-medium">Código:</span>{" "}
                      {product.code}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {product.status.status}
                    </p>
                    <p>
                      <span className="font-medium">Fornecedores:</span>{" "}
                      {product.suppliers.map((fornecedor) => fornecedor.name)}
                    </p>
                    <p>
                      <span className="font-medium">Quantidade de Compra:</span>{" "}
                      {product.buy_quantity}
                    </p>
                    <p>
                      <span className="font-medium">Unidade de Compra:</span>{" "}
                      {product.buy_unit.unit}
                    </p>
                    <p>
                      <span className="font-medium">Dia de Compra:</span>{" "}
                      {product.buy_day.day}
                    </p>
                    <p>
                      <span className="font-medium">Estoque Atual:</span>{" "}
                      {product.stock_current}
                    </p>
                    <p>
                      <span className="font-medium">Estoque Mínimo:</span>{" "}
                      {product.stock_min}
                    </p>
                    <p>
                      <span className="font-medium">Estoque Máxmio:</span>{" "}
                      {product.stock_max}
                    </p>
                    <p>
                      <span className="font-medium">Tipo de Controle:</span>{" "}
                      {product.type_of_control.description}
                    </p>
                    <p>
                      <span className="font-medium">Categoria do Produto:</span>{" "}
                      {product.product_category.description}
                    </p>
                    <p>
                      <span className="font-medium">Setor de Utilização:</span>{" "}
                      {product.sector_of_use.description}
                    </p>
                    <p>
                      <span className="font-medium">Local:</span>{" "}
                      {product.place.description}
                    </p>
                    <p>
                      <span className="font-medium">Armário/Zona:</span>{" "}
                      {product.storage.description}
                    </p>
                    <p>
                      <span className="font-medium">Prateleira:</span>{" "}
                      {product.shelf.description}
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
