"use client";

// Third-party imports
import {
  CalendarIcon,
  Eraser,
  FilePenLine,
  Info,
  Search,
  Trash2,
  UserCog2,
} from "lucide-react";
import { useState } from "react";

// UI Components
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
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

// API and data imports
import { api } from "~/trpc/react";
import { adjustment_reasons } from "../_components/adjustmentsData";

// import { stocks } from "~/app/ConfiguracoesGerais/CadastroDeEstoques/_components/stockData";
// import {
//   productCategories,
//   useSectors,
//   controlTypes,
// } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
// import {
//   products,
//   type Product,
// } from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";

import type {
  ProductWithFeatures as Product,
  ProductWithFeatures,
} from "~/server/interfaces/product/product.route.interfaces";

function convertToFlatProductWithFeatures(products: ProductWithFeatures[]) {
  return products.map((product) => {
    const { shelf } = product;
    const firstStockCabinet = shelf?.cabinet?.StockCabinet[0]?.stock;

    return {
      ...product,
      adress: {
        shelf: {
          id: shelf.id,
          name: shelf.name,
        },
        cabinet: {
          id: shelf.cabinet.id,
          name: shelf.cabinet.name,
        },
        stock: {
          id: firstStockCabinet?.id ?? "",
          name: firstStockCabinet?.name ?? "",
          companyId: firstStockCabinet?.companyId ?? "",
          legalResponsibleId: firstStockCabinet?.legalResponsibleId ?? "",
        },
      },
    };
  });
}

export default function CreateAdjustment() {
  const { data: productCategories = [] } =
    api.generalParameters.productCategory.getAll.useQuery();
  const { data: useSectors = [] } =
    api.generalParameters.useSector.getAll.useQuery();
  const { data: controlTypes = [] } =
    api.generalParameters.controlType.getAll.useQuery();

  const { data: productsRawData = [] } = api.product.getAll.useQuery();
  const products = convertToFlatProductWithFeatures(productsRawData);

  const { data: stocks = [] } = api.stock.getAllStocks.useQuery({});

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");

  const [inputCode, setInputCode] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [selectStock, setSelectStock] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [selectControlType, setSelectControlType] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSector, setSelectSector] = useState("");

  const [addedProducts, setAddedProducts] = useState<Product[]>([]);
  const [adjustedStock, setAdjustedStock] = useState<Record<string, string>>(
    {},
  );
  const [adjustmentReasons, setAdjustmentReasons] = useState<
    Record<string, string>
  >({});

  const areAllFiltersEmpty =
    inputCode === "" &&
    inputProduct === "" &&
    selectStock === "" &&
    selectAddress === "" &&
    selectControlType === "" &&
    selectCategory === "" &&
    selectSector === "";

  // Função para filtrar produtos
  const filteredProducts = areAllFiltersEmpty
    ? []
    : products.filter((product) => {
        const matchesCode =
          inputCode === "" || product.code.includes(inputCode);
        const matchesProduct =
          inputProduct === "" ||
          product.name.toLowerCase().includes(inputProduct.toLowerCase());
        const matchesStock =
          selectStock === "" ||
          product.shelf.cabinet.StockCabinet.some((stockCabinet) =>
            stockCabinet.stock.name
              .toLowerCase()
              .includes(selectStock.toLowerCase()),
          );
        const matchesAddress =
          selectAddress === "" ||
          `${product.adress.cabinet.name}, ${product.adress.shelf.name}`
            .toLowerCase()
            .includes(selectAddress.toLowerCase());
        const matchesControlType =
          selectControlType === "" ||
          product.controlType?.name === selectControlType;
        const matchesCategory =
          selectCategory === "" || product.category?.name === selectCategory;
        const matchesSector =
          selectSector === "" || product.sectorOfUse?.name === selectSector;

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

  // Função para adicionar produtos ao ajuste
  const handleAddProduct = (product: Product) => {
    setAddedProducts((prev) => [...prev, product]);
  };

  // Função para remover produtos do ajuste
  const handleRemoveProduct = (productCode: string) => {
    setAddedProducts((prev) =>
      prev.filter((product) => product.code !== productCode),
    );
    setAdjustedStock((prev) => {
      const newAdjustedStock = { ...prev };
      delete newAdjustedStock[productCode];
      return newAdjustedStock;
    });
  };

  // Função para atualizar a quantidade de um produto específico
  const handleAdjustedStockChange = (productCode: string, value: string) => {
    setAdjustedStock((prev) => ({
      ...prev,
      [productCode]: value,
    }));
  };

  const handleAdjustmentReasonChange = (productCode: string, value: string) => {
    setAdjustmentReasons((prev) => ({
      ...prev,
      [productCode]: value,
    }));
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const formatResponsibleName = (name: string) => {
    const withoutAccents = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const formattedName = withoutAccents.replace(/\s+/g, "");
    return formattedName;
  };

  // Função para finalizar o ajuste
  const handleFinalizeAdjustment = () => {
    const adjustmentData = {
      responsible: inputResponsible,
      date: date?.toISOString(),
      products: addedProducts.map((product) => ({
        code: product.code,
        name: product.name,
        currentStock: product.currentStock,
        stock_adjusted: adjustedStock[product.code] ?? 0,
        adjustment_reason:
          adjustmentReasons[product.code] ?? "Sem motivo informado",
      })),
    };

    console.log(JSON.stringify(adjustmentData, null, 2));

    // const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    //   JSON.stringify(adjustmentData),
    // )}`;
    // const link = document.createElement("a");
    // link.href = jsonString;
    // link.download = `Ajuste_${formatDate(date ?? new Date())}_${formatResponsibleName(inputResponsible)}`;
    // link.click();
  };

  return (
    <div className="flex w-full flex-col bg-fundo_branco">
      <TableComponent className="gap-2">
        <TableComponent.Title>Realizar Ajuste de Estoque</TableComponent.Title>

        <TableComponent.Subtitle>
          Preencha os campos abaixo com a data do ajuste e o nome do
          responsável.
        </TableComponent.Subtitle>

        {/* Inputs da data e do responsável pelo ajuste */}
        <TableComponent.FiltersLine>
          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <CalendarIcon className={className} />
              )}
            />
            <Filter.DatePicker
              className="text-sm sm:text-base"
              date={date}
              setDate={setDate}
              open={open}
              setOpen={setOpen}
            ></Filter.DatePicker>
          </Filter>

          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px] lg:w-[250px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <UserCog2 className={className} />
              )}
            />
            <Filter.Input
              className="text-sm sm:text-base"
              placeholder="Responsável"
              state={inputResponsible}
              setState={setInputResponsible}
            />
          </Filter>
        </TableComponent.FiltersLine>

        <TableComponent.Subtitle>
          Selecione produtos do estoque para fazer ajuste de estoque.
        </TableComponent.Subtitle>

        <TableComponent.FiltersLine>
          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px] lg:w-[130px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Input
              className="text-sm sm:text-base"
              placeholder="Código"
              state={inputCode}
              setState={setInputCode}
            />
          </Filter>

          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Input
              className="text-sm sm:text-base"
              placeholder="Produto"
              state={inputProduct}
              setState={setInputProduct}
            />
          </Filter>

          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Select
              className="text-sm sm:text-base"
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

          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px]">
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
                selectStock === ""
                  ? "cursor-not-allowed text-sm opacity-50 sm:text-base"
                  : "text-sm sm:text-base"
              }
            >
              {selectStock === ""
                ? [
                    <Filter.SelectItems
                      key="0"
                      value="Selecione um estoque primeiro"
                    />,
                  ]
                : stocks
                    .filter((stock) => stock.name === selectStock)
                    .flatMap((stock) =>
                      stock.cabinets.flatMap((cabinet) =>
                        cabinet.shelves.map((shelf, index) => (
                          <Filter.SelectItems
                            key={index}
                            value={`${cabinet.name}, ${shelf.name}`}
                          />
                        )),
                      ),
                    )}
            </Filter.Select>
          </Filter>
        </TableComponent.FiltersLine>

        <TableComponent.FiltersLine>
          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Select
              className="text-sm sm:text-base"
              placeholder="Tipo de Controle"
              state={selectControlType}
              setState={setSelectControlType}
            >
              {controlTypes.map((type, index) => (
                <Filter.SelectItems
                  key={index}
                  value={type.name}
                ></Filter.SelectItems>
              ))}
            </Filter.Select>
          </Filter>

          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Select
              className="text-sm sm:text-base"
              placeholder="Categoria"
              state={selectCategory}
              setState={setSelectCategory}
            >
              {productCategories.map((category, index) => (
                <Filter.SelectItems
                  key={index}
                  value={category.name}
                ></Filter.SelectItems>
              ))}
            </Filter.Select>
          </Filter>

          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Select
              className="text-sm sm:text-base"
              placeholder="Setor de Uso"
              state={selectSector}
              setState={setSelectSector}
            >
              {useSectors.map((sector, index) => (
                <Filter.SelectItems
                  key={index}
                  value={sector.name}
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
              <TooltipContent side="right">Limpar filtros</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableComponent.FiltersLine>

        {/* TELAS GRANDES */}
        <TableComponent.Table className="hidden sm:block">
          <TableComponent.LineTitle className="grid-cols-[70px_1.5fr_130px_1fr_130px] gap-16">
            <TableComponent.ValueTitle className="text-center">
              Código
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center">
              Quantidade em Estoque
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle>
              Endereço do Estoque
            </TableComponent.ValueTitle>
            <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
          </TableComponent.LineTitle>

          {areAllFiltersEmpty && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Utilize os filtros acima para encontrar produtos cadastrados no
                estoque
              </TableComponent.Value>
            </TableComponent.Line>
          )}
          {!areAllFiltersEmpty && filteredProducts.length === 0 && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum produto encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )}
          {!areAllFiltersEmpty &&
            filteredProducts.map((product, index) => (
              <TableComponent.Line
                className={`grid-cols-[70px_1.5fr_130px_1fr_130px] gap-16 ${
                  index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
                key={index}
              >
                <TableComponent.Value className="text-center">
                  {product.code}
                </TableComponent.Value>
                <TableComponent.Value>{product.name}</TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {product.currentStock}
                </TableComponent.Value>
                <TableComponent.Value>
                  {`${product.address.stock}, ${product.address.storage}, ${product.address.shelf}`}
                </TableComponent.Value>
                <Button
                  onClick={() => handleAddProduct(product)}
                  className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-hover_preto sm:text-[16px]"
                >
                  Adicionar
                </Button>
              </TableComponent.Line>
            ))}
        </TableComponent.Table>

        {/*  TELAS PEQUENAS */}
        <TableComponent.Table className="block sm:hidden">
          <TableComponent.LineTitle className="w-full min-w-[0px] grid-cols-[40px_1fr_24px] gap-3 px-3">
            <TableComponent.ValueTitle className="text-center text-[15px]">
              Cód.
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-[15px]">
              Produto
            </TableComponent.ValueTitle>
            <TableComponent.ButtonSpace className="w-[24px]"></TableComponent.ButtonSpace>
          </TableComponent.LineTitle>

          {areAllFiltersEmpty && (
            <TableComponent.Line className="w-full min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Utilize os filtros acima para encontrar produtos cadastrados no
                estoque
              </TableComponent.Value>
            </TableComponent.Line>
          )}
          {!areAllFiltersEmpty && filteredProducts.length === 0 && (
            <TableComponent.Line className="w-full min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum produto encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )}
          {!areAllFiltersEmpty &&
            filteredProducts.map((product, index) => (
              <TableComponent.Line
                className={`w-full min-w-[0px] grid-cols-[40px_1fr_24px] gap-3 px-3 ${
                  index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
                key={index}
              >
                <TableComponent.Value className="text-center text-[14px]">
                  {product.code}
                </TableComponent.Value>
                <TableComponent.Value className="text-[14px]">
                  {product.name}
                </TableComponent.Value>

                <Dialog>
                  <DialogTrigger asChild>
                    {/* <Button className="mb-0 h-8 w-fit bg-cinza_destaque text-[13px] font-medium text-black hover:bg-hover_cinza_destaque_escuro">
              Detalhes
            </Button> */}
                    <Info size={24} />
                  </DialogTrigger>
                  <DialogContent
                    aria-describedby={undefined}
                    className="w-full gap-2 p-5"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-left text-xl">
                        Ajuste do Produto
                      </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex flex-col gap-1 text-left text-black">
                      <p className="text-base">
                        <span className="font-semibold">Código: </span>{" "}
                        {product.code}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Produto: </span>{" "}
                        {product.name}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">
                          Endereço de Estoque:
                        </span>{" "}
                        {`${product.address.stock}, ${product.address.storage}, ${product.address.shelf}`}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Atual: </span>
                        {product.currentStock}
                      </p>
                      <div className="my-1 text-base">
                        <span className="font-semibold">
                          Estoque Ajustado:{" "}
                        </span>
                        <Input
                          type="number"
                          value={adjustedStock[product.code] ?? ""}
                          onChange={(e) =>
                            handleAdjustedStockChange(
                              product.code,
                              e.target.value,
                            )
                          }
                          className="h-8 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8"
                        ></Input>
                      </div>
                      <p className="text-base">
                        <span className="font-semibold">Diferença: </span>
                        {Number(adjustedStock[product.code] ?? 0) -
                          Number(product.currentStock)}
                      </p>
                      <div className="my-1 text-base">
                        <span className="font-semibold">Descrição: </span>
                        <Select
                          onValueChange={(value) =>
                            handleAdjustmentReasonChange(product.code, value)
                          }
                          defaultValue={adjustmentReasons[product.code] ?? ""}
                        >
                          <SelectTrigger className="h-8 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8">
                            <SelectValue placeholder="Motivo do ajuste" />
                          </SelectTrigger>
                          <SelectContent>
                            {adjustment_reasons.map((reason, index) => (
                              <SelectItem
                                key={index}
                                value={reason.description}
                              >
                                {reason.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mt-3 flex w-full justify-end">
                        <Button
                          onClick={() => handleAddProduct(product)}
                          className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-hover_preto sm:text-[16px]"
                        >
                          Adicionar
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </TableComponent.Line>
            ))}
        </TableComponent.Table>

        <TableComponent.Title className="mt-2">
          Ajuste de Estoque
        </TableComponent.Title>

        {/* TELAS GRANDES */}
        <TableComponent.Table className="hidden sm:block">
          <TableComponent.LineTitle className="grid-cols-[70px_1.5fr_100px_100px_92px_1fr_86px] gap-6 sm:px-[16px]">
            <TableComponent.ValueTitle className="text-center text-base sm:text-[18px]">
              Código
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-base sm:text-[18px]">
              Produto
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-base sm:text-[18px]">
              Estoque Antigo
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-base sm:text-[18px]">
              Estoque Ajustado
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-base sm:text-[18px]">
              Diferença
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-base sm:text-[18px]">
              Descrição
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-base sm:text-[18px]">
              Remover
            </TableComponent.ValueTitle>
          </TableComponent.LineTitle>

          {addedProducts.length === 0 ? (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Adicione produtos para criar um ajuste de estoque
              </TableComponent.Value>
            </TableComponent.Line>
          ) : (
            addedProducts.map((product, index) => (
              <TableComponent.Line
                className={`grid-cols-[70px_1.5fr_100px_100px_92px_1fr_86px] gap-6 sm:px-[16px] ${
                  index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
                key={index}
              >
                <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                  {product.code}
                </TableComponent.Value>
                <TableComponent.Value className="text-[13px] sm:text-[15px]">
                  {product.name}
                </TableComponent.Value>
                <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                  {product.currentStock}
                </TableComponent.Value>
                <TableComponent.Value className="px-2 text-center text-[13px] sm:text-[15px]">
                  <Input
                    type="number"
                    value={adjustedStock[product.code] ?? ""}
                    onChange={(e) =>
                      handleAdjustedStockChange(product.code, e.target.value)
                    }
                    className="h-7 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8"
                  ></Input>
                </TableComponent.Value>
                <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                  {Number(adjustedStock[product.code] ?? 0) -
                    Number(product.currentStock)}
                </TableComponent.Value>
                <TableComponent.Value className="text-[13px] sm:text-[15px]">
                  <Select
                    onValueChange={(value) =>
                      handleAdjustmentReasonChange(product.code, value)
                    }
                  >
                    <SelectTrigger className="h-7 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8">
                      <SelectValue placeholder="Motivo do ajuste" />
                    </SelectTrigger>
                    <SelectContent>
                      {adjustment_reasons.map((reason, index) => (
                        <SelectItem key={index} value={reason.description}>
                          {reason.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableComponent.Value>
                <Button
                  onClick={() => handleRemoveProduct(product.code)}
                  className="mb-0 h-8 bg-transparent text-[14px] font-medium text-black hover:bg-transparent hover:text-hover_preto sm:text-[16px]"
                >
                  <Trash2 size={20} />
                </Button>
              </TableComponent.Line>
            ))
          )}
        </TableComponent.Table>

        {/* TELAS PEQUENAS */}
        <TableComponent.Table className="block sm:hidden">
          <TableComponent.LineTitle className="w-full min-w-[0px] grid-cols-[40px_1fr_24px_24px] gap-3 px-3">
            <TableComponent.ValueTitle className="text-center text-[15px]">
              Cód.
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-[15px]">
              Produto
            </TableComponent.ValueTitle>
            <TableComponent.ButtonSpace className="w-[24px]"></TableComponent.ButtonSpace>
            <TableComponent.ButtonSpace className="w-[24px]"></TableComponent.ButtonSpace>
          </TableComponent.LineTitle>

          {addedProducts.length === 0 ? (
            <TableComponent.Line className="w-full min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Adicione produtos para criar um ajuste de estoque
              </TableComponent.Value>
            </TableComponent.Line>
          ) : (
            addedProducts.map((product, index) => (
              <TableComponent.Line
                className={`w-full min-w-[0px] grid-cols-[40px_1fr_24px_24px] gap-3 px-3 ${
                  index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
                key={index}
              >
                <TableComponent.Value className="text-center text-[14px]">
                  {product.code}
                </TableComponent.Value>
                <TableComponent.Value className="text-[14px]">
                  {product.name}
                </TableComponent.Value>

                <Dialog>
                  <DialogTrigger asChild>
                    {/* <Button className="mb-0 h-8 w-fit bg-cinza_destaque text-[13px] font-medium text-black hover:bg-hover_cinza_destaque_escuro">
              Detalhes
            </Button> */}
                    <FilePenLine size={24} />
                  </DialogTrigger>
                  <DialogContent
                    aria-describedby={undefined}
                    className="w-full gap-2 p-5"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-left text-xl">
                        Ajuste do Produto
                      </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex flex-col gap-1 text-left text-black">
                      <p className="text-base">
                        <span className="font-semibold">Código: </span>{" "}
                        {product.code}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Produto: </span>{" "}
                        {product.name}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">
                          Endereço de Estoque:
                        </span>{" "}
                        {`${product.address.stock}, ${product.address.storage}, ${product.address.shelf}`}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Atual: </span>
                        {product.currentStock}
                      </p>
                      <div className="my-1 text-base">
                        <span className="font-semibold">
                          Estoque Ajustado:{" "}
                        </span>
                        <Input
                          type="number"
                          value={adjustedStock[product.code] ?? ""}
                          onChange={(e) =>
                            handleAdjustedStockChange(
                              product.code,
                              e.target.value,
                            )
                          }
                          className="h-8 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8"
                        ></Input>
                      </div>
                      <p className="text-base">
                        <span className="font-semibold">Diferença: </span>
                        {Number(adjustedStock[product.code] ?? 0) -
                          Number(product.currentStock)}
                      </p>
                      <div className="my-1 text-base">
                        <span className="font-semibold">Descrição: </span>
                        <Select
                          onValueChange={(value) =>
                            handleAdjustmentReasonChange(product.code, value)
                          }
                          defaultValue={adjustmentReasons[product.code] ?? ""}
                        >
                          <SelectTrigger className="h-8 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8">
                            <SelectValue placeholder="Motivo do ajuste" />
                          </SelectTrigger>
                          <SelectContent>
                            {adjustment_reasons.map((reason, index) => (
                              <SelectItem
                                key={index}
                                value={reason.description}
                              >
                                {reason.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={() => handleRemoveProduct(product.code)}
                  className="mb-0 h-fit w-fit bg-transparent px-0 py-0 text-[14px] font-medium text-black hover:bg-transparent hover:text-hover_preto sm:text-[16px]"
                >
                  <Trash2 size={24} />
                </Button>
              </TableComponent.Line>
            ))
          )}
        </TableComponent.Table>

        <TableButtonComponent className="pt-2 sm:pt-4">
          <TableButtonComponent.Button
            className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1"
            handlePress={handleFinalizeAdjustment}
          >
            Finalizar Ajuste de Estoque
          </TableButtonComponent.Button>
        </TableButtonComponent>
      </TableComponent>
    </div>
  );
}
