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
import { useState } from "react";
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
import { MultiSelect } from "~/components/ui/multi-select";
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
import { type ProductWithFeatures } from "~/server/interfaces/product/product.route.interfaces";
import { api } from "~/trpc/react";
import FinalizeOrder from "./useOrder";

export default function CreatePurchaseOrder() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const session = useSession();
  const userId = session.data?.user.id;
  const [selectResponsible, setSelectResponsible] = useState<
    string | undefined
  >(userId);

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

  const [addedProducts, setAddedProducts] = useState<ProductWithFeatures[]>([]);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [selectedSuppliers, setSelectedSuppliers] = useState<
    Record<string, string>
  >({});

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

  const { data: products = [] } = api.product.getAll.useQuery();
  const { data: sectorsOfUse = [] } =
    api.generalParameters.useSector.getAll.useQuery();
  const { data: typesOfControl = [] } =
    api.generalParameters.controlType.getAll.useQuery();
  const { data: productCategories = [] } =
    api.generalParameters.productCategory.getAll.useQuery();
  const { data: stocks = [] } = api.stock.getAllStocks.useQuery({});
  const { data: cabinets = [] } =
    api.generalParameters.cabinet.getCabinetFromStock.useQuery({
      stockName: selectStock ? selectStock : "",
    });
  const { data: users = [] } = api.user.getAll.useQuery();
  const { data: suppliers = [] } = api.supplier.getAll.useQuery({});

  // Função para filtrar produtos
  const filteredProducts = areAllFiltersEmpty
    ? []
    : products.filter((product) => {
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
          product.shelf.cabinet.StockCabinet.some(
            (stockCabinet) =>
              stockCabinet.stock.name.toLowerCase() ===
              selectStock.toLowerCase(),
          );
        const matchesAddress =
          selectAddress === "" ||
          `${product.shelf.cabinet.name} - ${product.shelf.name}`
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

  // Função para adicionar produtos ao pedido
  const handleAddProduct = (product: ProductWithFeatures) => {
    setAddedProducts((prev) => [...prev, product]);
  };

  // Função para remover produtos do pedido
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

  const handleSupplierChange = (productCode: string, supplier: string) => {
    setSelectedSuppliers((prev) => ({
      ...prev,
      [productCode]: supplier,
    }));
  };

  return (
    <div className="flex w-full flex-col bg-fundo_branco">
      <TableComponent className="gap-2">
        <TableComponent.Title>
          Realizar Pedido de Compra de Mercadorias
        </TableComponent.Title>

        <TableComponent.Subtitle>
          Preencha os campos abaixo com a data do pedido e o nome do
          responsável.
        </TableComponent.Subtitle>

        {/* Inputs da data e do responsável pelo pedido */}
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

          <div className="flex w-full items-start rounded-[12px] bg-filtro bg-opacity-50 py-1.5 lg:w-[225px] lg:items-center">
            <Select
              onValueChange={setSelectResponsible}
              value={selectResponsible}
              defaultValue={selectResponsible}
            >
              <SelectTrigger className="font-inter m-0 h-auto border-0 border-none bg-transparent p-0 px-2 text-[16px] text-sm font-normal text-black opacity-100 outline-none ring-0 ring-transparent focus:border-transparent focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:outline-none data-[placeholder]:opacity-50 sm:px-[16px] sm:text-base lg:w-[250px]">
                <UserCog2
                  className="size-[20px] stroke-[1.5px]"
                  color="black"
                />
                <SelectValue
                  placeholder="Responsável"
                  className="w-full text-left"
                />
              </SelectTrigger>
              <SelectContent>
                {users.map((user, index) => (
                  <SelectItem value={user.id} key={index}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TableComponent.FiltersLine>

        <TableComponent.Subtitle>
          Selecione produtos do estoque para fazer pedido.
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
              className="font-inter min-h-9 rounded-[12px] border-0 border-none bg-filtro bg-opacity-50 p-0 px-1 text-left text-sm font-normal text-black ring-0 placeholder:text-sm hover:bg-filtro hover:bg-opacity-50 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-base placeholder:sm:text-base lg:text-center"
            />
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

          <Filter className="gap-2 px-2 sm:gap-3 sm:px-[16px]">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Select
              className="text-sm sm:text-base"
              placeholder="Status"
              state={selectStatus}
              setState={setSelectStatus}
            >
              <Filter.SelectItems value="Ativo"></Filter.SelectItems>
              <Filter.SelectItems value="Inativo"></Filter.SelectItems>
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

        {/* TELAS GRANDES */}
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
                  {`${product.shelf.cabinet.StockCabinet.map((stockCabinet) => stockCabinet.stock.name).join()}, ${product.shelf.cabinet.name}, ${product.shelf.name}`}
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {product.currentStock}
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {product.minimunStock}
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {product.maximumStock}
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
                        Comprar Produto
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
                        {`${product.shelf.cabinet.StockCabinet.map((stockCabinet) => stockCabinet.stock.name).join()}, ${product.shelf.cabinet.name}, ${product.shelf.name}`}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Atual: </span>
                        {product.currentStock}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Mínimo: </span>
                        {product.minimunStock}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Máximo: </span>
                        {product.maximumStock}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">
                          Unidade de Compra (quantidade):{" "}
                        </span>
                        {product.unit.name} ({product.unit.unitsPerPack})
                      </p>
                      <div className="text-base">
                        <span className="font-semibold">
                          Quantidade a Comprar (fardo):{" "}
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
                      <p className="text-base">
                        <span className="font-semibold">
                          Quantidade a Comprar (unidade):{" "}
                        </span>
                        {Number(quantities[product.code] ?? 0) *
                          product.unit.unitsPerPack}
                      </p>
                      <div className="text-base">
                        <span className="font-semibold">Fornecedor: </span>
                        <Select
                          onValueChange={(value) =>
                            handleSupplierChange(product.code, value)
                          }
                          defaultValue={selectedSuppliers[product.code] ?? ""}
                        >
                          <SelectTrigger className="h-8 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8">
                            <SelectValue placeholder="Selecione um fornecedor" />
                          </SelectTrigger>
                          <SelectContent>
                            {product.ProductSupplier.map((supplier, i) => (
                              <SelectItem value={supplier.supplier.id} key={i}>
                                {supplier.supplier.name}
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
          Pedido de Compra
        </TableComponent.Title>

        {/* TELAS GRANDES */}
        <TableComponent.Table className="hidden sm:block">
          <TableComponent.LineTitle className="grid-cols-[70px_1.5fr_130px_90px_120px_110px_110px_1fr_86px] gap-6 sm:px-[16px]">
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
              Unidade de Compra (qnt)
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
              Quantidade a Comprar (fardo)
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
              Quantidade a Comprar (unidade)
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-base sm:text-[18px]">
              Fornecedor
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-base sm:text-[18px]">
              Remover
            </TableComponent.ValueTitle>
          </TableComponent.LineTitle>

          {addedProducts.length === 0 ? (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Adicione produtos para criar um pedido de compra
              </TableComponent.Value>
            </TableComponent.Line>
          ) : (
            addedProducts.map((product, index) => (
              <TableComponent.Line
                className={`grid-cols-[70px_1.5fr_130px_90px_120px_110px_110px_1fr_86px] gap-6 sm:px-[16px] ${
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
                <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                  {product.minimunStock}
                </TableComponent.Value>
                <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                  {`${product.unit.abbreviation} (${product.unit.unitsPerPack})`}
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
                <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                  {Number(quantities[product.code] ?? 0) *
                    product.unit.unitsPerPack}
                </TableComponent.Value>
                <TableComponent.Value className="text-[13px] sm:text-[15px]">
                  <Select
                    onValueChange={(value) =>
                      handleSupplierChange(product.code, value)
                    }
                    defaultValue={selectedSuppliers[product.code] ?? ""}
                  >
                    <SelectTrigger className="h-7 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8">
                      <SelectValue placeholder="Selecione um fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.ProductSupplier.map((productSupplier, i) => (
                        <SelectItem value={productSupplier.id} key={i}>
                          {productSupplier.supplier.name}
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
                Adicione produtos para criar uma pedido de compra de mercadorias
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
                        Comprar Produto
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
                        {`${product.shelf.cabinet.StockCabinet.map((stockCabinet) => stockCabinet.stock.name).join()}, ${product.shelf.cabinet.name}, ${product.shelf.name}`}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Atual: </span>
                        {product.currentStock}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Mínimo: </span>
                        {product.minimunStock}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">Estoque Máximo: </span>
                        {product.maximumStock}
                      </p>
                      <p className="text-base">
                        <span className="font-semibold">
                          Unidade de Compra (quantidade):{" "}
                        </span>
                        {product.unit.name} ({product.unit.unitsPerPack})
                      </p>
                      <div className="text-base">
                        <span className="font-semibold">
                          Quantidade a Comprar (fardo):{" "}
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
                      <p className="text-base">
                        <span className="font-semibold">
                          Quantidade a Comprar (unidade):{" "}
                        </span>
                        {Number(quantities[product.code] ?? 0) *
                          product.unit.unitsPerPack}
                      </p>
                      <div className="text-base">
                        <span className="font-semibold">Fornecedor: </span>
                        <Select
                          onValueChange={(value) =>
                            handleSupplierChange(product.code, value)
                          }
                          defaultValue={selectedSuppliers[product.code] ?? ""}
                        >
                          <SelectTrigger className="h-8 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8">
                            <SelectValue placeholder="Selecione um fornecedor" />
                          </SelectTrigger>
                          <SelectContent>
                            {product.ProductSupplier.map(
                              (productSupplier, i) => (
                                <SelectItem value={productSupplier.id} key={i}>
                                  {productSupplier.supplier.name}
                                </SelectItem>
                              ),
                            )}
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

        <FinalizeOrder
          selectResponsible={selectResponsible}
          addedProducts={addedProducts}
          quantities={quantities}
          selectedSuppliers={selectedSuppliers}
          date={date ?? new Date()}
        />
      </TableComponent>
    </div>
  );
}
