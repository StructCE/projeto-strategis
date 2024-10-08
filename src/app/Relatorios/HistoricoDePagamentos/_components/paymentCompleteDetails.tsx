import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { type Payment } from "./paymentsData";

type PaymentType = {
  payment: Payment;
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
            {props.payment.document_number}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Empresa
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.company.name}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Fornecedor
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.supplier.name}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Data do Documento
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {new Date(props.payment.date_document).toLocaleDateString()}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Data de Vencimento
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {new Date(props.payment.date_deadline).toLocaleDateString()}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Produtos
          </TableCell>
          <TableCell className="flex border-0 px-[10px] py-[5px]">
            {props.payment.products.map((product) => product.name).join(", ")}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Banco
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.bank?.name}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Valor
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.value.toLocaleString("pt-BR", {
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
            {props.payment.installment}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Valor Pago
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.value_payed?.toLocaleString("pt-BR", {
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
            {new Date(
              props.payment.date_payment ? props.payment.date_payment : "",
            ).toLocaleDateString()}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Status
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.payed_status}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Tipo de Documento
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.document.name}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Plano de Contas
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.account_plan.name}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Conta
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.account_plan.account.name}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Projeto
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.project.name}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Tipo de Despesa
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.expense_type}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Recorrência
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.recurrence}
          </TableCell>
        </TableRow>

        <TableRow className="bg-[#fbfbfb]">
          <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
            Grupo
          </TableCell>
          <TableCell className="px-[10px] py-[5px]">
            {props.payment.group.name}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
