import { TableComponent } from "~/components/table";
import { type Entry } from "../../entryData";

type EntryType = {
  entry: Entry;
};

export const EntryDialogDetails = (props: EntryType) => {
  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_130px] gap-4">
          <TableComponent.ValueTitle className="text-center">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Fornecedor</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Unidade
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Quantidade (unidade)
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Quantidade (fardo)
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Valor
            <br />
            (unidade)
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Valor
            <br />
            (total)
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.entry.products.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_130px] gap-4 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value className="text-center">
              {product.code}
            </TableComponent.Value>
            <TableComponent.Value>{product.name}</TableComponent.Value>
            <TableComponent.Value>
              {product.supplier_product}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.unit}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.quantity_unit}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.quantity_bale}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.price_unit}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.total_price}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
