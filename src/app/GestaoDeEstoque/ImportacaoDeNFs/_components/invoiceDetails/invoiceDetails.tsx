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
import { type AccountPlan } from "~/server/interfaces/accountPlan/accountPlan.route.interfaces";
import { type SerializedInvoice } from "~/server/interfaces/invoice/invoice.route.interfaces";
import { api } from "~/trpc/react";
import { useEditInvoiceForm } from "./useEditInvoiceForm";

type InvoiceEditForm = {
  invoice: SerializedInvoice;
};

export default function InvoiceDetails(props: InvoiceEditForm) {
  const invoiceEditForm = useEditInvoiceForm(props.invoice);

  const [selectedAccountPlan, setSelectedAccountPlan] =
    useState<AccountPlan | null>(props.invoice.accountPlan ?? null);

  // const { data: suppliers = [] } = api.supplier.getAll.useQuery({filters: {},});;
  // const { data: companies = [] } = api.company.getAllCompanies.useQuery({});
  const { data: documentTypes = [] } =
    api.generalParameters.documentType.getAll.useQuery();
  const { data: groups = [] } = api.generalParameters.group.getAll.useQuery();
  const { data: projects = [] } =
    api.generalParameters.project.getAll.useQuery();
  const { data: accountPlans = [] } =
    api.generalParameters.accountPlan.getAll.useQuery();

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
                  {formatDateToString(props.invoice.documentDate)}
                </div>
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Data de Vencimento</FormComponent.Label>
                <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                  {formatDateToString(props.invoice.deadlineDate)}
                </div>
              </FormComponent.Frame>
            </FormComponent.Line>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Tipo de Despesa</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="expenseType"
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
                          placeholder="Parcela da nota fiscal ('única' ou nº da parcela)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Tipo de Documento</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="documentTypeId"
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
                          {documentTypes.map((document, index) => (
                            <SelectItem value={document.id} key={index}>
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
            </FormComponent.Line>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Projeto</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="projectId"
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
                            <SelectItem value={project.id} key={index}>
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
                <Select
                  onValueChange={(value) => {
                    const plan = accountPlans.find((plan) => plan.id === value);
                    setSelectedAccountPlan(plan ?? null);
                  }}
                  value={selectedAccountPlan?.id}
                  defaultValue={selectedAccountPlan?.id}
                >
                  <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                    <SelectValue placeholder="Selecione o plano de contas" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountPlans.map((plan, index) => (
                      <SelectItem value={plan.id} key={index}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Conta</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedAccountPlan}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione a conta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedAccountPlan?.accounts.map(
                            (account, index) => (
                              <SelectItem value={account.id} key={index}>
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

              <FormComponent.Frame>
                <FormComponent.Label>Grupo</FormComponent.Label>
                <FormField
                  control={invoiceEditForm.form.control}
                  name="groupId"
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
                            <SelectItem value={group.id} key={index}>
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
              {props.invoice.invoiceProducts.map((product, index) => (
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
                            {product.unit.name
                              ? `${product.unit.name} (${product.unit.abbreviation}) - ${product.unit.unitsPerPack}`
                              : `${product.unit.abbreviation} - ${product.unit.unitsPerPack}`}
                          </div>
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Quantidade
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {product.purchaseQuantity}
                          </div>
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Valor por Unidade
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {product.unitValue}
                          </div>
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Valor Total
                          </FormComponent.Label>
                          <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                            {(
                              product.purchaseQuantity * product?.unitValue
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
                              {product.controlType ?? "Não definido"}
                            </div>
                          </FormComponent.Frame>

                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Categoria do Produto
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.category ?? "Não definido"}
                            </div>
                          </FormComponent.Frame>

                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Setor de Utilização
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.useSector ?? "Não definido"}
                            </div>
                          </FormComponent.Frame>
                        </FormComponent.Line>

                        <FormComponent.Line>
                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Estoque
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.shelf
                                ? product.shelf.cabinet.StockCabinet.map(
                                    (stockCabinet) => stockCabinet.stock.name,
                                  )
                                : "Não definido"}
                            </div>
                          </FormComponent.Frame>

                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Armário/Zona
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.shelf
                                ? product.shelf.cabinet.name
                                : "Não definido"}
                            </div>
                          </FormComponent.Frame>

                          <FormComponent.Frame>
                            <FormComponent.Label className="text-[#444444]">
                              Prateleira
                            </FormComponent.Label>
                            <div className="flex h-10 w-full cursor-not-allowed items-center rounded-md border-[1px] border-borda_input border-input bg-background bg-white px-3 py-2 text-sm opacity-50 ring-offset-background">
                              {product.shelf
                                ? product.shelf.name
                                : "Não definido"}
                            </div>
                          </FormComponent.Frame>
                        </FormComponent.Line>
                      </FormComponent.BoxSpecify>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {props.invoice.confirmedStatus === "Pendente" ? (
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
            ) : (
              <></>
            )}
          </FormComponent>
        </form>
      </Form>
    </div>
  );
}
