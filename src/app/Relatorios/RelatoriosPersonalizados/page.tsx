"use client";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Check, Download, Eraser, Search, X } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { stocks } from "~/app/ConfiguracoesGerais/CadastroDeEstoques/_components/stockData";
import { suppliers } from "~/app/ConfiguracoesGerais/CadastroDeFornecedores/_components/supplierData";
import {
  ProductCategories,
  SectorsOfUse,
  TypesOfControl,
} from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  type Product,
  products,
} from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { MultiSelect } from "~/components/ui/multi-select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { report_options } from "./_components/customReportsData";

export default function CustomReports() {
  const [selectReportOptions, setSelectReportOptions] = useState<string[]>([]);
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

  const filteredProducts = products
    .filter((product) => {
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
    })
    .sort((a, b) => a.code.localeCompare(b.code));

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
    products: Product[];
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
        suppliers: product.suppliers,
        status: product.status,
        parent_product: product.parent_product,
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

    switch (fileType) {
      case "json":
        exportToJson(stockWarningsData);
        break;
      case "csv":
        exportToCSV(stockWarningsData);
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
    link.download = `Relatorio_Personalizado_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
  }

  function exportToPDF(stockWarningsData: StockWarningsData) {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(
      `Relatório Personalizado - ${new Date(
        stockWarningsData.date,
      ).toLocaleDateString()}`,
      14,
      20,
    );

    doc.setFontSize(12);
    let yPosition = 25;
    const lineHeight = 5.5;
    const pageHeight = 280;

    function addKeyValuePair(
      key: string,
      value: string | number,
      x1: number,
      x2: number,
      y: number,
    ) {
      doc.setFont("helvetica", "bold");
      doc.text(`${key}:`, x1, y);
      doc.setFont("helvetica", "normal");

      const splitText: string[] = doc.splitTextToSize(
        `${value}`,
        120,
      ) as string[];
      doc.text(splitText, x2, y);

      return splitText.length * lineHeight;
    }

    stockWarningsData.products.forEach((product) => {
      const productHeight = Object.keys(product).length * lineHeight + 14;

      if (yPosition + productHeight > pageHeight) {
        doc.addPage();
        yPosition = 14;
      }

      // Inclui os dados conforme os atributos selecionados
      if (selectReportOptions.includes("Código")) {
        yPosition += addKeyValuePair(
          "Código",
          product.code,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Nome")) {
        yPosition += addKeyValuePair(
          "Nome",
          product.name,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Fornecedores")) {
        yPosition += addKeyValuePair(
          "Fornecedores",
          product.suppliers.map((s) => s.name).join(", "),
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Status")) {
        yPosition += addKeyValuePair(
          "Status",
          product.status,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Produto Pai")) {
        yPosition += addKeyValuePair(
          "Produto Pai",
          product.parent_product ?? "N/A",
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Unidade de Compra")) {
        yPosition += addKeyValuePair(
          "Unidade de Compra",
          `${product.buy_unit.description} (${product.buy_unit.abbreviation}) - ${product.buy_unit.unitsPerPack}`,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Quantidade de Compra")) {
        yPosition += addKeyValuePair(
          "Quantidade de Compra",
          product.buy_quantity,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Dia de Compra")) {
        yPosition += addKeyValuePair(
          "Dia de Compra",
          product.buy_day,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Estoque Atual")) {
        yPosition += addKeyValuePair(
          "Estoque Atual",
          product.stock_current,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Estoque Mínimo")) {
        yPosition += addKeyValuePair(
          "Estoque Mínimo",
          product.stock_min,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Estoque Máximo")) {
        yPosition += addKeyValuePair(
          "Estoque Máximo",
          product.stock_max,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Tipo de Controle")) {
        yPosition += addKeyValuePair(
          "Tipo de Controle",
          product.type_of_control.description,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Categoria do Produto")) {
        yPosition += addKeyValuePair(
          "Categoria do Produto",
          product.product_category.description,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Setor de Utilização")) {
        yPosition += addKeyValuePair(
          "Setor de Utilização",
          product.sector_of_use.description,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Endereço do Estoque")) {
        yPosition += addKeyValuePair(
          "Endereço do Estoque",
          `${product.address.stock}, ${product.address.storage}, ${product.address.shelf}`,
          14,
          70,
          (yPosition += lineHeight),
        );
      }
      if (selectReportOptions.includes("Usuários com Permissão")) {
        yPosition += addKeyValuePair(
          "Usuários com Permissão",
          product.users_with_permission?.map((u) => u.name).join(", ") ?? "N/A",
          14,
          70,
          (yPosition += lineHeight),
        );
      }

      yPosition += 10;
    });

    doc.save(
      `Relatorio_Personalizado_${new Date().toISOString().slice(0, 10)}.pdf`,
    );
  }

  function exportToCSV(stockWarningsData: StockWarningsData) {
    // Mapear as colunas a partir de `selectReportOptions`
    const headers: string[] = [];

    if (selectReportOptions.includes("Código")) headers.push("Codigo");
    if (selectReportOptions.includes("Nome")) headers.push("Nome");
    if (selectReportOptions.includes("Fornecedores"))
      headers.push("Fornecedores");
    if (selectReportOptions.includes("Status")) headers.push("Status");
    if (selectReportOptions.includes("Produto Pai"))
      headers.push("Produto Pai");
    if (selectReportOptions.includes("Unidade de Compra"))
      headers.push("Unidade de Compra (Sigla) - Qtd");
    if (selectReportOptions.includes("Quantidade de Compra"))
      headers.push("Quantidade de Compra");
    if (selectReportOptions.includes("Dia de Compra"))
      headers.push("Dia de Compra");
    if (selectReportOptions.includes("Estoque Atual"))
      headers.push("Estoque Atual");
    if (selectReportOptions.includes("Estoque Mínimo"))
      headers.push("Estoque Mínimo");
    if (selectReportOptions.includes("Estoque Máximo"))
      headers.push("Estoque Máximo");
    if (selectReportOptions.includes("Tipo de Controle"))
      headers.push("Tipo de Controle");
    if (selectReportOptions.includes("Categoria do Produto"))
      headers.push("Categoria do Produto");
    if (selectReportOptions.includes("Setor de Utilização"))
      headers.push("Setor de Utilização");
    if (selectReportOptions.includes("Endereço do Estoque"))
      headers.push("Endereço de Estoque");
    if (selectReportOptions.includes("Usuários com Permissão"))
      headers.push("Quem Pode Requisitar o Produto");

    const worksheetData = [
      headers,
      ...stockWarningsData.products.map((product: Product) => {
        const rowData: (string | number | null | undefined)[] = [];

        if (selectReportOptions.includes("Código")) rowData.push(product.code);
        if (selectReportOptions.includes("Nome")) rowData.push(product.name);
        if (selectReportOptions.includes("Fornecedores"))
          rowData.push(
            product.suppliers.map((supplier) => supplier.name).join(", "),
          );
        if (selectReportOptions.includes("Status"))
          rowData.push(product.status);
        if (selectReportOptions.includes("Produto Pai"))
          rowData.push(product.parent_product ?? "Não tem Produto Pai");
        if (selectReportOptions.includes("Unidade de Compra"))
          rowData.push(
            `${product.buy_unit.description} (${product.buy_unit.abbreviation}) - ${product.buy_unit.unitsPerPack}`,
          );
        if (selectReportOptions.includes("Quantidade de Compra"))
          rowData.push(product.buy_quantity);
        if (selectReportOptions.includes("Dia de Compra"))
          rowData.push(product.buy_day);
        if (selectReportOptions.includes("Estoque Atual"))
          rowData.push(product.stock_current);
        if (selectReportOptions.includes("Estoque Mínimo"))
          rowData.push(product.stock_min);
        if (selectReportOptions.includes("Estoque Máximo"))
          rowData.push(product.stock_max);
        if (selectReportOptions.includes("Tipo de Controle"))
          rowData.push(product.type_of_control.description);
        if (selectReportOptions.includes("Categoria do Produto"))
          rowData.push(product.product_category.description);
        if (selectReportOptions.includes("Setor de Utilização"))
          rowData.push(product.sector_of_use.description);
        if (selectReportOptions.includes("Endereço do Estoque"))
          rowData.push(
            `${product.address?.stock}, ${product.address?.storage}, ${product.address?.shelf}`,
          );
        if (selectReportOptions.includes("Usuários com Permissão"))
          rowData.push(
            product.users_with_permission
              ?.filter((user) => user.role === "Requisitante")
              .map((user) => user.name)
              .join(", "),
          );

        return rowData;
      }),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Relatorio Personalizado",
    );
    XLSX.writeFile(
      workbook,
      `Relatorio_Personalizado_${new Date().toISOString().slice(0, 10)}.xlsx`,
    );
  }

  return (
    <TableComponent>
      <TableComponent.Title>Gerar Relatório Personalizado</TableComponent.Title>

      {/* Multiselect dos atributos a incluir no relatório */}
      <div className="my-2 flex flex-col items-center gap-1 md:flex-row md:gap-3">
        <p>
          Selecione um ou mais atributos do produto para incluir no relatório:{" "}
        </p>
        <div className="font-inter m-0 flex h-auto w-full gap-[14px] border-0 border-none bg-transparent p-0 text-[16px] font-normal text-black opacity-100 ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[placeholder]:opacity-50 lg:w-auto">
          <MultiSelect
            FilterIcon={Search}
            options={report_options.flatMap((report_option) => ({
              label: report_option.description,
              value: report_option.description,
            }))}
            onValueChange={setSelectReportOptions}
            defaultValue={selectReportOptions}
            placeholder="Atributos do produto"
            variant="inverted"
            maxCount={3}
            className="font-inter min-h-8 rounded-[12px] border-0 border-none bg-filtro bg-opacity-50 p-0 px-1 text-left text-[16px] font-normal text-black ring-0 hover:bg-filtro hover:bg-opacity-50 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-center"
          />
        </div>
      </div>

      <TableComponent.Subtitle>
        Selecione os produtos que deseja incluir no relatório, utilize os
        filtros abaixo para facilitar a busca
      </TableComponent.Subtitle>

      {/* Filtros linha 1 */}
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

      {/* Filtros linha 2 */}
      <TableComponent.FiltersLine>
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
        <TableComponent.LineTitle className="grid-cols-[85px_70px_400px_400px_70px_300px_120px_120px_150px_90px_90px_90px_200px_250px_200px_400px_300px] gap-4 md:gap-8">
          <TableComponent.ValueTitle className="text-center">
            Exportar
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Fornecedores</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Status</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto Pai</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Unidade de Compra
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Quantidade de Compra
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Dia de Compra</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Atual
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Mínimo
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Máximo
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Tipo de Controle
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Categoria do Produto
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Setor de Utilização
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Endereço do Estoque
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Usuários com Permissão
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {filteredProducts.map((product, index) => (
          <TableComponent.Line
            className={`w-max grid-cols-[85px_70px_400px_400px_70px_300px_120px_120px_150px_90px_90px_90px_200px_250px_200px_400px_300px] gap-4 md:gap-8 ${
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
              {product.suppliers.map((supplier) => supplier.name).join(", ")}
            </TableComponent.Value>
            <TableComponent.Value>{product.status}</TableComponent.Value>
            <TableComponent.Value>
              {product.parent_product ? product.parent_product : "Não tem"}
            </TableComponent.Value>
            <TableComponent.Value>
              {product.buy_unit.description} ({product.buy_unit.abbreviation})
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.buy_quantity}
            </TableComponent.Value>
            <TableComponent.Value>{product.buy_day}</TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.stock_current}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.stock_min}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.stock_max}
            </TableComponent.Value>
            <TableComponent.Value>
              {product.type_of_control.description}
            </TableComponent.Value>
            <TableComponent.Value>
              {product.product_category.description}
            </TableComponent.Value>
            <TableComponent.Value>
              {product.sector_of_use.description}
            </TableComponent.Value>
            <TableComponent.Value>
              {`${product.address.stock}, ${product.address.storage}, ${product.address.shelf}`}
            </TableComponent.Value>
            <TableComponent.Value>
              {product.users_with_permission
                ? product.users_with_permission
                    .map((user) => user.name)
                    .join(", ")
                : "Sem usuários"}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
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
          handlePress={() => exportSelectedProductData("pdf")}
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
          handlePress={() => exportSelectedProductData("csv")}
        >
          Exportar Dados em CSV
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </TableComponent>
  );
}
