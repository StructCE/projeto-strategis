import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { type Entry } from "../../entryData";

type EntryType = {
  entry: Entry;
};

export const EntryDialogConfirm = (props: EntryType) => {
  // const handleApproveRequisition = (entry: EntryType) => {
  //   // TODO
  //   return undefined;
  // };

  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_130px] items-center justify-center">
          <TableComponent.ValueTitle>Código</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Fornecedor
          </TableComponent.ValueTitle>
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
            className={`grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{product.code}</TableComponent.Value>
            <TableComponent.Value>{product.name}</TableComponent.Value>
            <TableComponent.Value className="text-center">
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

        <TableButtonComponent className="flex w-full items-center justify-end pt-2 sm:pt-4">
          <TableButtonComponent.Button
            className="hover:bg-hover_vermelho_botao bg-vermelho_botao_1"
            // handlePress={handleApproveRequisition(props)}
          >
            Confirmar Recebimento
          </TableButtonComponent.Button>
        </TableButtonComponent>
      </TableComponent.Table>
    </TableComponent>
  );
};
