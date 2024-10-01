import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TableButtonComponent } from "~/components/tableButton";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { banks, type Payment } from "./paymentsData";
import { usePaymentForm } from "./usePaymentForm";

type PaymentType = {
  payment: Payment;
};

export default function PaymentDetails(props: PaymentType) {
  const paymentEditForm = usePaymentForm(props.payment);

  return (
    <Form {...paymentEditForm.form}>
      <form
        onSubmit={paymentEditForm.form.handleSubmit(paymentEditForm.onSubmit)}
      >
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
                {props.payment.products
                  .map((product) => product.name)
                  .join(", ")}
              </TableCell>
            </TableRow>

            <TableRow className="bg-[#fbfbfb]">
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Banco*
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                <FormField
                  control={paymentEditForm.form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-fit border-[1px] border-borda_input bg-fundo_destaque_relatorio py-[5px] placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione o banco do pagamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {banks.map((document, index) => (
                            <SelectItem value={document.name} key={index}>
                              {document.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                Valor Pago*
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                <FormField
                  control={paymentEditForm.form.control}
                  name="value_payed"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="h-fit border-[1px] border-borda_input bg-fundo_destaque_relatorio py-[5px] placeholder-placeholder_input focus-visible:bg-fundo_destaque_relatorio"
                          placeholder="Valor pago"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>

            <TableRow className="bg-[#fbfbfb]">
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Data de Pagamento*
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                <FormField
                  control={paymentEditForm.form.control}
                  name="date_payment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="focus-hover:bg-fundo_destaque_relatorio h-fit w-full border-[1px] border-borda_input bg-fundo_destaque_relatorio px-3 py-[5px] font-normal placeholder-placeholder_input"
                            >
                              {field.value ? (
                                format(new Date(field.value), "dd/MM/yyyy")
                              ) : (
                                <span>Selecione a data do pagamento</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) => {
                                field.onChange(date?.toISOString());
                              }}
                              disabled={(date) => date > new Date()}
                              // initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Status*
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                <FormField
                  control={paymentEditForm.form.control}
                  name="payed_status"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-fit border-[1px] border-borda_input bg-fundo_destaque_relatorio py-[5px] placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione o status do pagamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={`Pago`}>Pago</SelectItem>
                          <SelectItem value={`Em Aberto`}>Em Aberto</SelectItem>
                          <SelectItem value={`Cancelado`}>Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                Projeto
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                {props.payment.project.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Conta
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                {props.payment.account.name}
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
        <TableButtonComponent className="pt-1 sm:pt-2">
          <TableButtonComponent.Button className="min-h-0 min-w-0 rounded-md bg-cinza_borda_acordeao px-2 py-1 text-black">
            Salvar
          </TableButtonComponent.Button>
        </TableButtonComponent>
      </form>
    </Form>
  );
}
