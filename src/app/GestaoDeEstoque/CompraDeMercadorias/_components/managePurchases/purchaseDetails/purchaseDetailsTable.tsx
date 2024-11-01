import { TableComponent } from "~/components/table";
import { type SerializedOrder } from "~/server/interfaces/order/order.route.interfaces";

type OrderType = {
  order: SerializedOrder;
};

export default function PurchaseDetails(props: OrderType) {
  return (
    <TableComponent className="gap-3 text-left" id="detail-purchase-table">
      <TableComponent.Table className="hidden sm:block">
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

        {props.order.orderProducts.map((product, index) => (
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
              {product.currentStock}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {product.minimunStock}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {`${product.unit.abbreviation} (${product.unit.unitsPerPack})`}
            </TableComponent.Value>
            <TableComponent.Value className="px-2 text-center text-[13px] sm:text-[15px]">
              {product.purchaseQuantity}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {Number(product.purchaseQuantity) * product.unit.unitsPerPack}
            </TableComponent.Value>
            <TableComponent.Value className="text-[13px] sm:text-[15px]">
              {product.ProductSupplier.supplier.name}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>

      <TableComponent.Table className="block max-w-[90vw] overflow-x-scroll sm:hidden">
        <TableComponent.LineTitle className="min-w-[900px] grid-cols-[60px_1.5fr_80px_70px_100px_110px_110px_1fr] gap-4 px-[8px]">
          <TableComponent.ValueTitle className="text-center text-sm">
            Cod.
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-sm">
            Produto
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-sm leading-5">
            Qnt. em <br /> Estoque
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-sm leading-5">
            Estoque <br /> Mínimo
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-sm leading-5">
            Unidade de <br /> Compra (qnt)
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-sm leading-5">
            Qnt a Comprar
            <br /> (fardo)
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-sm leading-5">
            Qnt a Comprar <br />
            (unidade)
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-sm">
            Fornecedor
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.order.orderProducts.map((product, index) => (
          <TableComponent.Line
            className={`min-w-[900px] grid-cols-[60px_1.5fr_80px_70px_100px_110px_110px_1fr] gap-4 px-[8px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value className="text-center text-[12px]">
              {product.code}
            </TableComponent.Value>
            <TableComponent.Value className="text-[12px]">
              {product.name}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[12px]">
              {product.currentStock}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[12px]">
              {product.minimunStock}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[12px]">
              {`${product.unit.abbreviation} (${product.unit.unitsPerPack})`}
            </TableComponent.Value>
            <TableComponent.Value className="px-2 text-center text-[12px]">
              {product.purchaseQuantity}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[12px]">
              {Number(product.purchaseQuantity) * product.unit.unitsPerPack}
            </TableComponent.Value>
            <TableComponent.Value className="text-[12px]">
              {product.ProductSupplier.supplier.name}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
