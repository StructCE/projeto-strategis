"use client";
import { useState } from "react";
import { FormComponent } from "~/components/forms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  account_plans,
  document_types,
  groups,
  projects,
  type AccountPlan,
  type Invoice,
} from "../invoicesData";
import { useInvoiceForm } from "./useInvoiceForm";

type InvoiceEditForm = {
  invoice: Invoice;
};

// TODO: useStates para armazenar info de cada product (e seus dados)
// TODO: lógica botões de reporte e confirmação
// TODO: lógica validação confirmação

export default function InvoiceDetails(props: InvoiceEditForm) {
  const invoiceEditForm = useInvoiceForm();

  const [selectedAccountPlan, setSelectedAccountPlan] = useState<AccountPlan>();

  const formatDateToString = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth()).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <Form {...invoiceEditForm.form}>
        <form
          onSubmit={invoiceEditForm.form.handleSubmit(
            invoiceEditForm.onSubmitConfirm,
          )}
        >
          <FormComponent className="mb-3 mt-1">
            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Empresa</FormComponent.Label>
                <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                  {props.invoice.company.name}
                </div>
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Fornecedor</FormComponent.Label>
                <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                  {props.invoice.supplier.name}
                </div>
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Data de Emissão</FormComponent.Label>
                <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                  {formatDateToString(props.invoice.date_document)}
                </div>
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Data de Vencimento</FormComponent.Label>
                <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                  {formatDateToString(props.invoice.date_deadline)}
                </div>
              </FormComponent.Frame>
            </FormComponent.Line>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Tipo de Documento</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione o tipo de documento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {document_types.map((document, index) => (
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
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Projeto</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione o projeto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projects.map((project, index) => (
                            <SelectItem value={project.name} key={index}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Plano de Contas</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="account_plan.name"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          const plan = account_plans.find(
                            (plan) => plan.name === value,
                          );
                          setSelectedAccountPlan(plan); // Atualiza o estado com o plano selecionado
                          field.onChange(value); // Atualiza o formulário com o valor selecionado
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione o plano de contas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {account_plans.map((plan, index) => (
                            <SelectItem value={plan.name} key={index}>
                              {plan.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Conta</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="account_plan.account"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedAccountPlan} // Desabilita o select se nenhum plano de contas estiver selecionado
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione a conta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedAccountPlan?.accounts.map(
                            (account, index) => (
                              <SelectItem value={account.name} key={index}>
                                {account.name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>
            </FormComponent.Line>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Tipo de Despesa</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="expense_type"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione o tipo de despesa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={`Despesa Fixa`}>
                            Despesa Fixa
                          </SelectItem>
                          <SelectItem value={`Despesa Variável`}>
                            Despesa Variável
                          </SelectItem>
                          <SelectItem value={`Receita`}>Receita</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Recorrência</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="recurrence"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione a recorrência" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={`Recorrente`}>
                            Recorrente
                          </SelectItem>
                          <SelectItem value={`Avulsa`}>Avulsa</SelectItem>
                          <SelectItem value={`Parcelas`}>Parcelas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Parcela</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="installment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                          placeholder="Parcela da nota fiscal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Grupo</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione o grupo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {groups.map((group, index) => (
                            <SelectItem value={group.name} key={index}>
                              {group.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>
            </FormComponent.Line>

            <h2 className="mb-1 text-[1.3rem] font-medium">Produtos:</h2>

            <Accordion
              type="single"
              collapsible
              className="mx-[1px] w-full p-0 shadow-[0px_0px_4px_0px_#0000004d]"
            >
              {props.invoice.products.map((product, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={`w-full border-b-[0px] ${index % 2 === 0 ? "bg-[#eaeaea]" : ""}`}
                >
                  <AccordionTrigger className="px-2 pb-0 text-[1.2rem] font-semibold">
                    #{index + 1} - {product.name}
                  </AccordionTrigger>
                  <AccordionContent className="w-full">
                    <div className="mx-4 flex flex-col gap-2">
                      <FormComponent.Line>
                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Produto
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {product.name}
                          </div>
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Código
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {product.code}
                          </div>
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            NCM
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {product.ncm}
                          </div>
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            CFOP
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {product.cfop}
                          </div>
                        </FormComponent.Frame>
                      </FormComponent.Line>

                      <FormComponent.Line>
                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Unidade
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {product.buy_unit.description}
                          </div>
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Quantidade
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {product.purchase_quantity}
                          </div>
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Valor por Unidade
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {product.value_unit}
                          </div>
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Valor Total
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {(
                              product.purchase_quantity * product?.value_unit
                            ).toFixed(2)}
                          </div>
                        </FormComponent.Frame>
                      </FormComponent.Line>

                      <FormComponent.BoxSpecify boxName="Informações do Produto:">
                        <FormComponent.Line>
                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Tipo de Controle
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.type_of_control.description}
                            </div>
                          </FormComponent.Frame>

                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Categoria do Produto
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.product_category.description}
                            </div>
                          </FormComponent.Frame>

                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Setor de Utilização
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.sector_of_use.description}
                            </div>
                          </FormComponent.Frame>
                        </FormComponent.Line>

                        <FormComponent.Line>
                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Estoque
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.address.stock}
                            </div>
                          </FormComponent.Frame>

                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Armário/Zona
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.address.storage}
                            </div>
                          </FormComponent.Frame>

                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Prateleira
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.address.shelf}
                            </div>
                          </FormComponent.Frame>
                        </FormComponent.Line>
                      </FormComponent.BoxSpecify>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <FormComponent.ButtonLayout className="mt-4 flex items-center justify-center gap-4 font-bold">
              <FormComponent.Button
                className="bg-vermelho_botao_2 px-5 py-1.5 text-lg font-semibold hover:bg-hover_vermelho_botao_2"
                handlePress={invoiceEditForm.form.handleSubmit(
                  invoiceEditForm.onSubmitReject,
                )}
              >
                Rejeitar NF
              </FormComponent.Button>

              <FormComponent.Button className="bg-verde_botao px-5 py-1.5 text-lg font-semibold hover:bg-hover_verde_botao">
                Confirmar NF
              </FormComponent.Button>
            </FormComponent.ButtonLayout>
          </FormComponent>
        </form>
      </Form>
    </div>
  );
}
