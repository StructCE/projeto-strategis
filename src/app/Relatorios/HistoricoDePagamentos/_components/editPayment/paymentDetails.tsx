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
import { type SerializedInvoice } from "~/server/interfaces/invoice/invoice.route.interfaces";
import { api } from "~/trpc/react";
import { usePaymentForm } from "./usePaymentForm";

type PaymentType = {
  invoice: SerializedInvoice;
};

export default function PaymentDetails(props: PaymentType) {
  const paymentEditForm = usePaymentForm(props.invoice);

  const { data: banks = [] } = api.generalParameters.bank.getAll.useQuery();

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
                Parcela
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                {props.invoice.installment}
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
                Valor Pago*
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                <FormField
                  control={paymentEditForm.form.control}
                  name="payedValue"
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

            <TableRow>
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Data de Pagamento*
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                <FormField
                  control={paymentEditForm.form.control}
                  name="paymentDate"
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

            <TableRow className="bg-[#fbfbfb]">
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Banco*
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                <FormField
                  control={paymentEditForm.form.control}
                  name="bankId"
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
                          {banks.map((bank, index) => (
                            <SelectItem value={bank.id} key={index}>
                              {bank.name}
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
                Status*
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                <FormField
                  control={paymentEditForm.form.control}
                  name="payedStatus"
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
                Tipo de Despesa
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                {props.invoice.expenseType ?? "Não informado"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Recorrência
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                {props.invoice.recurrence ?? "Não informada"}
              </TableCell>
            </TableRow>

            <TableRow className="bg-[#fbfbfb]">
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Tipo de Documento
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                {props.invoice.documentType?.name ?? "Não informado"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Plano de Contas
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                {props.invoice.accountPlan?.name ?? "Não informado"}
              </TableCell>
            </TableRow>

            <TableRow className="bg-[#fbfbfb]">
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Conta
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                {props.invoice.account?.name != undefined &&
                props.invoice.account?.name != ""
                  ? props.invoice.account?.name
                  : "Não informado"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Projeto
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                {props.invoice.project?.name ?? "Não informado"}
              </TableCell>
            </TableRow>

            <TableRow className="bg-[#fbfbfb]">
              <TableCell className="w-[250px] px-[10px] py-[5px] font-medium">
                Grupo
              </TableCell>
              <TableCell className="px-[10px] py-[5px]">
                {props.invoice.group?.name ?? "Não informado"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TableButtonComponent className="pt-1 sm:pt-2">
          <TableButtonComponent.Button className="min-h-0 min-w-0 rounded-md bg-verde_botao px-2 py-1 text-black hover:bg-hover_verde_botao">
            Salvar
          </TableButtonComponent.Button>
        </TableButtonComponent>
      </form>
    </Form>
  );
}
