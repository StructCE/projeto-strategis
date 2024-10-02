import { TableComponent } from "~/components/table";

import { TableButtonComponent } from "~/components/tableButton";
import { type entryData } from "../../entryData";

type suppliers = {
  name: string;
};

type products = {
  code: string;
  name: string;
  supplier_product: string;
  unit: string;
  quantity_unit: string;
  quantity_bale: string;
  price_unit: string;
  total_price: string;
};

type detailsEntry = {
  code: string;
  product: products[];
  unit: string;
  quantity_unit: number;
  quantity_bale: number;
  price_unit: number;
  total_price: number;
};

type entryData = {
  invoice: string;
  date_issue: string;
  quantity_products: number;
  suppliers: suppliers[];
  details_entry: detailsEntry[];
  manager: string;
};

export const EntryDialogConfirm = (props: {
  requisitionConfirmEntry: entryData;
}) => {
  const { requisitionConfirmEntry } = props;

  let rowIndex = 0; // Conta o número de linhas renderizadas de uma tabela

  const handleApproveRequisition = (req: entryData) => {
    // TODO
    return undefined;
  };

  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.Title>Detalhes da Entrada</TableComponent.Title>
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
            Valor (unidade)
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Valor (total)
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {requisitionConfirmEntry.details_entry.map((detail) =>
          detail.product.map((product) => {
            rowIndex++;
            return (
              <TableComponent.Line
                className={`grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_130px] ${
                  rowIndex % 2 !== 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
                key={rowIndex}
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
            );
          }),
        )}
        <TableButtonComponent className="justify-endpt-2 mt-6 flex w-full items-center sm:pt-4">
          <TableButtonComponent.Button
            className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao"
            handlePress={handleApproveRequisition(
              props.requisitionConfirmEntry,
            )}
          >
            Confirmar Recebimento
          </TableButtonComponent.Button>
        </TableButtonComponent>
      </TableComponent.Table>
    </TableComponent>
  );
};
