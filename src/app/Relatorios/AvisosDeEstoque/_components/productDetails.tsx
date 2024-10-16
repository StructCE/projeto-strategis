import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { type ProductWithFeatures } from "~/server/interfaces/product/product.route.interfaces";
import { api } from "~/trpc/react";

type ProductType = {
  product: ProductWithFeatures;
};

export default function ProductDetails(props: ProductType) {
  return (
    <Table>
      <TableBody>
        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Código
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.code}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Fornecedores
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.ProductSupplier.length
              ? props.product.ProductSupplier.map(
                  (supplier) => supplier.supplier.name,
                ).join(", ")
              : "N/A"}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Status
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.status}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Produto Pai
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.parentProduct?.name ?? "Não tem"}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Unidade de Compra
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.unit.name} ({props.product.unit.abbreviation})
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Quantidade de Compra
          </TableCell>
          <TableCell className="flex border-0 px-[10px] py-[5px]">
            {props.product.buyQuantity}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Dia de Compra
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.buyDay}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Estoque Atual
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.currentStock}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Estoque Mínimo
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.minimunStock}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Estoque Máximo
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.maximumStock}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Tipo de Controle
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.controlType.name}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Categoria do Produto
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.category.name}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Setor de Utilização
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.sectorOfUse.name}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Endereço de Estoque
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {`${props.product.shelf.cabinet.StockCabinet.map((stockCabinet) => stockCabinet.stock.name).join()}, ${props.product.shelf.cabinet.name}, ${props.product.shelf.name}`}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell>
            {props.product.usersWithPermission.length > 0
              ? props.product.usersWithPermission
                  .map((user) => user.user.name)
                  .join(", ")
              : "Sem usuários"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
