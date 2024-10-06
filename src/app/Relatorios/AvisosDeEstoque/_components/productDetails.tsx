import { type Product } from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

type ProductType = {
  product: Product;
};

export default function ProductDetails(props: ProductType) {
  return (
    //       <span className="font-semibold">Produto:</span> {props.product.name}
    //   <p>
    //     <span className="font-semibold">Fornecedores:</span>{" "}
    //     {props.product.suppliers.map((supplier) => supplier.name).join(", ")}
    //   </p>
    //     <span className="font-semibold">Status:</span> {props.product.status}
    //   <p>
    //     <span className="font-semibold">Produto Pai:</span>{" "}
    //     {props.product.parent_product ?? "Não tem"}{" "}
    //   <p>
    //     <span className="font-semibold">Unidade de Compra:</span>{" "}
    //     {props.product.buy_unit.description} (
    //     {props.product.buy_unit.abbreviation})
    //   <p>
    //     <span className="font-semibold">Quantidade de Compra:</span>{" "}
    //     {props.product.buy_quantity}
    //   <p>
    //     <span className="font-semibold">Dia de Compra:</span>{" "}
    //     {props.product.buy_day}
    //   <p>
    //     <span className="font-semibold">Estoque Atual:</span>{" "}
    //     {props.product.stock_current}
    //   <p>
    //     <span className="font-semibold">Estoque Mínimo:</span>{" "}
    //     {props.product.stock_min}
    //   <p>
    //     <span className="font-semibold">Estoque Máximo:</span>{" "}
    //     {props.product.stock_max}
    //   <p>
    //     <span className="font-semibold">Tipo de Controle:</span>{" "}
    //     {props.product.type_of_control.description}
    //   <p>
    //     <span className="font-semibold">Categoria do Produto:</span>{" "}
    //     {props.product.product_category.description}
    //   <p>
    //     <span className="font-semibold">Setor de Utilização:</span>{" "}
    //     {props.product.sector_of_use.description}
    //   <p>
    //     <span className="font-semibold">Endereço de Estoque:</span>{" "}
    //     {`${props.product.address.stock}, ${props.product.address.storage}, ${props.product.address.shelf}`}
    //   <p>
    //     <span className="font-semibold">Usuários com Permissão:</span>{" "}
    //     {props.product.users_with_permission
    //       ? props.product.users_with_permission
    //           .map((user) => user.name)
    //           .join(", ")
    //       : "Sem usuários"}
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
            {props.product.suppliers
              .map((supplier) => supplier.name)
              .join(", ")}
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
            {props.product.parent_product ?? "Não tem"}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Unidade de Compra
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.buy_unit.description} (
            {props.product.buy_unit.abbreviation})
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Quantidade de Compra
          </TableCell>
          <TableCell className="flex border-0 px-[10px] py-[5px]">
            {props.product.buy_quantity}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Dia de Compra
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.buy_day}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Estoque Atual
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.stock_current}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Estoque Mínimo
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.stock_min}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Estoque Máximo
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.stock_max}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Tipo de Controle
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.type_of_control.description}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Categoria do Produto
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.product_category.description}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Setor de Utilização
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.sector_of_use.description}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Endereço de Estoque
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {`${props.product.address.stock}, ${props.product.address.storage}, ${props.product.address.shelf}`}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Usuários com Permissão
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.product.users_with_permission
              ? props.product.users_with_permission
                  .map((user) => user.name)
                  .join(", ")
              : "Sem usuários"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
