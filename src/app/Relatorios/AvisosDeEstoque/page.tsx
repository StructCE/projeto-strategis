"use client";
import { Check, Download, Eraser, Search, X } from "lucide-react";
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
import ProductDetails from "./_components/productDetails";

export default function CustomReports() {
  // Checkboxes dos produtos
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Filtros
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

  // Cards de contagem
  const [lowStock, setLowStock] = useState(false);
  const [noStock, setNoStock] = useState(false);

  // Checkboxes de filtros
  const [filterBuy, setFilterBuy] = useState(false);
  const [filterDontBuy, setFilterDontBuy] = useState(false);
  const [filterProduce, setFilterProduce] = useState(false);
  const [filterDontProduce, setFilterDontProduce] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      // Se nenhum estoque for selecionado, não mostrar nenhum produto
      if (selectStock === "") {
        return false;
      }

      const stockCurrent = Number(product.stock_current);
      const stockMin = Number(product.stock_min);
      const stockThreshold = stockMin + stockMin * 0.1; // 110% do estoque mínimo

      // Verifica se o produto está com estoque baixo
      const isLowStock = stockCurrent > 0 && stockCurrent <= stockThreshold;
      const isNoStock = stockCurrent === 0;
      const isAdequateStock = stockCurrent > stockThreshold;

      // Filtros auxiliares
      const matchesCode = inputCode === "" || product.code.includes(inputCode);
      const matchesProduct =
        inputProduct === "" ||
        product.name.toLowerCase().includes(inputProduct.toLowerCase());
      const matchesSupplier =
        selectSuppliers.length === 0 ||
        product.suppliers.some((supplier) =>
          selectSuppliers.includes(supplier.name),
        );
      const matchesStock = `${product.address.stock}`
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

      const filterConditions = []; // Filtros de estoque com base nos botões e checkboxes

      if (lowStock) filterConditions.push(isLowStock);
      if (noStock) filterConditions.push(isNoStock);
      if (filterBuy) filterConditions.push(isLowStock || isNoStock);
      if (filterDontBuy) filterConditions.push(isAdequateStock);
      if (filterProduce)
        filterConditions.push(
          (isLowStock || isNoStock) &&
            product.type_of_control?.description === "Produtos de Produção",
        );
      if (filterDontProduce)
        filterConditions.push(
          isAdequateStock &&
            product.type_of_control?.description === "Produtos de Produção",
        );

      const satisfiesStockFilters =
        filterConditions.length === 0 || filterConditions.some(Boolean);

      return (
        satisfiesStockFilters &&
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
    })
    .sort((a, b) => a.code.localeCompare(b.code));

  // Produtos com estoque baixo (para contagem)
  const allProducts = products.filter((product) => {
    const matchesStock = product.address.stock === selectStock;

    return matchesStock;
  });

  // Produtos com estoque baixo (para contagem)
  const lowStockProducts = products.filter((product) => {
    const matchesLowStock =
      Number(product.stock_current) > 0 &&
      Number(product.stock_current) <=
        Number(product.stock_min) + Number(product.stock_min) * 0.1;

    const matchesStock = product.address.stock === selectStock;

    return matchesLowStock && matchesStock;
  });

  // Produtos sem estoque (para contagem)
  const noStockProducts = products.filter((product) => {
    const matchesNoStock = Number(product.stock_current) === 0;

    const matchesStock = product.address.stock === selectStock;

    return matchesNoStock && matchesStock;
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

  function handleSelectAll() {
    const allFilteredProductCodes = filteredProducts.map(
      (product) => product.code,
    );
    setSelectedProducts(allFilteredProductCodes);
  }

  function handleDeselectAll() {
    setSelectedProducts([]);
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
        users_with_permission: product.users_with_permission,
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

            <div className="mb-6 mt-2 flex items-center gap-3">
              <TableComponent.Subtitle className="w-1/2 leading-tight md:w-[45%]">
                Selecione um estoque para ver avisos e selecionar produtos para
                exportar um relatório:
              </TableComponent.Subtitle>

              {/* Select do estoque a visualizar */}
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
            </div>
          </div>

          {/* Checkboxes de filtragem */}
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
                }}
              />{" "}
              Produzir
            </div>
            <div className="flex items-center gap-1.5 leading-tight">
              <Checkbox
                onCheckedChange={(checked) => {
                  setFilterDontProduce(checked === true);
                }}
              />{" "}
              Não Produzir
            </div>
          </div>
        </div>

        {/* Cards com números dos produtos em estoque */}
        <div className="flex flex-wrap items-center justify-end gap-3 lg:flex-nowrap">
          <button
            className="flex h-fit min-w-[130px] flex-col rounded-[10px] bg-vermelho_botao_2 px-4 py-2 text-white hover:bg-hover_vermelho_botao_2 md:min-w-[150px]"
            onClick={() => {
              setLowStock(false);
              setNoStock(false);
            }}
          >
            <span className="w-full text-center text-[48px] font-normal leading-none md:text-[64px]">
              {allProducts.length}
            </span>
            <span className="w-full text-center text-[12px] font-semibold md:text-[14px]">
              Itens em Estoque
            </span>
          </button>

          <button
            className="flex h-fit min-w-[130px] flex-col rounded-[10px] bg-vermelho_botao_2 px-4 py-2 text-white hover:bg-hover_vermelho_botao_2 md:min-w-[150px]"
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
            className="flex h-fit min-w-[130px] flex-col rounded-[10px] bg-vermelho_botao_2 px-4 py-2 text-white hover:bg-hover_vermelho_botao_2 md:min-w-[150px]"
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

          {/* <div className="flex h-fit min-w-[130px] flex-col rounded-[10px] bg-vermelho_botao_2 px-4 py-2 text-white md:min-w-[150px]">
            <span className="w-full text-center text-[48px] font-normal leading-none md:text-[64px]">
              {selectedProducts.length}
            </span>
            <span className="w-full text-center text-[12px] font-semibold md:text-[14px]">
              Selecionados
            </span>
          </div> */}
        </div>
      </div>

      {/* Filtros linha 1 */}
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
            placeholder="Endereço no estoque"
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

      {/* Filtros linha 2 */}
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

      {/* Botões de selecionar todos e remover todos */}
      <div className="mt-2 flex items-center gap-3">
        <Button
          className="flex h-fit items-center gap-2 rounded-[8px] bg-cinza_destaque py-1.5 pl-3 pr-4 text-[14px] text-black hover:bg-hover_cinza_destaque_escuro"
          onClick={handleSelectAll}
        >
          <Check size={18} className="flex items-center" />
          Selecionar Todos
        </Button>
        <Button
          className="flex h-fit items-center gap-2 rounded-[8px] bg-cinza_destaque py-1.5 pl-3 pr-4 text-[14px] text-black hover:bg-hover_cinza_destaque_escuro"
          onClick={handleDeselectAll}
        >
          <X size={18} className="flex items-center" />
          Remover Seleção
        </Button>
        <div>Produtos Selecionados: {selectedProducts.length}</div>
      </div>

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

        {selectStock === "" ? (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Selecione um estoque para ver seus produtos
            </TableComponent.Value>
          </TableComponent.Line>
        ) : (
          filteredProducts.map((product, index) => (
            <TableComponent.Line
              className={`grid-cols-[85px_70px_1fr_120px_90px_90px_90px_130px] gap-4 md:gap-8 ${
                index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
              }`}
              key={index}
            >
              <TableComponent.Value className="text-center">
                <Checkbox
                  checked={selectedProducts.includes(product.code)}
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
                  <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                    Detalhes
                  </Button>
                </DialogTrigger>
                <DialogContent
                  aria-describedby={undefined}
                  className="sm:max-w-4xl"
                >
                  <DialogHeader>
                    <DialogTitle className="pb-1.5">
                      Informações do Produto:
                    </DialogTitle>

                    <ProductDetails product={product} />
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TableComponent.Line>
          ))
        )}
      </TableComponent.Table>

      <TableButtonComponent className="flex w-fit flex-col justify-end pt-2 sm:pt-4 md:flex-row lg:w-full">
        <TableButtonComponent.Button
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1 max-[425px]:w-full"
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
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1 max-[425px]:w-full"
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
