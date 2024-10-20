import { CalendarIcon, Text, UserCog2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type SerializedRequest } from "~/server/interfaces/request/request.route.interfaces";
import { api } from "~/trpc/react";
import { default as ConfirmRequest } from "./useConfirmRequest";
import RejectRequest from "./useRejectRequest";

type RequestType = {
  request: SerializedRequest;
};

export default function PendingRequestDetails(props: RequestType) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const session = useSession();
  const userId = session.data?.user.id;
  const [selectResponsible, setSelectResponsible] = useState<
    string | undefined
  >(userId);

  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [statusDescription, setStatusDescription] = useState("");

  const { data: users = [] } = api.user.getAll.useQuery();

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

        <div className="mt-2 flex flex-col gap-1">
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
          <RejectRequest
            statusDate={date}
            statusResponsibleId={selectResponsible}
            statusDescription={statusDescription}
            request={props.request}
          />

          <ConfirmRequest
            statusDate={date}
            statusResponsibleId={selectResponsible}
            statusDescription={statusDescription}
            quantities={quantities}
            request={props.request}
          />
        </TableButtonComponent>
      </TableComponent.Table>
    </TableComponent>
  );
}
