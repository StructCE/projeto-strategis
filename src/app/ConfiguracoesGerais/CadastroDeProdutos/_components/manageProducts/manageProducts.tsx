import { Eraser, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useCompany } from "~/lib/companyProvider";
import { type ProductWithFeatures } from "~/server/interfaces/product/product.route.interfaces";
import { api } from "~/trpc/react";
import { ProductEdit } from "./editProducts/productEdit";

export default function ManageProductsTable() {
  const [inputCode, setInputCode] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [selectSupplier, setSelectSupplier] = useState("");
  const [selectStock, setSelectStock] = useState("");
  const [selectAddress, setSelectAddress] = useState("");
  const [selectControlType, setSelectControlType] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSector, setSelectSector] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [selectBuyDay, setSelectBuyDay] = useState("");

  const session = useSession();

  const { data: user } = api.user.getUserById.useQuery({
    id: session?.data?.user.id,
  });

  const { selectedCompany } = useCompany();

  const companyFilter = user?.UserRole.some(
    (userRole) => userRole.role.name === "Administrador",
  )
    ? selectedCompany === "all_companies" || !selectedCompany
      ? undefined
      : selectedCompany
    : user?.UserRole[0]?.company.name;

  const {
    data: products = [],
    error,
    isLoading,
  } = api.product.getAllWhere.useQuery(
    {
      filters: {
        company: companyFilter,
        buyDay: selectBuyDay,
        code: inputCode,
        controlType: selectControlType,
        name: inputProduct,
        productCategory: selectCategory,
        sectorOfUse: selectSector,
        status: selectStatus,
        stock: selectStock,
        supplier: selectSupplier,
      },
    },
    { refetchInterval: 10000 },
  );
  // console.log(products);

  const { data: suppliers = [] } = api.supplier.getAll.useQuery();
  const { data: stocks = [] } = api.stock.getAllStocks.useQuery();
  const { data: productCategories = [] } =
    api.generalParameters.productCategory.getAll.useQuery();
  const { data: useSectors = [] } =
    api.generalParameters.useSector.getAll.useQuery();
  const { data: controlTypes = [] } =
    api.generalParameters.controlType.getAll.useQuery();

  const { data: cabinets = [] } =
    api.generalParameters.cabinet.getCabinetFromStock.useQuery({
      stockName: selectStock ? selectStock : "",
    });

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

  const [editedProducts, setEditedProducts] = useState<ProductWithFeatures[]>(
    [],
  );
  const [updatedName, setUpdatedName] = useState<Record<string, string>>({});
  const [updatedCurrentStock, setUpdatedCurrentStock] = useState<
    Record<string, number>
  >({});
  const [updatedMinimumStock, setUpdatedMinimumStock] = useState<
    Record<string, number>
  >({});
  const [updatedMaximumStock, setUpdatedMaximumStock] = useState<
    Record<string, number>
  >({});

  const addEditedProduct = (product: ProductWithFeatures) => {
    setEditedProducts((prev) => {
      // Verifica se o produto já está na lista para evitar duplicatas
      const isAlreadyEdited = prev.some((p) => p.id === product.id);
      return isAlreadyEdited ? prev : [...prev, product];
    });
  };

  const handleProductNameChange = (
    product: ProductWithFeatures,
    value: string,
  ) => {
    setUpdatedName((prev) => ({
      ...prev,
      [product.id]: value,
    }));
    addEditedProduct(product);
  };

  const handleProductCurrentStockChange = (
    product: ProductWithFeatures,
    value: number,
  ) => {
    setUpdatedCurrentStock((prev) => ({
      ...prev,
      [product.id]: value,
    }));
    addEditedProduct(product);
  };

  const handleProductMinimumStockChange = (
    product: ProductWithFeatures,
    value: number,
  ) => {
    setUpdatedMinimumStock((prev) => ({
      ...prev,
      [product.id]: value,
    }));
    addEditedProduct(product);
  };

  const handleProductMaximumStockChange = (
    product: ProductWithFeatures,
    value: number,
  ) => {
    setUpdatedMaximumStock((prev) => ({
      ...prev,
      [product.id]: value,
    }));
    addEditedProduct(product);
  };

  const productMutation = api.product.editProduct.useMutation({
    onSuccess: (updatedProduct) => {
      // console.log("Product updated successfully:", updatedProduct);
      toast.success(
        "Produto atualizado com sucesso. Atualize a página para ver as alterações...",
        {
          position: "bottom-right",
        },
      );
      // setTimeout(function () {
      //   location.reload();
      // }, 2000);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast.error("Erro ao atualizar produto.", {
        position: "bottom-right",
      });
    },
  });

  function onSubmitEdit() {
    for (const product of editedProducts) {
      try {
        productMutation.mutate({
          id: product.id,
          data: {
            name: updatedName[product.id],
            currentStock: updatedCurrentStock[product.id],
            minimunStock: updatedMinimumStock[product.id],
            maximumStock: updatedMaximumStock[product.id],
          },
        });
      } catch (error) {
        console.error("Error submitting update form:", error);
      }
    }
  }

  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Produtos</TableComponent.Title>

      <TableComponent.Subtitle>
        Selecione um prouduto para editar ou remover, ou edite nos campos da
        tabela abaixo
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

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Fornecedor"
            state={selectSupplier}
            setState={setSelectSupplier}
          >
            {suppliers.map((supplier, index) => (
              <Filter.SelectItems
                key={index}
                value={supplier.name}
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
            {controlTypes.map((type, index) => (
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
            {useSectors.map((sector, index) => (
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
                  setSelectSupplier("");
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
        <TableComponent.LineTitle className="grid-cols-[70px_1fr_100px_100px_100px_100px_130px] gap-8">
          <TableComponent.ValueTitle className="text-center">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Unidade
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Atual
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Mínimo
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Máximo
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
            <TableComponent.Value>Carregando produtos...</TableComponent.Value>
          </TableComponent.Line>
        )}
        {products?.length > 0 && !isLoading && !error ? (
          products?.length > 0 ? (
            products
              ?.sort((a, b) => alphanumericSort(a.code, b.code))
              .map((product, index) => (
                <TableComponent.Line
                  className={`grid-cols-[70px_1fr_100px_100px_100px_100px_130px] gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value className="items-center justify-center text-center">
                    {product.code}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    <Input
                      value={updatedName[product.id] ?? product.name}
                      onChange={(e) =>
                        handleProductNameChange(product, e.target.value)
                      }
                      className="h-7 bg-cinza_destaque sm:h-8"
                    />
                  </TableComponent.Value>
                  <TableComponent.Value className="items-center justify-center text-center">
                    {product.unit.abbreviation}
                  </TableComponent.Value>
                  <TableComponent.Value className="items-center justify-center text-center">
                    <Input
                      type="number"
                      value={
                        updatedCurrentStock[product.id] ??
                        product.currentStock ??
                        undefined
                      }
                      onChange={(e) =>
                        handleProductCurrentStockChange(
                          product,
                          Number(e.target.value),
                        )
                      }
                      className="h-7 bg-cinza_destaque text-center sm:h-8"
                    />
                  </TableComponent.Value>
                  <TableComponent.Value className="items-center justify-center text-center">
                    <Input
                      type="number"
                      value={
                        updatedMinimumStock[product.id] ??
                        product.minimunStock ??
                        undefined
                      }
                      onChange={(e) =>
                        handleProductMinimumStockChange(
                          product,
                          Number(e.target.value),
                        )
                      }
                      className="h-7 bg-cinza_destaque text-center sm:h-8"
                    />
                  </TableComponent.Value>
                  <TableComponent.Value className="items-center justify-center text-center">
                    <Input
                      type="number"
                      value={
                        updatedMaximumStock[product.id] ??
                        product.maximumStock ??
                        undefined
                      }
                      onChange={(e) =>
                        handleProductMaximumStockChange(
                          product,
                          Number(e.target.value),
                        )
                      }
                      className="h-7 bg-cinza_destaque text-center sm:h-8"
                    />
                  </TableComponent.Value>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="max-h-[90vh] overflow-y-auto sm:max-w-7xl"
                    >
                      <DialogHeader>
                        <DialogTitle className="pb-1.5">
                          Utilize os campos abaixo para editar os dados do
                          produto ou o botão para remover
                        </DialogTitle>

                        <DialogDescription className="text-black">
                          <ProductEdit product={product} />
                        </DialogDescription>
                      </DialogHeader>
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
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum produto encontrado
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>

      <TableButtonComponent className="pt-0.5 sm:pt-1">
        <TableButtonComponent.Button
          className="min-w-0 rounded-md bg-cinza_borda_acordeao px-5 py-1 hover:bg-[#606060]"
          handlePress={onSubmitEdit}
        >
          Salvar Alterações
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </TableComponent>
  );
}
