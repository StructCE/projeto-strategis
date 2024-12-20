import { useSession } from "next-auth/react";
import { TableComponent } from "~/components/table";
import { type SerializedInventory } from "~/server/interfaces/inventory/inventory.route.interfaces";
import { api } from "~/trpc/react";
import FinalizeAutoAdjust from "./useAutoAdjust";

type InventoryType = {
  inventory: SerializedInventory;
};

export default function InventoryDetails(props: InventoryType) {
  function handleProductDescription(stock: number, inventory: number) {
    const difference = inventory - stock;
    if (difference == 0) {
      return "Estoque bateu, não é necessário ajuste.";
    } else {
      return "Ajuste de estoque necessário.";
    }
  }

  const session = useSession();
  const userId = session.data?.user.id;

  const { data: adjustReason } =
    api.generalParameters.adjustReason.getReasonByName.useQuery({
      name: "Outro",
    });

  const productsNeedingAdjustment = props.inventory.inventoryProducts
    .filter((product) => product.stockQuantity !== product.inventoryQuantity)
    .map((product) => ({
      ...product,
      productId: product.productId, // Aqui você usa o productId correto de ProductInventory
    }));

  return (
    <TableComponent className="gap-3 text-left">
      {/* TELAS GRANDES */}
      <TableComponent.Table className="hidden sm:block">
        <TableComponent.LineTitle className="grid-cols-[70px_1fr_113px_113px_92px_1fr] gap-8">
          <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-[14px] sm:text-base">
            Produto
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
            Quantidade em Estoque
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
            Quantidade em Inventário
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
            Diferença
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-[14px] sm:text-base">
            Descrição
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.inventory.inventoryProducts.map((product, index) => (
          <TableComponent.Line
            className={`min-w-full grid-cols-[70px_1fr_113px_113px_92px_1fr] gap-8 ${
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
              {product.stockQuantity}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {product.inventoryQuantity}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {(
                product.inventoryQuantity - (product.stockQuantity ?? 0)
              ).toFixed(2)}
            </TableComponent.Value>
            <TableComponent.Value className="text-[13px] sm:text-[15px]">
              {handleProductDescription(
                product.stockQuantity ?? 0,
                product.inventoryQuantity,
              )}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>

      {/* TELAS PEQUENAS */}
      <TableComponent.Table className="block max-w-[90vw] overflow-x-scroll sm:hidden">
        <TableComponent.LineTitle className="min-w-[550px] grid-cols-[60px_1fr_70px_70px_45px_1fr] gap-4 px-[8px]">
          <TableComponent.ValueTitle className="text-center text-sm">
            Cód.
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-sm">
            Produto
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-sm">
            Qnt em <br /> Estoque
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-sm">
            Qnt em <br /> Inventário
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-sm">
            Dif.
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-sm">
            Descrição
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.inventory.inventoryProducts.map((product, index) => (
          <TableComponent.Line
            className={`min-w-[550px] grid-cols-[60px_1fr_70px_70px_45px_1fr] gap-4 px-[8px] ${
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
              {product.stockQuantity}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[12px]">
              {product.inventoryQuantity}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[12px]">
              {(
                product.inventoryQuantity - (product.stockQuantity ?? 0)
              ).toFixed(2)}
            </TableComponent.Value>
            <TableComponent.Value className="text-[12px]">
              {handleProductDescription(
                product.stockQuantity ?? 0,
                product.inventoryQuantity,
              )}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>

      <FinalizeAutoAdjust
        inventory={props.inventory}
        date={new Date()}
        selectResponsible={userId}
        stockId={props.inventory.stockId}
        addedProducts={productsNeedingAdjustment}
        adjustReasonId={adjustReason?.id}
      />
    </TableComponent>
  );
}
