import { useEffect, useState } from "react";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Input } from "~/components/ui/input";
import { type Request } from "../../../requestsData";

type PurchaseType = {
  request: Request;
};

export default function PendingRequestDetails(props: PurchaseType) {
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  const handleQuantityChange = (productCode: string, value: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productCode]: value,
    }));
  };

  // Definindo o valor inicial do input como o valor solicitado
  useEffect(() => {
    const initialQuantities = props.request.products.reduce(
      (acc, product) => ({
        ...acc,
        [product.code]: product.requested_quantity || "",
      }),
      {},
    );
    setQuantities(initialQuantities);
  }, [props.request.products]);

  const handleReject = () => {
    const requestData = (props.request.status = "rejected");

    console.log(JSON.stringify(requestData, null, 2));
  };

  const handleConfirm = () => {
    const requestData = props.request.products.map((product) => ({
      code: product.code,
      name: product.name,
      stock_current: product.stock_current,
      stock_min: product.stock_min,
      requested_quantity: product.requested_quantity,
      quantity_to_release: quantities[product.code] ?? 0,
    }));

    console.log(JSON.stringify(requestData, null, 2));
  };

  return (
    <TableComponent className="gap-3 text-left">
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[70px_1.5fr_130px_90px_110px_110px] gap-10">
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
            Quantidade Requisitada
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Quantidade a Liberar
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.request.products.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[70px_1.5fr_130px_90px_110px_110px] gap-10 ${
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
              {product.requested_quantity}
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

        <TableButtonComponent className="w-fit pt-2 sm:pt-4 lg:w-full">
          <TableButtonComponent.Button
            className="bg-vermelho_botao_2 hover:bg-hover_vermelho_login max-[425px]:w-full"
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
