"use client";
import { Download, Eraser, Search } from "lucide-react";
import { useState } from "react";
import { stocks } from "~/app/ConfiguracoesGerais/CadastroDeEstoques/_components/stockData";
import { suppliers } from "~/app/ConfiguracoesGerais/CadastroDeFornecedores/_components/supplierData";
import {
  ProductCategories,
  SectorsOfUse,
  TypesOfControl,
} from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import { products } from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { MultiSelect } from "~/components/ui/multi-select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function CustomReports() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const [inputCode, setInputCode] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [selectSuppliers, setSelectSuppliers] = useState<string[]>([]);
  const [selectStock, setSelectStock] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [selectControlType, setSelectControlType] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSector, setSelectSector] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [selectBuyDay, setSelectBuyDay] = useState("");

  const [lowStock, setLowStock] = useState(false);
  const [noStock, setNoStock] = useState(false);

  const [filterBuy, setFilterBuy] = useState(false);
  const [filterDontBuy, setFilterDontBuy] = useState(false);
  const [filterProduce, setFilterProduce] = useState(false);
  const [filterDontProduce, setFilterDontProduce] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCode = inputCode === "" || product.code.includes(inputCode);
    const matchesProduct =
      inputProduct === "" ||
      product.name.toLowerCase().includes(inputProduct.toLowerCase());
    const matchesSupplier =
      selectSuppliers.length === 0 ||
      product.suppliers.some((supplier) =>
        selectSuppliers.includes(supplier.name),
      );
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
    const matchesStatus =
      selectStatus === "" || product.status === selectStatus;
    const matchesBuyDay =
      selectBuyDay === "" || product.buy_day === selectBuyDay;

    const stockCurrent = Number(product.stock_current);
    const stockMin = Number(product.stock_min);
    const stockThreshold = stockMin + stockMin * 0.1;

    const isLowStock = stockCurrent > 0 && stockCurrent <= stockThreshold;
    const isNoStock = stockCurrent === 0;
    const isAdequateStock = stockCurrent > stockThreshold;
    const isProductionProduct =
      product.type_of_control?.description === "Produtos de Produção";

    // Lógica de filtragem baseada nos botões e checkboxes
    if (lowStock) {
      return (
        isLowStock &&
        matchesCode &&
        matchesProduct &&
        matchesSupplier &&
        matchesStock &&
        matchesAddress &&
        matchesControlType &&
        matchesCategory &&
        matchesSector &&
        matchesStatus &&
        matchesBuyDay
      );
    }

    if (noStock) {
      return (
        isNoStock &&
        matchesCode &&
        matchesProduct &&
        matchesSupplier &&
        matchesStock &&
        matchesAddress &&
        matchesControlType &&
        matchesCategory &&
        matchesSector &&
        matchesStatus &&
        matchesBuyDay
      );
    }

    if (filterBuy) {
      return (
        (isLowStock || isNoStock) &&
        matchesCode &&
        matchesProduct &&
        matchesSupplier &&
        matchesStock &&
        matchesAddress &&
        matchesControlType &&
        matchesCategory &&
        matchesSector &&
        matchesStatus &&
        matchesBuyDay
      );
    }

    if (filterDontBuy) {
      return (
        isAdequateStock &&
        matchesCode &&
        matchesProduct &&
        matchesSupplier &&
        matchesStock &&
        matchesAddress &&
        matchesControlType &&
        matchesCategory &&
        matchesSector &&
        matchesStatus &&
        matchesBuyDay
      );
    }

    if (filterProduce) {
      return (
        (isLowStock || isNoStock) &&
        isProductionProduct &&
        matchesCode &&
        matchesProduct &&
        matchesSupplier &&
        matchesStock &&
        matchesAddress &&
        matchesControlType &&
        matchesCategory &&
        matchesSector &&
        matchesStatus &&
        matchesBuyDay
      );
    }

    if (filterDontProduce) {
      return (
        isAdequateStock &&
        isProductionProduct &&
        matchesCode &&
        matchesProduct &&
        matchesSupplier &&
        matchesStock &&
        matchesAddress &&
        matchesControlType &&
        matchesCategory &&
        matchesSector &&
        matchesStatus &&
        matchesBuyDay
      );
    }

    return (
      matchesCode &&
      matchesProduct &&
      matchesSupplier &&
      matchesStock &&
      matchesAddress &&
      matchesControlType &&
      matchesCategory &&
      matchesSector &&
      matchesStatus &&
      matchesBuyDay
    );
  });

  const lowStockProducts = products.filter((product) => {
    const matchesLowStock =
      Number(product.stock_current) > 0 &&
      Number(product.stock_current) <=
        Number(product.stock_min) + Number(product.stock_min) * 0.1;

    return matchesLowStock;
  });

  const noStockProducts = products.filter((product) => {
    const matchesNoStock = Number(product.stock_current) == 0;

    return matchesNoStock;
  });

  function handleProductSelection(
    productCode: string,
    checked: string | boolean,
  ) {
    if (checked) {
      setSelectedProducts((prevSelected) => [...prevSelected, productCode]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((code) => code !== productCode),
      );
    }
  }

  function printSelectedProductData() {
    const productsToPrint = products.filter((product) =>
      selectedProducts.includes(product.code),
    );

    const stockWarningsData = {
      date: new Date(2024, 9, 24)?.toISOString(),
      products: productsToPrint.map((product) => ({
        code: product.code,
        name: product.name,
        suppliers: product.suppliers,
        status: product.status,
        parent_product: product.parent_product ?? "Não tem",
        buy_or_production: product.buy_or_production,
        buy_unit: product.buy_unit,
        buy_quantity: product.buy_quantity,
        buy_day: product.buy_day,
        stock_current: product.stock_current,
        stock_min: product.stock_min,
        stock_max: product.stock_max,
        type_of_control: product.type_of_control,
        product_category: product.product_category,
        sector_of_use: product.sector_of_use,
        address: product.address,
        permission: product.permission,
      })),
    };

    console.log(JSON.stringify(stockWarningsData, null, 2));

    // Exemplo de exportação do pedido como JSON (feito com gpt, verificar se ta tudo certo)
    // const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    //   JSON.stringify(stockWarningsData),
    // )}`;
    // const link = document.createElement("a");
    // link.href = jsonString;
    // link.download = `RelatorioPersonalizado`;
    // link.click();
  }

  return (
    <TableComponent>
      <div className="mb-2 flex justify-between">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2 lg:gap-1">
            <TableComponent.Title>Avisos de Estoque</TableComponent.Title>

            <TableComponent.Subtitle className="w-9/12 text-[12px] leading-tight sm:text-[14px] md:w-11/12">
              Selecione os dados nos filtros abaixo para exportar um relatório
              com dados dos produtos selecionados
            </TableComponent.Subtitle>
          </div>

          <div className="flex flex-col flex-nowrap gap-2 sm:flex-row sm:flex-wrap md:gap-x-6">
            <div className="flex items-center gap-1.5 leading-tight">
              <Checkbox
                onCheckedChange={(checked) => {
                  setFilterBuy(checked === true);
                }}
              />{" "}
              Comprar
            </div>
            <div className="flex items-center gap-1.5 leading-tight">
              <Checkbox
                onCheckedChange={(checked) => {
                  setFilterDontBuy(checked === true);
                }}
              />{" "}
              Não Comprar
            </div>
            <div className="flex items-center gap-1.5 leading-tight">
              <Checkbox
                onCheckedChange={(checked) => {
                  setFilterProduce(checked === true);
                  setSelectControlType(
                    checked === true ? "Produtos de Produção" : "",
                  );
                }}
              />{" "}
              Produzir
            </div>
            <div className="flex items-center gap-1.5 leading-tight">
              <Checkbox
                onCheckedChange={(checked) => {
                  setFilterDontProduce(checked === true);
                  setSelectControlType(
                    checked === true ? "Produtos de Produção" : "",
                  );
                }}
              />{" "}
              Não Produzir
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 lg:flex-nowrap">
          <button
            className="flex h-fit min-w-[130px] flex-col rounded-[10px] bg-vermelho_botao_2 px-4 py-2 text-white md:min-w-[150px]"
            onClick={() => {
              setLowStock(false);
              setNoStock(false);
            }}
          >
            <span className="w-full text-center text-[48px] font-normal leading-none md:text-[64px]">
              {products.length}
            </span>
            <span className="w-full text-center text-[12px] font-semibold md:text-[14px]">
              Itens em Estoque
            </span>
          </button>

          <button
            className="flex h-fit min-w-[130px] flex-col rounded-[10px] bg-vermelho_botao_2 px-4 py-2 text-white md:min-w-[150px]"
            onClick={() => {
              setLowStock(true);
              setNoStock(false);
            }}
          >
            <span className="w-full text-center text-[48px] font-normal leading-none md:text-[64px]">
              {lowStockProducts.length}
            </span>
            <span className="w-full text-center text-[12px] font-semibold md:text-[14px]">
              Estoque Baixo
            </span>
          </button>

          <button
            className="flex h-fit min-w-[130px] flex-col rounded-[10px] bg-vermelho_botao_2 px-4 py-2 text-white md:min-w-[150px]"
            onClick={() => {
              setLowStock(false);
              setNoStock(true);
            }}
          >
            <span className="w-full text-center text-[48px] font-normal leading-none md:text-[64px]">
              {noStockProducts.length}
            </span>
            <span className="w-full text-center text-[12px] font-semibold md:text-[14px]">
              Sem Estoque
            </span>
          </button>
        </div>
      </div>

      <TableComponent.FiltersLine className="mt-1">
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

        <div className="font-inter font-regular m-0 flex h-auto w-full gap-[14px] border-0 border-none bg-transparent p-0 text-[16px] text-black opacity-100 ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[placeholder]:opacity-50 lg:w-auto">
          <MultiSelect
            FilterIcon={Search}
            options={suppliers.flatMap((supplier) => ({
              label: supplier.name,
              value: supplier.name,
            }))}
            onValueChange={setSelectSuppliers}
            defaultValue={selectSuppliers}
            placeholder="Fornecedores"
            variant="inverted"
            maxCount={2}
            className="font-regular font-inter min-h-9 rounded-[12px] border-0 border-none bg-filtro bg-opacity-50 p-0 px-1 text-left text-[16px] text-black ring-0 hover:bg-filtro hover:bg-opacity-50 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-center"
          />
        </div>

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
      </TableComponent.FiltersLine>

      <TableComponent.FiltersLine className="mb-1">
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

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Status"
            state={selectStatus}
            setState={setSelectStatus}
          >
            <Filter.SelectItems value="Ativo"></Filter.SelectItems>
            <Filter.SelectItems value="Inativo"></Filter.SelectItems>
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Dia de Compra"
            state={selectBuyDay}
            setState={setSelectBuyDay}
          >
            <Filter.SelectItems value="Segunda"></Filter.SelectItems>
            <Filter.SelectItems value="Terça"></Filter.SelectItems>
            <Filter.SelectItems value="Quarta"></Filter.SelectItems>
            <Filter.SelectItems value="Quinta"></Filter.SelectItems>
            <Filter.SelectItems value="Sexta"></Filter.SelectItems>
            <Filter.SelectItems value="Sábado"></Filter.SelectItems>
            <Filter.SelectItems value="Domingo"></Filter.SelectItems>
            <Filter.SelectItems value="Qualquer dia"></Filter.SelectItems>
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
                  setSelectSuppliers([]);
                  setSelectStock("");
                  setSelectAddress("");
                  setSelectControlType("");
                  setSelectCategory("");
                  setSelectSector("");
                  setSelectStatus("");
                  setSelectBuyDay("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[85px_70px_1fr_120px_90px_90px_90px_130px] gap-4 md:gap-8">
          <TableComponent.ValueTitle className="text-center">
            Exportar
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center leading-tight">
            Unidade de Compra
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center leading-tight">
            Estoque Atual
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center leading-tight">
            Estoque Mínimo
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Diferença
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {filteredProducts.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[85px_70px_1fr_120px_90px_90px_90px_130px] gap-4 md:gap-8 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value className="text-center">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleProductSelection(product.code, checked)
                }
              />
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.code}
            </TableComponent.Value>
            <TableComponent.Value>{product.name}</TableComponent.Value>
            <TableComponent.Value>
              {product.buy_unit.description} ({product.buy_unit.abbreviation})
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.stock_current}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.stock_min}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {Number(product.stock_current) - Number(product.stock_min) > 0
                ? `+${Number(product.stock_current) - Number(product.stock_min)}`
                : Number(product.stock_current) - Number(product.stock_min)}
            </TableComponent.Value>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-7xl"
              >
                <DialogHeader>
                  <DialogTitle className="pb-1.5">
                    Utilize os campos abaixo para editar os dados do produto ou
                    o botão para remover
                  </DialogTitle>

                  {/* <ProductEdit product={product} /> */}
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>

      <TableButtonComponent className="flex w-fit flex-col justify-end pt-2 sm:pt-4 md:flex-row lg:w-full">
        <TableButtonComponent.Button
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao max-[425px]:w-full"
          icon={
            <Download
              className="flex h-full cursor-pointer self-center"
              size={20}
              strokeWidth={2.2}
              color="white"
            />
          }
          handlePress={printSelectedProductData}
        >
          Exportar Dados em PDF
        </TableButtonComponent.Button>

        <TableButtonComponent.Button
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao max-[425px]:w-full"
          icon={
            <Download
              className="flex h-full cursor-pointer self-center"
              size={20}
              strokeWidth={2.2}
              color="white"
            />
          }
          handlePress={printSelectedProductData}
        >
          Exportar Dados em CSV
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </TableComponent>
  );
}

/*
- Filtrar pelos quadradinhos vermelhos
- Select de qual estoque está trabalhando
*/
