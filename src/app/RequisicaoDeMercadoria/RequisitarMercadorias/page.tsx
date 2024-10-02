"use client";
import {
  CalendarIcon,
  Eraser,
  FilePenLine,
  Info,
  Search,
  Text,
  Trash2,
  UserCog2,
} from "lucide-react";
import React, { useState } from "react";
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
import { type User } from "~/components/navbar/_components/userData";
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
  const [inputProduct, setInputProduct] = useState("");
  const [selectStock, setSelectStock] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [selectControlType, setSelectControlType] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSector, setSelectSector] = useState("");

  const [addedProducts, setAddedProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [requestDescription, setRequestDescription] = useState("");

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

  // Exemplo da lógica de permissão (Usuário 1 tem permissão pra produtos líquidos, e Usuário 2 outros produtos)
  const LoggedUser: User = {
    name: "Nome do Usuário 1",
    role: "Requisitante",
    company: "Alimentos WCW",
    phone: "(61) 99999-9999",
  };

  function hasPermission(product: Product, user: User) {
    return product.users_with_permission?.some(
      (permittedUser) => permittedUser.name === user.name,
    );
  }

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
          Selecione produtos do estoque para fazer requisição.
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
              className="placeholder:text-sm sm:placeholder:text-base"
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
              {TypesOfControl.map((type, index) => (
                <Filter.SelectItems
                  key={index}
                  value={type.description}
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
              {ProductCategories.map((category, index) => (
                <Filter.SelectItems
                  key={index}
                  value={category.description}
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
              <TooltipContent side="right">Limpar filtros</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableComponent.FiltersLine>

        {/*  TELAS GRANDES */}
        <TableComponent.Table className="hidden sm:block">
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
                {hasPermission(product, LoggedUser) ? (
                  <Button
                    onClick={() => handleAddProduct(product)}
                    className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-hover_preto sm:text-[16px]"
                  >
                    Adicionar
                  </Button>
                ) : (
                  <Button className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-hover_preto sm:text-[16px]">
                    Sem Permissão
                  </Button>
                )}
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
                        Requisitar Produto
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
                        <span className="font-semibold">Estoque Atual: </span>
                        {product.stock_current}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Mínimo: </span>
                        {product.stock_min}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Máximo: </span>
                        {product.stock_max}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">
                          Endereço de Estoque:
                        </span>{" "}
                        {`${product.address.stock}, ${product.address.storage}, ${product.address.shelf}`}
                      </p>
                      <div className="text-base">
                        <span className="font-semibold">
                          Quantidade a Solicitar:{" "}
                        </span>
                        <Input
                          type="number"
                          value={quantities[product.code] ?? ""}
                          onChange={(e) =>
                            handleQuantityChange(product.code, e.target.value)
                          }
                          className="h-8 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8"
                        ></Input>
                      </div>
                      <div className="mt-3 flex w-full justify-end">
                        {hasPermission(product, LoggedUser) ? (
                          <Button
                            onClick={() => handleAddProduct(product)}
                            className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-hover_preto sm:text-[16px]"
                          >
                            Adicionar
                          </Button>
                        ) : (
                          <Button className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-hover_preto sm:text-[16px]">
                            Sem Permissão
                          </Button>
                        )}
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </TableComponent.Line>
            ))}
        </TableComponent.Table>

        <TableComponent.Title className="mt-2">Requisição</TableComponent.Title>
        <TableComponent.Subtitle>
          Preencha os campos destacados abaixo para gerar um relatório de pedido
          de produtos do estoque. Opcionalmente, adicione uma descrição ao
          relatório.
        </TableComponent.Subtitle>

        {/*  TELAS GRANDES */}
        <TableComponent.Table className="hidden sm:block">
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
                  className="mb-0 h-8 bg-transparent text-[14px] font-medium text-black hover:bg-transparent hover:text-hover_preto sm:text-[16px]"
                >
                  <Trash2 size={20} />
                </Button>
              </TableComponent.Line>
            ))
          )}
        </TableComponent.Table>

        {/*  TELAS PEQUENAS */}
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
                Adicione produtos para criar uma requisição de mercadorias do
                estoque
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
                    <FilePenLine size={24} />
                  </DialogTrigger>
                  <DialogContent
                    aria-describedby={undefined}
                    className="w-full gap-2 p-5"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-left text-xl">
                        Requisitar Produto
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
                        <span className="font-semibold">Estoque Atual: </span>
                        {product.stock_current}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Mínimo: </span>
                        {product.stock_min}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Máximo: </span>
                        {product.stock_max}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">
                          Endereço de Estoque:
                        </span>{" "}
                        {`${product.address.stock}, ${product.address.storage}, ${product.address.shelf}`}
                      </p>
                      <div className="text-base">
                        <span className="font-semibold">
                          Quantidade a Solicitar:{" "}
                        </span>
                        <Input
                          type="number"
                          value={quantities[product.code] ?? ""}
                          onChange={(e) =>
                            handleQuantityChange(product.code, e.target.value)
                          }
                          className="h-8 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8"
                        ></Input>
                      </div>
                      <div className="mt-3 flex w-full justify-end">
                        {hasPermission(product, LoggedUser) ? (
                          <Button
                            onClick={() => handleAddProduct(product)}
                            className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-hover_preto sm:text-[16px]"
                          >
                            Adicionar
                          </Button>
                        ) : (
                          <Button className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-hover_preto sm:text-[16px]">
                            Sem Permissão
                          </Button>
                        )}
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

        <div className="pt-1 sm:pt-2">
          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px] lg:w-full">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Text className={className} />
              )}
            />
            <Filter.Input
              className="text-sm sm:text-base"
              placeholder="Insira uma descrição para requisição"
              state={requestDescription}
              setState={setRequestDescription}
            />
          </Filter>
        </div>

        <TableButtonComponent className="pt-1 sm:pt-2">
          <TableButtonComponent.Button
            className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1"
            handlePress={handleFinalizePurchase}
          >
            Requisitar Mercadorias
          </TableButtonComponent.Button>
        </TableButtonComponent>
      </TableComponent>
    </div>
  );
}
