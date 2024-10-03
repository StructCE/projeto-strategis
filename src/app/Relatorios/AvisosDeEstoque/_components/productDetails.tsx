import { type Product } from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";

type ProductType = {
  product: Product;
};

export default function ProductDetails(props: ProductType) {
  return (
    <div className="flex flex-col gap-0.5 text-[15px] sm:text-[18px]">
      <p>
        <span className="font-semibold">Código:</span> {props.product.code}
      </p>
      <p>
        <span className="font-semibold">Produto:</span> {props.product.name}
      </p>
      <p>
        <span className="font-semibold">Fornecedores:</span>{" "}
        {props.product.suppliers.map((supplier) => supplier.name).join(", ")}
      </p>
      <p>
        <span className="font-semibold">Status:</span> {props.product.status}
      </p>
      <p>
        <span className="font-semibold">Produto Pai:</span>{" "}
        {props.product.parent_product ?? "Não tem"}{" "}
      </p>
      <p>
        <span className="font-semibold">Unidade de Compra:</span>{" "}
        {props.product.buy_unit.description} (
        {props.product.buy_unit.abbreviation})
      </p>
      <p>
        <span className="font-semibold">Quantidade de Compra:</span>{" "}
        {props.product.buy_quantity}
      </p>
      <p>
        <span className="font-semibold">Dia de Compra:</span>{" "}
        {props.product.buy_day}
      </p>
      <p>
        <span className="font-semibold">Estoque Atual:</span>{" "}
        {props.product.stock_current}
      </p>
      <p>
        <span className="font-semibold">Estoque Mínimo:</span>{" "}
        {props.product.stock_min}
      </p>
      <p>
        <span className="font-semibold">Estoque Máximo:</span>{" "}
        {props.product.stock_max}
      </p>
      <p>
        <span className="font-semibold">Tipo de Controle:</span>{" "}
        {props.product.type_of_control.description}
      </p>
      <p>
        <span className="font-semibold">Categoria do Produto:</span>{" "}
        {props.product.product_category.description}
      </p>
      <p>
        <span className="font-semibold">Setor de Utilização:</span>{" "}
        {props.product.sector_of_use.description}
      </p>
      <p>
        <span className="font-semibold">Endereço de Estoque:</span>{" "}
        {`${props.product.address.stock}, ${props.product.address.storage}, ${props.product.address.shelf}`}
      </p>
      <p>
        <span className="font-semibold">Usuários com Permissão:</span>{" "}
        {props.product.users_with_permission
          ? props.product.users_with_permission
              .map((user) => user.name)
              .join(", ")
          : "Sem usuários"}
      </p>
    </div>
  );
}
