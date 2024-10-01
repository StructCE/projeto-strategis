"use client";
import { format } from "date-fns";
import { CalendarIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { companies } from "~/app/ConfiguracoesGerais/CadastroDeEmpresas/_components/companiesData";
import { stocks } from "~/app/ConfiguracoesGerais/CadastroDeEstoques/_components/stockData";
import { suppliers } from "~/app/ConfiguracoesGerais/CadastroDeFornecedores/_components/supplierData";
import {
  ProductCategories,
  SectorsOfUse,
  TypesOfControl,
  units,
} from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import { FormComponent } from "~/components/forms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  account_plans,
  document_types,
  groups,
  projects,
  type AccountPlan,
} from "../_components/invoicesData";
import { useCreateInvoiceForm } from "./useInvoiceForm";

// TODO: useStates para armazenar info de cada product (e seus dados)
// TODO: lógica botões de reporte e confirmação
// TODO: lógica validação confirmação

export default function ManuallyImportInvoice() {
  const invoiceCreateForm = useCreateInvoiceForm();

  const [selectedAccountPlan, setSelectedAccountPlan] = useState<AccountPlan>();

  return (
    <div>
      <Form {...invoiceCreateForm.form}>
        <form
          onSubmit={invoiceCreateForm.form.handleSubmit(
            invoiceCreateForm.onSubmit,
          )}
        >
          <FormComponent className="mb-3 mt-1">
            <FormComponent.Title>
              Adicionar Nota Fiscal Manulamente
            </FormComponent.Title>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Empresa</FormComponent.Label>
                <FormField
                  control={invoiceCreateForm.form.control}
                  name="company.name"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione a empresa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companies.map((component, index) => (
                            <SelectItem value={component.name} key={index}>
                              {component.name}
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
                <FormComponent.Label>Fornecedor</FormComponent.Label>
                <FormField
                  control={invoiceCreateForm.form.control}
                  name="supplier.name"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione o fornecedor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {suppliers.map((supplier, index) => (
                            <SelectItem value={supplier.name} key={index}>
                              {supplier.name}
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
                <FormComponent.Label>Número da Nota Fiscal</FormComponent.Label>
                <FormField
                  control={invoiceCreateForm.form.control}
                  name="document_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                          placeholder="Número da nota fiscal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>
            </FormComponent.Line>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Data de Emissão</FormComponent.Label>
                <FormField
                  control={invoiceCreateForm.form.control}
                  name="date_document"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full border-[1px] border-borda_input bg-white placeholder-placeholder_input"
                            >
                              {field.value ? (
                                format(new Date(field.value), "dd/MM/yyyy")
                              ) : (
                                <span>Selecione a data de emissão</span>
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
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Data de Vencimento</FormComponent.Label>
                <FormField
                  control={invoiceCreateForm.form.control}
                  name="date_deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full border-[1px] border-borda_input bg-white placeholder-placeholder_input"
                            >
                              {field.value ? (
                                format(new Date(field.value), "dd/MM/yyyy")
                              ) : (
                                <span>Selecione a data de vencimento</span>
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
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>
            </FormComponent.Line>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Tipo de Documento</FormComponent.Label>
                <FormField
                  control={invoiceCreateForm.form.control}
                  name="document.name"
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
                  control={invoiceCreateForm.form.control}
                  name="project.name"
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
                  control={invoiceCreateForm.form.control}
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
                  control={invoiceCreateForm.form.control}
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
                  control={invoiceCreateForm.form.control}
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
                  control={invoiceCreateForm.form.control}
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
                  control={invoiceCreateForm.form.control}
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
                  control={invoiceCreateForm.form.control}
                  name="group.name"
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
              {invoiceCreateForm.fieldsArray.map((product, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={`w-full border-b-[0px] ${index % 2 === 0 ? "bg-[#eaeaea]" : ""}`}
                >
                  <AccordionTrigger className="px-2 pb-0 text-[1.2rem] font-semibold">
                    Produto #{index + 1}
                  </AccordionTrigger>
                  <AccordionContent className="w-full">
                    <div className="mx-4 flex flex-col gap-2">
                      <FormComponent.Line>
                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Produto
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                                    placeholder="Nome do produto"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Código
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.code`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                                    placeholder="Código do produto"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            NCM
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.ncm`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                                    placeholder="NCM do produto"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            CFOP
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.cfop`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                                    placeholder="CFOP do produto"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormComponent.Frame>
                      </FormComponent.Line>

                      <FormComponent.Line>
                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Unidade
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.buy_unit`}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                                      <SelectValue placeholder="Selecione a unidade de compra" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {units.map((unit, index) => (
                                      <SelectItem
                                        value={unit.description}
                                        key={index}
                                      >
                                        {unit.description} ({unit.abbreviation})
                                        - {unit.unitsPerPack}
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
                          <FormComponent.Label className="text-[#444444]">
                            Quantidade
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.purchase_quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                                    placeholder="Quantidade de compra"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormComponent.Frame>

                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Valor por Unidade
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.value_unit`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                                    placeholder="Valor por unidade do produto"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormComponent.Frame>
                      </FormComponent.Line>

                      <FormComponent.Line>
                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Tipo de Controle
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.type_of_control`}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                                      <SelectValue placeholder="Selecione o tipo de controle do produto" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {TypesOfControl.map((type, index) => (
                                      <SelectItem
                                        value={type.description}
                                        key={index}
                                      >
                                        {type.description}
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
                          <FormComponent.Label className="text-[#444444]">
                            Categoria do Produto
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.product_category`}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                                      <SelectValue placeholder="Selecione a categoria do produto" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {ProductCategories.map(
                                      (category, index) => (
                                        <SelectItem
                                          value={category.description}
                                          key={index}
                                        >
                                          {category.description}
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
                          <FormComponent.Label className="text-[#444444]">
                            Setor de Utilização
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.sector_of_use`}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                                      <SelectValue placeholder="Selecione o setor de utilização do produto" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {SectorsOfUse.map((sector, index) => (
                                      <SelectItem
                                        value={sector.description}
                                        key={index}
                                      >
                                        {sector.description}
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
                          <FormComponent.Label className="text-[#444444]">
                            Endereço de Estoque
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`products.${index}.address`}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={(value) => {
                                    const { stock, storage, shelf } =
                                      JSON.parse(value) as {
                                        stock: string;
                                        storage: string;
                                        shelf: string;
                                      };
                                    field.onChange({
                                      stock,
                                      storage,
                                      shelf,
                                    });
                                  }}
                                  defaultValue={JSON.stringify(field.value)}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                                      <SelectValue placeholder="Selecione o estoque do produto" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {stocks.map((stock) =>
                                      stock.address.map((storage) =>
                                        storage.shelves.map((shelf, index) => (
                                          <SelectItem
                                            // Stringificando o objeto com stock, storage, e shelf
                                            value={JSON.stringify({
                                              stock: stock.name,
                                              storage: storage.description,
                                              shelf: shelf.description,
                                            })}
                                            key={index}
                                          >
                                            {`${stock.name} - ${storage.description} - ${shelf.description}`}
                                          </SelectItem>
                                        )),
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

                      <div className="flex w-full justify-end p-1">
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger className="flex h-full cursor-pointer self-center">
                              <Trash2
                                size={24}
                                onClick={() =>
                                  invoiceCreateForm.arrayRemove(index)
                                }
                              />
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              Remover produto
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <FormComponent.ButtonLayout>
              <button
                onClick={() =>
                  invoiceCreateForm.arrayAppend({
                    name: "",
                    code: "",
                    ncm: 0,
                    cfop: 0,
                    buy_unit: "",
                    purchase_quantity: 0,
                    value_unit: 0,
                    type_of_control: "",
                    product_category: "",
                    sector_of_use: "",
                    address: {
                      stock: "",
                      storage: "",
                      shelf: "",
                    },
                  })
                }
                className="min-w-28 rounded-lg bg-cinza_escuro_botao px-[20px] py-[8px] text-white hover:bg-hover_cinza_escuro_botao"
                type="button"
              >
                <p className="text-[14px] font-semibold tracking-wider sm:text-[16px] sm:tracking-normal">
                  Adicionar Produto
                </p>
              </button>
            </FormComponent.ButtonLayout>

            <FormComponent.ButtonLayout className="flex items-center justify-center gap-4 font-bold">
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
