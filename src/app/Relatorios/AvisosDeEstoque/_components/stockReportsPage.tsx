"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Check, Download, Eraser, Search, X } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
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
import { api } from "~/trpc/react";
import CustomReportPDF from "./pdfReport";
import ProductDetails from "./productDetails";

export default function StockReportsPage() {
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

  const areAllFiltersEmpty =
    inputCode === "" &&
    inputProduct === "" &&
    selectSuppliers.length === 0 &&
    selectStock === "" &&
    selectAddress === "" &&
    selectControlType === "" &&
    selectCategory === "" &&
    selectSector === "" &&
    selectStatus === "" &&
    selectBuyDay === "";

  const {
    data: products = [],
    error,
    isLoading,
  } = api.product.getAll.useQuery();
  const { data: suppliers = [] } = api.supplier.getAll.useQuery({});
  const { data: sectorsOfUse = [] } =
    api.generalParameters.useSector.getAll.useQuery();
  const { data: typesOfControl = [] } =
    api.generalParameters.controlType.getAll.useQuery();
  const { data: productCategories = [] } =
    api.generalParameters.productCategory.getAll.useQuery();
  const { data: stocks = [] } = api.stock.getAllStocks.useQuery();
  const { data: cabinets = [] } =
    api.generalParameters.cabinet.getCabinetFromStock.useQuery({
      stockName: selectStock ? selectStock : "",
    });

  const filteredProducts = areAllFiltersEmpty
    ? []
    : products.filter((product) => {
        // Se nenhum estoque for selecionado, não mostrar nenhum produto
        if (selectStock === "") {
          return false;
        }
        const stockCurrent = Number(product.currentStock);
        const stockMin = Number(product.minimunStock);
        const stockThreshold = stockMin + stockMin * 0.1; // 110% do estoque mínimo
        // Verifica se o produto está com estoque baixo
        const isLowStock = stockCurrent > 0 && stockCurrent <= stockThreshold;
        const isNoStock = stockCurrent === 0;
        const isAdequateStock = stockCurrent > stockThreshold;
        // Filtros auxiliares
        const matchesCode =
          inputCode === "" || product.code.includes(inputCode);
        const matchesProduct =
          inputProduct === "" ||
          product.name.toLowerCase().includes(inputProduct.toLowerCase());
        const matchesSupplier =
          selectSuppliers.length === 0 ||
          product.ProductSupplier.some((supplier) =>
            selectSuppliers.includes(supplier.supplier.name),
          );
        const matchesStock =
          selectStock === "" ||
          product.shelf?.cabinet.StockCabinet.some(
            (stockCabinet) =>
              stockCabinet.stock.name.toLowerCase() ===
              selectStock.toLowerCase(),
          );
        const matchesAddress =
          selectAddress === "" ||
          `${product.shelf?.cabinet.name} - ${product.shelf?.name}`
            .toLowerCase()
            .includes(selectAddress.toLowerCase());
        const matchesControlType =
          selectControlType === "" ||
          product.controlType?.name === selectControlType;
        const matchesCategory =
          selectCategory === "" || product.category?.name === selectCategory;
        const matchesSector =
          selectSector === "" || product.sectorOfUse?.name === selectSector;
        const matchesStatus =
          selectStatus === "" || product.status === selectStatus;
        const matchesBuyDay =
          selectBuyDay === "" || product.buyDay === selectBuyDay;
        const filterConditions = []; // Filtros de estoque com base nos botões e checkboxes
        if (lowStock) filterConditions.push(isLowStock);
        if (noStock) filterConditions.push(isNoStock);
        if (filterBuy) filterConditions.push(isLowStock || isNoStock);
        if (filterDontBuy) filterConditions.push(isAdequateStock);
        if (filterProduce)
          filterConditions.push(
            (isLowStock || isNoStock) &&
              product.controlType?.name === "Produtos de Produção",
          );
        if (filterDontProduce)
          filterConditions.push(
            isAdequateStock &&
              product.controlType?.name === "Produtos de Produção",
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
      });

  const allProducts = products.filter((product) => {
    const matchesStock = product.shelf?.cabinet.StockCabinet.some(
      (stockCabinet) =>
        stockCabinet.stock.name.toLowerCase() === selectStock.toLowerCase(),
    );

    return matchesStock;
  });

  // Produtos com estoque baixo (para contagem)
  const lowStockProducts = products.filter((product) => {
    const matchesLowStock =
      Number(product.currentStock) > 0 &&
      Number(product.currentStock) <=
        Number(product.minimunStock) + Number(product.minimunStock) * 0.1;

    const matchesStock = product.shelf?.cabinet.StockCabinet.some(
      (stockCabinet) =>
        stockCabinet.stock.name.toLowerCase() === selectStock.toLowerCase(),
    );

    return matchesLowStock && matchesStock;
  });

  // Produtos sem estoque (para contagem)
  const noStockProducts = products.filter((product) => {
    const matchesNoStock = Number(product.currentStock) === 0;

    const matchesStock = product.shelf?.cabinet.StockCabinet.some(
      (stockCabinet) =>
        stockCabinet.stock.name.toLowerCase() === selectStock.toLowerCase(),
    );

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

    setSelectedProducts((prevSelectedProducts) => [
      ...new Set([...prevSelectedProducts, ...allFilteredProductCodes]),
    ]);
  }

  function handleDeselectAll() {
    setSelectedProducts([]);
  }

  interface StockWarningsData {
    date: string;
    products: {
      code: string;
      name: string;
      ProductSupplierName: string[];
      status: string;
      parentProductName: string;
      unit: { name: string; abbreviation: string; unitsPerPack: number };
      buyQuantity: number;
      buyDay: string;
      currentStock: number;
      minimunStock: number;
      maximumStock: number;
      controlTypeName: string;
      categoryName: string;
      sectorOfUseName: string;
      stockName: string;
      cabinetName: string;
      shelfName: string;
      usersWithPermissionNames: string[];
    }[];
  }

  function exportSelectedProductData(fileType: string) {
    const productsToPrint = products.filter((product) =>
      selectedProducts.includes(product.code),
    );

    const stockWarningsData = {
      date: new Date()?.toISOString(),
      products: productsToPrint.map((product) => ({
        code: product.code,
        name: product.name,
        ProductSupplierName: product.ProductSupplier.map(
          (productSupplier) => productSupplier.supplier.name,
        ),
        status: product.status ?? "Não informado",
        parentProductName: product.parentProduct?.name ?? "Sem produto pai",
        unit: {
          name: product.unit.name ?? "Não informado",
          abbreviation: product.unit.abbreviation,
          unitsPerPack: product.unit.unitsPerPack ?? 1,
        },
        buyQuantity: product.buyQuantity ?? 0,
        buyDay: product.buyDay ?? "Não informado",
        currentStock: product.currentStock ?? 0,
        minimunStock: product.minimunStock ?? 0,
        maximumStock: product.maximumStock ?? 0,
        controlTypeName: product.controlType?.name ?? "Não informado",
        categoryName: product.category?.name ?? "Não informado",
        sectorOfUseName: product.sectorOfUse?.name ?? "Não informado",
        stockName:
          product.shelf?.cabinet.StockCabinet.map(
            (stockCabinet) => stockCabinet.stock.name,
          ).join(", ") ?? "Não informado",
        cabinetName: product.shelf?.cabinet.name ?? "Não informado",
        shelfName: product.shelf?.name ?? "Não informado",
        usersWithPermissionNames: product.usersWithPermission.map(
          (userWithPermission) => userWithPermission.user.name,
        ),
      })),
    };

    switch (fileType) {
      case "csv":
        exportToCSV(stockWarningsData);
        break;

      case "json":
        exportToJson(stockWarningsData);
        break;

      case "pdf":
        exportToPDF(stockWarningsData);
        break;

      default:
        break;
    }
  }

  function exportToJson(stockWarningsData: StockWarningsData) {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(stockWarningsData),
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `Avisos_Estoque_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
  }

  function exportToPDF(stockWarningsData: StockWarningsData) {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(
      `Relatório de Avisos de Estoque - ${new Date(stockWarningsData.date).toLocaleDateString()}`,
      14,
      20,
    );

    doc.setFontSize(12);
    let yPosition = 25;
    const lineHeight = 5.5; // Altura entre as linhas de texto
    const pageHeight = 280; // Limite de altura da página

    function addKeyValuePair(
      key: string,
      value: string | number,
      x1: number,
      x2: number,
      y: number,
    ) {
      doc.setFont("helvetica", "bold");
      doc.text(`${key}:`, x1, y); // Chave
      doc.setFont("helvetica", "normal");

      const splitText: string[] = doc.splitTextToSize(
        `${value}`,
        120,
      ) as string[];
      doc.text(splitText, x2, y);

      return splitText.length * lineHeight;
    }

    stockWarningsData.products.forEach((product) => {
      const productHeight = 12 * lineHeight + 14;

      if (yPosition + productHeight > pageHeight) {
        doc.addPage();
        yPosition = 14;
      }

      yPosition += addKeyValuePair(
        "Código",
        product.code,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Nome",
        product.name,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Fornecedores",
        product.ProductSupplierName.length > 0
          ? product.ProductSupplierName.join(", ")
          : "Sem fornecedores",
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Status",
        product.status,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Produto Pai",
        product.parentProductName ?? "Sem produto pai",
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Unidade de Compra",
        `${product.unit.name} (${product.unit.abbreviation}) - ${product.unit.unitsPerPack}`,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Quantidade de Compra",
        product.buyQuantity,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Dia de Compra",
        product.buyDay,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Estoque Atual",
        product.currentStock,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Estoque Mínimo",
        product.minimunStock,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Estoque Máximo",
        product.maximumStock,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Tipo de Controle",
        product.controlTypeName,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Categoria do Produto",
        product.categoryName,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Setor de Uso",
        product.sectorOfUseName,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Endereço do Estoque",
        product.stockName,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Endereço de Estoque",
        `${product.cabinetName}, ${product.shelfName}`,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Usuários com Permissão",
        product.usersWithPermissionNames.length > 0
          ? product.usersWithPermissionNames.join(", ")
          : "Sem usuários",
        14,
        70,
        (yPosition += lineHeight),
      );

      yPosition += 10;
    });

    doc.save(`Avisos_Estoque_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  function exportToCSV(stockWarningsData: StockWarningsData) {
    const headers = [
      "Codigo",
      "Status",
      "Produto",
      "Und de Compra (Sigla) - Qtd",
      "Fornecedores",
      "Tipo de Controle",
      "Categoria do Produto",
      "Setor de Utilizacao",
      "Estoque",
      "Endereço de Estoque",
      "Estoque Atual",
      "Estoque Mínimo",
      "Estoque Máximo",
      "Qtd de Compra",
      "Dia de Compra",
      "Quem Pode Requisitar o Produto",
      "Produto Pai",
    ];

    const worksheetData: (string | number | null | undefined)[][] = [
      headers,
      ...stockWarningsData.products.map((product) => {
        const rowData: (string | number | null | undefined)[] = [];

        rowData.push(product.code);
        rowData.push(product.name);
        rowData.push(
          product.ProductSupplierName.length > 0
            ? product.ProductSupplierName.join(", ")
            : "Sem fornecedores",
        );
        rowData.push(product.status);
        rowData.push(
          `${product.unit.name} (${product.unit.abbreviation}) - ${product.unit.unitsPerPack}`,
        );
        rowData.push(product.buyQuantity);
        rowData.push(product.buyDay);
        rowData.push(product.currentStock);
        rowData.push(product.minimunStock);
        rowData.push(product.maximumStock);
        rowData.push(product.controlTypeName ?? " Não informado");
        rowData.push(product.categoryName ?? " Não informado");
        rowData.push(product.sectorOfUseName ?? " Não informado");
        rowData.push(
          `${product.stockName},
             ${product.cabinetName}, ${product.shelfName}`,
        );
        rowData.push(
          product.usersWithPermissionNames.length > 0
            ? product.usersWithPermissionNames.join(", ")
            : "Sem usuários",
        );

        return rowData;
      }),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Avisos de Estoque");
    XLSX.writeFile(
      workbook,
      `Avisos_Estoque_${new Date().toISOString().slice(0, 10)}.xlsx`,
    );
  }

  const productsToPrint = products.filter((product) =>
    selectedProducts.includes(product.code),
  );

  const stockWarningsData = {
    date: new Date()?.toISOString(),
    products: productsToPrint.map((product) => ({
      code: product.code,
      name: product.name,
      ProductSupplierName: product.ProductSupplier.map(
        (productSupplier) => productSupplier.supplier.name,
      ),
      status: product.status ?? "Não informado",
      parentProductName: product.parentProduct?.name ?? "Sem produto pai",
      unit: {
        name: product.unit.name ?? "Não informado",
        abbreviation: product.unit.abbreviation,
        unitsPerPack: product.unit.unitsPerPack ?? 1,
      },
      buyQuantity: product.buyQuantity ?? 0,
      buyDay: product.buyDay ?? "Não informado",
      currentStock: product.currentStock ?? 0,
      minimunStock: product.minimunStock ?? 0,
      maximumStock: product.maximumStock ?? 0,
      controlTypeName: product.controlType?.name ?? "Não informado",
      categoryName: product.category?.name ?? "Não informado",
      sectorOfUseName: product.sectorOfUse?.name ?? "Não informado",
      stockName:
        product.shelf?.cabinet.StockCabinet.map(
          (stockCabinet) => stockCabinet.stock.name,
        ).join(", ") ?? "Não informado",
      cabinetName: product.shelf?.cabinet.name ?? "Não informado",
      shelfName: product.shelf?.name ?? "Não informado",
      usersWithPermissionNames: product.usersWithPermission.map(
        (userWithPermission) => userWithPermission.user.name,
      ),
    })),
  };

  function alphanumericSort(a: string, b: string) {
    const regex = /(\d+)|(\D+)/g;
    const aParts = a.match(regex) ?? [];
    const bParts = b.match(regex) ?? [];

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aPart = aParts[i] ?? "";
      const bPart = bParts[i] ?? "";

      // Se a parte for um número, faça comparação numérica
      if (/\d/.test(aPart) && /\d/.test(bPart)) {
        const diff = parseInt(aPart, 10) - parseInt(bPart, 10);
        if (diff !== 0) return diff;
      }

      // Se não for número, faça comparação lexicográfica
      if (aPart !== bPart) {
        return aPart.localeCompare(bPart);
      }
    }

    return 0;
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

        <div className="font-inter m-0 flex h-auto w-full gap-[14px] border-0 border-none bg-transparent p-0 text-[16px] font-normal text-black opacity-100 ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[placeholder]:opacity-50 lg:w-auto">
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
            className="font-inter min-h-9 rounded-[12px] border-0 border-none bg-filtro bg-opacity-50 p-0 px-1 text-left text-[16px] font-normal text-black ring-0 hover:bg-filtro hover:bg-opacity-50 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-center"
          />
        </div>

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
              selectStock === "" ? "cursor-not-allowed opacity-50" : ""
            }
          >
            {selectStock === "" ? (
              <Filter.SelectItems
                key="0"
                value="Selecione um estoque primeiro"
              />
            ) : (
              cabinets.flatMap((cabinet) =>
                cabinet.shelf.map((shelf) => (
                  <Filter.SelectItems
                    key={shelf.id}
                    value={`${cabinet.name} - ${shelf.name}`}
                  />
                )),
              )
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
            {typesOfControl.map((type, index) => (
              <Filter.SelectItems
                key={index}
                value={type.name}
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
            {productCategories.map((category, index) => (
              <Filter.SelectItems
                key={index}
                value={category.name}
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
            {sectorsOfUse.map((sector, index) => (
              <Filter.SelectItems
                key={index}
                value={sector.name}
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

        {error && selectStock !== "" && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar produtos: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && selectStock !== "" && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>Carregando produtos...</TableComponent.Value>
          </TableComponent.Line>
        )}
        {selectStock === "" && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Selecione um estoque para ver seus produtos
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {!areAllFiltersEmpty &&
          !isLoading &&
          !error &&
          filteredProducts.length === 0 && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum produto encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )}
        {!isLoading &&
          !error &&
          filteredProducts
            .sort((a, b) => alphanumericSort(a.code, b.code))
            .map((product, index) => (
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
                  {product.unit.name} ({product.unit.abbreviation})
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {product.currentStock}
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {product.minimunStock}
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {Number(product.currentStock) - Number(product.minimunStock) >
                  0
                    ? `+${Number(product.currentStock) - Number(product.minimunStock)}`
                    : Number(product.currentStock) -
                      Number(product.minimunStock)}
                </TableComponent.Value>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                      Detalhes
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    aria-describedby={undefined}
                    className="max-h-[90vh] overflow-y-auto sm:max-w-4xl"
                  >
                    <DialogHeader>
                      <DialogTitle>Informações do Produto:</DialogTitle>
                    </DialogHeader>

                    <DialogDescription className="text-black">
                      <ProductDetails product={product} />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </TableComponent.Line>
            ))}
      </TableComponent.Table>

      <TableButtonComponent className="flex w-fit flex-col justify-end pt-2 sm:pt-4 md:flex-row lg:w-full">
        <PDFDownloadLink
          document={<CustomReportPDF customReportData={stockWarningsData} />}
          fileName={`Relatorio_Personalizado_${new Date().toISOString().slice(0, 10)}.pdf`}
        >
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
          >
            Exportar Dados em PDF
          </TableButtonComponent.Button>
        </PDFDownloadLink>

        {/* <TableButtonComponent.Button
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1 max-[425px]:w-full"
          icon={
            <Download
              className="flex h-full cursor-pointer self-center"
              size={20}
              strokeWidth={2.2}
              color="white"
            />
          }
          handlePress={() => exportSelectedProductData("pdf")}
        >
          Exportar Dados em PDF
        </TableButtonComponent.Button> */}

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
          handlePress={() => exportSelectedProductData("csv")}
        >
          Exportar Dados em CSV
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </TableComponent>
  );
}
