import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { type SerializedInvoice } from "~/server/interfaces/invoice/invoice.route.interfaces";

type PaymentType = {
  invoice: SerializedInvoice;
};

export default function PaymentCompleteDetails(props: PaymentType) {
  return (
    <Table>
      <TableBody>
        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Nº do Documento
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.documentNumber}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Empresa
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.company.name}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Fornecedor
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.supplier.name}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Data do Documento
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {new Date(props.invoice.documentDate).toLocaleDateString()}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Data de Vencimento
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {new Date(props.invoice.deadlineDate).toLocaleDateString()}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Produtos
          </TableCell>
          <TableCell className="flex border-0 px-[10px] py-[5px]">
            {props.invoice.invoiceProducts
              .map((product) => product.name)
              .join(", ")}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Banco
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.bank ? props.invoice.bank.name : "Não informado"}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Valor
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.invoiceValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Parcela
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.installment}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Valor Pago
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.payedValue?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Data de Pagamento
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.paymentDate
              ? new Date(
                  props.invoice.paymentDate ? props.invoice.paymentDate : "",
                ).toLocaleDateString()
              : "Não informada"}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Status
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.payedStatus}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Tipo de Despesa
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.expenseType}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Recorrência
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.recurrence}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Tipo de Documento
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.documentType?.name}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Plano de Contas
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.accountPlan
              ? props.invoice.accountPlan.name
              : "Não informado"}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Conta
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.account
              ? props.invoice.account.name
              : "Não informado"}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Projeto
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.project
              ? props.invoice.project.name
              : "Não informado"}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Grupo
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.invoice.group ? props.invoice.group.name : "Não informado"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
