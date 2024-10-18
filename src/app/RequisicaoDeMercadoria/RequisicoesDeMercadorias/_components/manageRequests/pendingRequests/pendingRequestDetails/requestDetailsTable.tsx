import { CalendarIcon, Text, UserCog2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Input } from "~/components/ui/input";
import { type SerializedRequest } from "~/server/interfaces/request/request.route.interfaces";

type RequestType = {
  request: SerializedRequest;
};

export default function PendingRequestDetails(props: RequestType) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [statusDescription, setStatusDescription] = useState("");

  const handleQuantityChange = (productCode: string, value: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productCode]: value,
    }));
  };

  // Definindo o valor inicial do input como o valor solicitado
  useEffect(() => {
    const initialQuantities = props.request.requestProducts.reduce(
      (acc, product) => ({
        ...acc,
        [product.code]: product.requestedQuantity || "",
      }),
      {},
    );
    setQuantities(initialQuantities);
  }, [props.request.requestProducts]);

  const handleReject = () => {
    const requestData = (props.request.status = "Rejeitada");

    console.log(JSON.stringify(requestData, null, 2));
  };

  const handleConfirm = () => {
    const requestData = {
      // responsible: inputResponsible,
      // date: date?.toISOString(),
      statusDescription: statusDescription,
      requestProducts: props.request.requestProducts.map((product) => ({
        code: product.code,
        name: product.name,
        currentStock: product.currentStock,
        minimunStock: product.minimunStock,
        requestedQuantity: product.requestedQuantity,
        quantity_to_release: quantities[product.code] ?? 0,
      })),
    };

    console.log(JSON.stringify(requestData, null, 2));
  };

  return (
    <TableComponent className="gap-3 text-left">
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[70px_1.3fr_1fr_130px_90px_110px_110px] gap-4 sm:px-[16px]">
          <TableComponent.ValueTitle className="text-center text-base sm:text-[18px]">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-base sm:text-[18px]">
            Produto
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-base sm:text-[18px]">
            Endereço de Estoque
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Quantidade em Estoque
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Estoque Mínimo
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Quantidade Requisitada
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Quantidade a Liberar
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.request.requestProducts.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[70px_1.3fr_1fr_130px_90px_110px_110px] gap-4 sm:px-[16px] ${
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
            <TableComponent.Value className="text-[13px] tracking-tighter sm:text-[15px]">
              {product.shelf.cabinet.StockCabinet.map(
                (stockCabinet) => stockCabinet.stock.name,
              )}
              , {product.shelf.cabinet.name}, {product.shelf.name}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {product.currentStock}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {product.minimunStock}
            </TableComponent.Value>
            <TableComponent.Value className="px-2 text-center text-[13px] sm:text-[15px]">
              {product.requestedQuantity}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              <Input
                type="number"
                value={quantities[product.code] ?? ""}
                onChange={(e) =>
                  handleQuantityChange(product.code, e.target.value)
                }
                className="h-6 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-7"
              />
            </TableComponent.Value>
          </TableComponent.Line>
        ))}

        <div className="flex flex-col gap-1">
          <p>
            Preencha os campos abaixo para confirmar ou rejeitar a requisição
          </p>
          <div className="flex gap-4">
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
            <Filter className="lg:w-full">
              <Filter.Icon
                icon={({ className }: { className: string }) => (
                  <Text className={className} />
                )}
              />
              <Filter.Input
                placeholder="Insira uma descrição como motivo da confirmação parcial ou do rejeite da requisição"
                state={statusDescription}
                setState={setStatusDescription}
              />
            </Filter>
          </div>
        </div>

        <TableButtonComponent className="w-fit pt-2 sm:pt-4 lg:w-full">
          <TableButtonComponent.Button
            className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2 max-[425px]:w-full"
            handlePress={handleReject}
          >
            Rejeitar Requisição
          </TableButtonComponent.Button>

          <TableButtonComponent.Button
            className="bg-verde_botao hover:bg-hover_verde_botao max-[425px]:w-full"
            handlePress={handleConfirm}
          >
            Confirmar Requisição
          </TableButtonComponent.Button>
        </TableButtonComponent>
      </TableComponent.Table>
    </TableComponent>
  );
}
