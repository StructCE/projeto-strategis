import { TableComponent } from "~/components/table";
import { type Request } from "../../../requestsData";

type PurchaseType = {
  request: Request;
};

export default function AcceptedRequestDetails(props: PurchaseType) {
  return (
    <TableComponent className="gap-3 text-left">
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[70px_1.5fr_130px_90px_120px_110px_110px_1fr] gap-6 sm:px-[16px]">
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
        </TableComponent.LineTitle>

        {props.request.products.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[70px_1.5fr_130px_90px_120px_110px_110px_1fr] gap-6 sm:px-[16px] ${
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
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {`${product.buy_unit.abbreviation} (${product.buy_unit.unitsPerPack})`}
            </TableComponent.Value>
            <TableComponent.Value className="px-2 text-center text-[13px] sm:text-[15px]">
              {product.buy_quantity}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {Number(product.buy_quantity) * product.buy_unit.unitsPerPack}
            </TableComponent.Value>
            <TableComponent.Value className="text-[13px] sm:text-[15px]">
              {product.supplier.name}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
