import { Eraser, Search } from "lucide-react";
import { useState } from "react";
import { stocks } from "~/app/ConfiguracoesGerais/CadastroDeEstoques/_components/stockData";
import {
  ProductCategories,
  SectorsOfUse,
  TypesOfControl,
} from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import { Filter } from "~/components/filter";
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
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { products, units } from "../productsData";
import { ProductEdit } from "./editProducts/productEdit";

export default function ManageProductsTable() {
  const [inputCode, setInputCode] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [selectStock, setSelectStock] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [selectControlType, setSelectControlType] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSector, setSelectSector] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCode = inputCode === "" || product.code.includes(inputCode);
    const matchesProduct =
      inputProduct === "" ||
      product.name.toLowerCase().includes(inputProduct.toLowerCase());
    const matchesStock =
      selectStock === "" ||
      `${product.address.stock}`
        .toLowerCase()
        .includes(selectStock.toLowerCase());
    const matchesAddress =
      selectAddress === "" ||
      `${product.address.storage}, ${product.address.shelf}`
        .toLowerCase()
        .includes(selectAddress.toLowerCase());
    const matchesControlType =
      selectControlType === "" ||
      product.type_of_control?.description === selectControlType;
    const matchesCategory =
      selectCategory === "" ||
      product.product_category?.description === selectCategory;
    const matchesSector =
      selectSector === "" ||
      product.sector_of_use?.description === selectSector;

    return (
      matchesCode &&
      matchesProduct &&
      matchesStock &&
      matchesAddress &&
      matchesControlType &&
      matchesCategory &&
      matchesSector
    );
  });

  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Produtos</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um prouduto para editar ou remover, ou edite nos campos da
        tabela abaixo
      </TableComponent.Subtitle>

      <TableComponent.FiltersLine>
        <Filter className="lg:w-[130px]">
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Código"
            state={inputCode}
            setState={setInputCode}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Produto"
            state={inputProduct}
            setState={setInputProduct}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Estoque"
            state={selectStock}
            setState={setSelectStock}
          >
            {stocks.map((stock, index) => (
              <Filter.SelectItems
                key={index}
                value={stock.name}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Endereço"
            state={selectAddress}
            setState={setSelectAddress}
            className={
              selectStock === "" ? "cursor-not-allowed opacity-50" : ""
            }
          >
            {selectStock === ""
              ? [
                  <Filter.SelectItems
                    key="0"
                    value="Selecione um estoque primeiro"
                  ></Filter.SelectItems>,
                ]
              : stocks
                  .filter((stock) => stock.name === selectStock)
                  .flatMap((stock) =>
                    stock.address.flatMap((address) =>
                      address.shelves.map((shelf, index) => (
                        <Filter.SelectItems
                          key={index}
                          value={`${address.description}, ${shelf.description}`}
                        ></Filter.SelectItems>
                      )),
                    ),
                  )}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Tipo de Controle"
            state={selectControlType}
            setState={setSelectControlType}
          >
            {TypesOfControl.map((type, index) => (
              <Filter.SelectItems
                key={index}
                value={type.description}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Categoria"
            state={selectCategory}
            setState={setSelectCategory}
          >
            {ProductCategories.map((category, index) => (
              <Filter.SelectItems
                key={index}
                value={category.description}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Setor de Uso"
            state={selectSector}
            setState={setSelectSector}
          >
            {SectorsOfUse.map((sector, index) => (
              <Filter.SelectItems
                key={index}
                value={sector.description}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setInputCode("");
                  setInputProduct("");
                  setSelectStock("");
                  setSelectAddress("");
                  setSelectControlType("");
                  setSelectCategory("");
                  setSelectSector("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Limpar filtros</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        {filteredProducts.map((product, index) => (
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
                  <ProductEdit product={product} />
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
