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
import {
  type Product,
  products,
} from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
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

    const customReportData = {
      date: new Date(2024, 9, 24)?.toISOString(),
      products: productsToPrint.map((product) => {
        const selectedAttributes: Partial<Product> = {};

        if (selectReportOptions.includes("Código"))
          selectedAttributes.code = product.code;
        if (selectReportOptions.includes("Nome"))
          selectedAttributes.name = product.name;
        if (selectReportOptions.includes("Fornecedores"))
          selectedAttributes.suppliers = product.suppliers;
        if (selectReportOptions.includes("Status"))
          selectedAttributes.status = product.status;
        if (selectReportOptions.includes("Produto Pai"))
          selectedAttributes.parent_product =
            product.parent_product ?? "Não tem";
        if (selectReportOptions.includes("Compra/Produção"))
          selectedAttributes.buy_or_production = product.buy_or_production;
        if (selectReportOptions.includes("Unidade de Compra"))
          selectedAttributes.buy_unit = product.buy_unit;
        if (selectReportOptions.includes("Quantidade de Compra"))
          selectedAttributes.buy_quantity = product.buy_quantity;
        if (selectReportOptions.includes("Dia de Compra"))
          selectedAttributes.buy_day = product.buy_day;
        if (selectReportOptions.includes("Estoque Atual"))
          selectedAttributes.stock_current = product.stock_current;
        if (selectReportOptions.includes("Estoque Mínimo"))
          selectedAttributes.stock_min = product.stock_min;
        if (selectReportOptions.includes("Estoque Máximo"))
          selectedAttributes.stock_max = product.stock_max;
        if (selectReportOptions.includes("Tipo de Controle"))
          selectedAttributes.type_of_control = product.type_of_control;
        if (selectReportOptions.includes("Categoria do Produto"))
          selectedAttributes.product_category = product.product_category;
        if (selectReportOptions.includes("Setor de Utilização"))
          selectedAttributes.sector_of_use = product.sector_of_use;
        if (selectReportOptions.includes("Endereço do Estoque"))
          selectedAttributes.address = product.address;
        if (selectReportOptions.includes("Usuários com Permissão"))
          selectedAttributes.permission = product.permission;

        return selectedAttributes;
      }),
    };

    console.log(JSON.stringify(customReportData, null, 2));

    // Exemplo de exportação do pedido como JSON (feito com gpt, verificar se ta tudo certo)
    // const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    //   JSON.stringify(customReportData),
    // )}`;
    // const link = document.createElement("a");
    // link.href = jsonString;
    // link.download = `RelatorioPersonalizado`;
    // link.click();
  }

  return (
    <TableComponent>
      <TableComponent.Title>Gerar Relatório Personalizado</TableComponent.Title>

      <div className="my-2 flex flex-col items-center gap-1 md:flex-row md:gap-3">
        <p>
          Selecione um ou mais atributos do produto para incluir no relatório:{" "}
        </p>
        <div className="font-inter font-regular m-0 flex h-auto w-full gap-[14px] border-0 border-none bg-transparent p-0 text-[16px] text-black opacity-100 ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[placeholder]:opacity-50 lg:w-auto">
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
            className="font-regular font-inter min-h-8 rounded-[12px] border-0 border-none bg-filtro bg-opacity-50 p-0 px-1 text-left text-[16px] text-black ring-0 hover:bg-filtro hover:bg-opacity-50 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-center"
          />
        </div>
      </div>

      <TableComponent.Subtitle>
        Selecione os produtos que deseja incluir no relatório, utilize os
        filtros abaixo para facilitar a busca
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

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[85px_70px_400px_400px_70px_300px_180px_120px_120px_150px_90px_90px_90px_200px_250px_200px_400px_300px] gap-4 md:gap-8">
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
          <TableComponent.ValueTitle>Compra/Produção</TableComponent.ValueTitle>
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
            className={`w-max grid-cols-[85px_70px_400px_400px_70px_300px_180px_120px_120px_150px_90px_90px_90px_200px_250px_200px_400px_300px] gap-4 md:gap-8 ${
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
              {product.suppliers.map((supplier) => supplier.name).join(", ")}
            </TableComponent.Value>
            <TableComponent.Value>{product.status}</TableComponent.Value>
            <TableComponent.Value>
              {product.parent_product ? product.parent_product : "Não tem"}
            </TableComponent.Value>
            <TableComponent.Value>
              {product.buy_or_production}
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
              {product.permission
                ? product.permission.map((user) => user.name).join(", ")
                : "Sem usuários"}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>

      <TableButtonComponent className="w-fit pt-2 sm:pt-4 lg:w-full">
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
          Baixar Relatório
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </TableComponent>
  );
}
