import { TableComponent } from "~/components/table";
import { Input } from "~/components/ui/input";

type Product = {
  code: number;
  product: string;
  minStock: number;
  currentStock: number;
  maxStock: number;
};

type ProductsRegisterProps = {
  productsTable: Product[];
  handleDetailsPress: ({ code }: { code: number }) => void;
};

export const ProductsRegister = (props: ProductsRegisterProps) => {
  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Produtos</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um prouduto para editar ou remover, ou edite nos campos da
        tabela abaixo
      </TableComponent.Subtitle>
      <TableComponent.Subtitle>FILTROS AQUI</TableComponent.Subtitle>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[70px_1fr_100px_100px_100px_130px] justify-between gap-7 sm:gap-14">
          <TableComponent.ValueTitle className="items-center justify-center text-center">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="items-center justify-center text-center">
            Estoque Atual
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="items-center justify-center text-center">
            Estoque Mínimo
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="items-center justify-center text-center">
            Estoque Máximo
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {props.productsTable.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[70px_1fr_100px_100px_100px_130px] justify-between gap-7 sm:gap-14 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value className="items-center justify-center text-center">
              {product.code}
            </TableComponent.Value>
            <TableComponent.Value>
              <Input
                defaultValue={product.product}
                className="h-7 bg-cinza_destaque sm:h-8"
              />
            </TableComponent.Value>
            <TableComponent.Value className="items-center justify-center text-center">
              <Input
                defaultValue={product.currentStock}
                className="h-7 bg-cinza_destaque text-center sm:h-8"
                type="number"
              />
            </TableComponent.Value>
            <TableComponent.Value className="items-center justify-center text-center">
              <Input
                defaultValue={product.minStock}
                className="h-7 bg-cinza_destaque text-center sm:h-8"
                type="number"
              />
            </TableComponent.Value>
            <TableComponent.Value className="items-center justify-center text-center">
              <Input
                defaultValue={product.maxStock}
                className="h-7 bg-cinza_destaque text-center sm:h-8"
                type="number"
              />
            </TableComponent.Value>
            <TableComponent.LineButton
              className="bg-cinza_destaque text-black hover:bg-hover_cinza_destaque"
              handlePress={() =>
                props.handleDetailsPress({ code: product.code })
              }
            >
              Detalhes
            </TableComponent.LineButton>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
