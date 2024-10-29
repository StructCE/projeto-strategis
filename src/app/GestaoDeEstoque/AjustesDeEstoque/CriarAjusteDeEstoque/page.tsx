"use client";
import {
  CalendarIcon,
  Eraser,
  FilePenLine,
  Info,
  Search,
  Trash2,
  UserCog2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
import { type AdjustProduct } from "~/server/interfaces/adjust/adjust.route.interfaces";
import { api } from "~/trpc/react";
import FinalizeAdjust from "./useAdjust";

export default function CreateAdjustment() {
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session.data?.user.allowedPagesPath.includes(pathname)) {
      redirect("/");
    }
  }, [session, pathname]);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const userId = session.data?.user.id;
  const [selectResponsible, setSelectResponsible] = useState<
    string | undefined
  >(userId);

  const [inputCode, setInputCode] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [selectStockId, setSelectStockId] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [selectControlType, setSelectControlType] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSector, setSelectSector] = useState("");

  const [addedProducts, setAddedProducts] = useState<AdjustProduct[]>([]);
  const [adjustedStock, setAdjustedStock] = useState<Record<string, string>>(
    {},
  );
  const [adjustmentReasons, setAdjustmentReasons] = useState<
    Record<string, string>
  >({});

  const {
    data: products = [],
    error,
    isLoading,
  } = api.product.getAll.useQuery();
  const { data: sectorsOfUse = [] } =
    api.generalParameters.useSector.getAll.useQuery();
  const { data: typesOfControl = [] } =
    api.generalParameters.controlType.getAll.useQuery();
  const { data: productCategories = [] } =
    api.generalParameters.productCategory.getAll.useQuery();
  const { data: adjustReasons = [] } =
    api.generalParameters.adjustReason.getAll.useQuery();
  const { data: stocks = [] } = api.stock.getAllStocks.useQuery({
    filters: {},
  });
  const { data: cabinets = [] } =
    api.generalParameters.cabinet.getCabinetFromStock.useQuery({
      stockName: selectStockId ? selectStockId : "",
    });
  const { data: users = [] } = api.user.getAll.useQuery();

  const areAllFiltersEmpty =
    inputCode === "" &&
    inputProduct === "" &&
    selectStockId === "" &&
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
          selectStockId === "" ||
          product.shelf?.cabinet.StockCabinet.some(
            (stockCabinet) =>
              stockCabinet.stock.id.toLowerCase() ===
              selectStockId.toLowerCase(),
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
  const handleAddProduct = (product: AdjustProduct) => {
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

  const handleStockChange = (stockId: string) => {
    setSelectStockId(stockId);
    setAddedProducts([]); // Limpar produtos ao mudar o estoque
    setAdjustedStock({});
    setAdjustmentReasons({});
  };

  const allowedRoles = ["operador", "administrador", "estoquista"];

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
            <Filter.Select
              className="text-sm sm:text-base"
              placeholder="Responsável"
              state={selectResponsible}
              setState={setSelectResponsible}
            >
              {users
                .filter((user) =>
                  user.UserRole.some((userRole) =>
                    allowedRoles.includes(userRole.role.name.toLowerCase()),
                  ),
                )
                .map((user, index) => (
                  <Filter.SelectItems
                    key={index}
                    valueId={user.id}
                    value={user.name}
                  ></Filter.SelectItems>
                ))}
            </Filter.Select>
          </Filter>
          {/* <div className="flex w-full items-center rounded-[12px] bg-filtro bg-opacity-50 lg:w-[225px]">
            <Select
              onValueChange={setSelectResponsible}
              value={selectResponsible}
              defaultValue={selectResponsible}
            >
              <SelectTrigger className="font-inter m-0 h-auto border-0 border-none bg-transparent px-2 py-1.5 text-[16px] text-sm font-normal text-black opacity-100 outline-none ring-0 ring-transparent focus:border-transparent focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:outline-none data-[placeholder]:opacity-50 sm:px-[16px] sm:text-base lg:w-[250px]">
                <UserCog2
                  className="size-[20px] stroke-[1.5px]"
                  color="black"
                />
                <SelectValue placeholder="Responsável" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user, index) => (
                  <SelectItem value={user.id} key={index}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
        </TableComponent.FiltersLine>

        <div className="my-2 flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
          <div className="font-inter text-[13px] font-normal sm:text-[15px]">
            Selecione um estoque e produtos dele para fazer um ajuste de estoque{" "}
            <br />
            (só é possível fazer ajustes em um estoque de cada vez):
          </div>

          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Select
              className="text-sm sm:text-base"
              placeholder="Estoque"
              state={selectStockId}
              setState={handleStockChange}
            >
              {stocks.map((stock, index) => (
                <Filter.SelectItems
                  key={index}
                  valueId={stock.id}
                  value={stock.name}
                ></Filter.SelectItems>
              ))}
            </Filter.Select>
          </Filter>

          {/* <div className="flex w-full items-center rounded-[12px] bg-filtro bg-opacity-50 lg:w-fit">
            <Select
              onValueChange={handleStockChange}
              value={selectStockId}
              defaultValue={selectStockId}
            >
              <SelectTrigger className="font-inter m-0 h-auto gap-3 border-0 border-none bg-transparent px-2 py-1.5 text-[16px] text-sm font-normal text-black opacity-100 outline-none ring-0 ring-transparent focus:border-transparent focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:outline-none data-[placeholder]:opacity-50 sm:px-[16px] sm:text-base lg:w-fit">
                <Search className="size-[16px] stroke-[1.5px]" color="black" />
                <SelectValue placeholder="Estoque" />
              </SelectTrigger>
              <SelectContent>
                {stocks.map((stock, index) => (
                  <SelectItem key={index} value={stock.id}>
                    {stock.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
        </div>

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
              placeholder="Endereço"
              state={selectAddress}
              setState={setSelectAddress}
              className={
                selectStockId === "" ? "cursor-not-allowed opacity-50" : ""
              }
            >
              {selectStockId === "" ? (
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
              {typesOfControl.map((type, index) => (
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
              {sectorsOfUse.map((sector, index) => (
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
                    setSelectStockId("");
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

          {error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Erro ao mostrar produtos: {error.message}
              </TableComponent.Value>
            </TableComponent.Line>
          )}
          {isLoading && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Carregando produtos...
              </TableComponent.Value>
            </TableComponent.Line>
          )}
          {areAllFiltersEmpty && !isLoading && !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Utilize os filtros acima para encontrar produtos cadastrados no
                estoque
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
          {products?.length > 0 &&
            !areAllFiltersEmpty &&
            !isLoading &&
            !error &&
            (filteredProducts?.length > 0 ? (
              filteredProducts
                ?.sort((a, b) => a.code.localeCompare(b.code))
                .map((product, index) => (
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
                      {`${product.shelf?.cabinet.StockCabinet.map((stockCabinet) => stockCabinet.stock.name).join()}, ${product.shelf?.cabinet.name}, ${product.shelf?.name}`}
                    </TableComponent.Value>
                    <Button
                      onClick={() =>
                        handleAddProduct({
                          id: product.id,
                          code: product.code,
                          name: product.name,
                          ncm: product.ncm,
                          cfop: product.cfop,
                          currentStock: product.currentStock,
                          oldStock: product.currentStock ?? 0,
                          adjustedStock: 0,
                          reason: { id: "", name: "" },
                          unit: product.unit,
                          shelf: product.shelf,
                        })
                      }
                      className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-hover_preto sm:text-[16px]"
                    >
                      Adicionar
                    </Button>
                  </TableComponent.Line>
                ))
            ) : (
              <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
                <TableComponent.Value>
                  Nenhum produto encontrado com os filtros aplicados
                </TableComponent.Value>
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

          {error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Erro ao mostrar produtos: {error.message}
              </TableComponent.Value>
            </TableComponent.Line>
          )}
          {isLoading && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Carregando produtos...
              </TableComponent.Value>
            </TableComponent.Line>
          )}
          {areAllFiltersEmpty &&
            !isLoading &&
            !error &&
            products?.length > 0 && (
              <TableComponent.Line className="w-full min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
                <TableComponent.Value>
                  Utilize os filtros acima para encontrar produtos cadastrados
                  no estoque
                </TableComponent.Value>
              </TableComponent.Line>
            )}
          {!areAllFiltersEmpty &&
            !isLoading &&
            !error &&
            filteredProducts.length === 0 && (
              <TableComponent.Line className="w-full min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
                <TableComponent.Value>
                  Nenhum produto encontrado com os filtros aplicados
                </TableComponent.Value>
              </TableComponent.Line>
            )}
          {products?.length > 0 &&
            !areAllFiltersEmpty &&
            !isLoading &&
            !error &&
            (filteredProducts?.length > 0 ? (
              filteredProducts
                ?.sort((a, b) => a.code.localeCompare(b.code))
                .map((product, index) => (
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
                            {`${product.shelf?.cabinet.StockCabinet.map((stockCabinet) => stockCabinet.stock.name).join()}, ${product.shelf?.cabinet.name}, ${product.shelf?.name}`}
                          </p>
                          <p className="text-base">
                            <span className="font-semibold">
                              Estoque Atual:{" "}
                            </span>
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
                                handleAdjustmentReasonChange(
                                  product.code,
                                  value,
                                )
                              }
                              defaultValue={
                                adjustmentReasons[product.code] ?? ""
                              }
                            >
                              <SelectTrigger className="h-8 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8">
                                <SelectValue placeholder="Motivo do ajuste" />
                              </SelectTrigger>
                              <SelectContent>
                                {adjustReasons.map((reason, index) => (
                                  <SelectItem key={index} value={reason.id}>
                                    {reason.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="mt-3 flex w-full justify-end">
                            <Button
                              onClick={() =>
                                handleAddProduct({
                                  id: product.id,
                                  code: product.code,
                                  name: product.name,
                                  ncm: product.ncm,
                                  cfop: product.cfop,
                                  currentStock: product.currentStock ?? 0,
                                  oldStock: product.currentStock ?? 0,
                                  adjustedStock: 0,
                                  reason: { id: "", name: "" },
                                  unit: product.unit,
                                  shelf: product.shelf,
                                })
                              }
                              className="mb-0 h-8 bg-black text-[14px] font-medium text-white hover:bg-hover_preto sm:text-[16px]"
                            >
                              Adicionar
                            </Button>
                          </div>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </TableComponent.Line>
                ))
            ) : (
              <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
                <TableComponent.Value>
                  Nenhum produto encontrado com os filtros aplicados
                </TableComponent.Value>
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
                  {product.oldStock}
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
                    Number(product.oldStock)}
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
                      {adjustReasons.map((reason, index) => (
                        <SelectItem key={index} value={reason.id}>
                          {reason.name}
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
                        {`${product.shelf?.cabinet.StockCabinet.map((stockCabinet) => stockCabinet.stock.name).join()}, ${product.shelf?.cabinet.name}, ${product.shelf?.name}`}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Atual: </span>
                        {product.oldStock}
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
                          Number(product.oldStock)}
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
                            {adjustReasons.map((reason, index) => (
                              <SelectItem key={index} value={reason.id}>
                                {reason.name}
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

        <FinalizeAdjust
          date={date ?? new Date()}
          selectResponsible={selectResponsible}
          stockId={selectStockId}
          addedProducts={addedProducts}
          adjustedStock={adjustedStock}
          adjustmentReasons={adjustmentReasons}
        />
      </TableComponent>
    </div>
  );
}
