"use client";
import {
  CalendarIcon,
  Eraser,
  Search,
  Text,
  Trash2,
  UserCog2,
} from "lucide-react";
import { useState } from "react";
import { stocks } from "~/app/ConfiguracoesGerais/CadastroDeEstoques/_components/stockData";
import {
  ProductCategories,
  SectorsOfUse,
  TypesOfControl,
} from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  products,
  type Product,
} from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function CreatePurchaseOrder() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");

  const [inputCode, setInputCode] = useState("");
  const [inputName, setInputName] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [selectControlType, setSelectControlType] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSector, setSelectSector] = useState("");

  const [addedProducts, setAddedProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [requestDescription, setRequestDescription] = useState("");

  const areAllFiltersEmpty =
    inputCode === "" &&
    inputName === "" &&
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
        const matchesName =
          inputName === "" ||
          product.name.toLowerCase().includes(inputName.toLowerCase());
        const matchesAddress =
          selectAddress === "" ||
          `${product.address.stock}, ${product.address.storage}, ${product.address.shelf}`
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
          matchesName &&
          matchesAddress &&
          matchesControlType &&
          matchesCategory &&
          matchesSector
        );
      });

  // Função para adicionar produtos a requisição
  const handleAddProduct = (product: Product) => {
    setAddedProducts((prev) => [...prev, product]);
  };

  // Função para remover produtos da requisição
  const handleRemoveProduct = (productCode: string) => {
    setAddedProducts((prev) =>
      prev.filter((product) => product.code !== productCode),
    );
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[productCode];
      return newQuantities;
    });
  };

  // Função para atualizar a quantidade de um produto específico
  const handleQuantityChange = (productCode: string, value: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productCode]: value,
    }));
  };

  // Função para finalizar a requisição
  const handleFinalizePurchase = () => {
    const requestData = {
      responsible: inputResponsible,
      date: date?.toISOString(),
      products: addedProducts.map((product) => ({
        code: product.code,
        name: product.name,
        stock_current: product.stock_current,
        request_quantity: quantities[product.code] ?? 0,
      })),
    };

    // Exemplo de exportação da requisição como JSON (feito com gpt, verificar se ta tudo certo)
    console.log(JSON.stringify(requestData, null, 2));
  };

  return (
    <div className="flex w-full flex-col bg-fundo_branco">
      <TableComponent className="gap-2">
        <TableComponent.Title>
          Realizar Pedido de Mercadorias do Estoque
        </TableComponent.Title>

        <TableComponent.Subtitle>
          Preencha os campos abaixo com a data da requisição e o nome do
          responsável.
        </TableComponent.Subtitle>

        {/* Inputs da data e do responsável pela requisição */}
        <TableComponent.FiltersLine>
          <Filter>
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <CalendarIcon className={className} />
              )}
            />
            <Filter.DatePicker
              date={date}
              setDate={setDate}
              open={open}
              setOpen={setOpen}
            ></Filter.DatePicker>
          </Filter>
          <Filter className="lg:w-[250px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <UserCog2 className={className} />
              )}
            />
            <Filter.Input
              placeholder="Responsável"
              state={inputResponsible}
              setState={setInputResponsible}
            />
          </Filter>
        </TableComponent.FiltersLine>

        <TableComponent.Subtitle>
          Selecione produtos do estoque para fazer requisição.
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

          <Filter className="lg:w-[250px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Input
              placeholder="Produto"
              state={inputName}
              setState={setInputName}
            />
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
            >
              {stocks.map((stock) =>
                stock.address.map((address) =>
                  address.shelves.map((shelf, index) => (
                    <Filter.SelectItems
                      key={index}
                      value={`${stock.name}, ${address.description}, ${shelf.description}`}
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
                    setInputName("");
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

        <TableComponent.Table>
          <TableComponent.LineTitle className="grid-cols-[70px_1.2fr_1fr_130px_90px_90px_130px] gap-8">
            <TableComponent.ValueTitle className="text-center">
              Código
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
            <TableComponent.ValueTitle>
              Endereço do Estoque
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center">
              Quantidade em Estoque
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center">
              Estoque Mínimo
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center">
              Estoque Máximo
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
                className={`grid-cols-[70px_1.2fr_1fr_130px_90px_90px_130px] gap-8 ${
                  index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
                key={index}
              >
                <TableComponent.Value className="text-center">
                  {product.code}
                </TableComponent.Value>
                <TableComponent.Value>{product.name}</TableComponent.Value>
                <TableComponent.Value>
                  {`${product.address.stock}, ${product.address.storage}, ${product.address.shelf}`}
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {product.stock_current}
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {product.stock_min}
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {product.stock_max}
                </TableComponent.Value>

                {/* Ver como vai funcionar essa lógica de permissão */}
                {product.permission ? (
                  <Button
                    onClick={() => handleAddProduct(product)}
                    className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-[#181818] sm:text-[16px]"
                  >
                    Adicionar
                  </Button>
                ) : (
                  <Button className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-[#181818] sm:text-[16px]">
                    Sem Permissão
                  </Button>
                )}
              </TableComponent.Line>
            ))}
        </TableComponent.Table>

        <TableComponent.Title className="mt-2">Requisição</TableComponent.Title>
        <TableComponent.Subtitle>
          Preencha os campos destacados abaixo para gerar um relatório de pedido
          de produtos do estoque. Opcionalmente, adicione uma descrição ao
          relatório.
        </TableComponent.Subtitle>

        <TableComponent.Table>
          <TableComponent.LineTitle className="grid-cols-[100px_1fr_110px_110px_110px_86px] gap-16 sm:px-[16px]">
            <TableComponent.ValueTitle className="text-center text-base sm:text-[18px]">
              Código
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-base sm:text-[18px]">
              Produto
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
              Quantidade em Estoque
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
              Estoque Mínimo
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
              Quantidade a Solicitar
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-base sm:text-[18px]">
              Remover
            </TableComponent.ValueTitle>
          </TableComponent.LineTitle>

          {addedProducts.length === 0 ? (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Adicione produtos para criar uma requisição de mercadorias do
                estoque
              </TableComponent.Value>
            </TableComponent.Line>
          ) : (
            addedProducts.map((product, index) => (
              <TableComponent.Line
                className={`grid-cols-[100px_1fr_110px_110px_110px_86px] gap-16 sm:px-[16px] ${
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
                  {product.stock_current}
                </TableComponent.Value>
                <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                  {product.stock_min}
                </TableComponent.Value>
                <TableComponent.Value className="px-2 text-center text-[13px] sm:text-[15px]">
                  <Input
                    type="number"
                    value={quantities[product.code] ?? ""}
                    onChange={(e) =>
                      handleQuantityChange(product.code, e.target.value)
                    }
                    className="h-7 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8"
                  ></Input>
                </TableComponent.Value>

                <Button
                  onClick={() => handleRemoveProduct(product.code)}
                  className="mb-0 h-8 bg-transparent text-[14px] font-medium text-black hover:bg-transparent hover:text-[#181818] sm:text-[16px]"
                >
                  <Trash2 size={20} />
                </Button>
              </TableComponent.Line>
            ))
          )}
        </TableComponent.Table>

        <div className="pt-1 sm:pt-2">
          <Filter className="lg:w-full">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Text className={className} />
              )}
            />
            <Filter.Input
              placeholder="Insira uma descrição para requisição"
              state={requestDescription}
              setState={setRequestDescription}
            />
          </Filter>
        </div>

        <TableButtonComponent className="pt-1 sm:pt-2">
          <TableButtonComponent.Button
            className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao"
            handlePress={handleFinalizePurchase}
          >
            Requisitar Mercadorias
          </TableButtonComponent.Button>
        </TableButtonComponent>
      </TableComponent>
    </div>
  );
}
