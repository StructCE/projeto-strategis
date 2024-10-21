"use client";
import { format } from "date-fns";
import { CalendarIcon, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter";
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
import { type AccountPlan } from "~/server/interfaces/accountPlan/accountPlan.route.interfaces";
import { api } from "~/trpc/react";
import { useCreateInvoiceForm } from "./useInvoiceForm";

export default function ManuallyImportInvoice() {
  const invoiceCreateForm = useCreateInvoiceForm();

  // const [selectedStockId, setSelectedStockId] = useState<string>();
  const [selectedAccountPlan, setSelectedAccountPlan] = useState<AccountPlan>();

  const [inputCode, setInputCode] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [selectSupplierId, setSelectSupplierId] = useState("");

  const { data: suppliers = [] } = api.supplier.getAll.useQuery({});
  const { data: companies = [] } = api.company.getAllCompanies.useQuery({});
  const { data: documentTypes = [] } =
    api.generalParameters.documentType.getAll.useQuery();
  const { data: groups = [] } = api.generalParameters.group.getAll.useQuery();
  const { data: projects = [] } =
    api.generalParameters.project.getAll.useQuery();
  const { data: accountPlans = [] } =
    api.generalParameters.accountPlan.getAll.useQuery();
  // const { data: products = [] } = api.product.getProductsBySupplierId.useQuery({
  //   supplierId: selectSupplierId,
  // });
  // const { data: controlTypes = [] } =
  //   api.generalParameters.controlType.getAll.useQuery();
  // const { data: productCategories = [] } =
  //   api.generalParameters.productCategory.getAll.useQuery();
  // const { data: sectorsOfUse = [] } =
  //   api.generalParameters.useSector.getAll.useQuery();
  // const { data: units = [] } = api.generalParameters.unit.getAll.useQuery();
  // const { data: stocks = [] } = api.stock.getAllStocks.useQuery({});
  // const { data: cabinets = [] } =
  //   api.generalParameters.cabinet.getCabinetFromStock.useQuery({
  //     stockId: selectedStockId ? selectedStockId : "",
  //   });
  const { data: productSuppliers = [] } =
    api.product.getAllProductSupplier.useQuery();

  const filteredProducts = productSuppliers.filter((productSupplier) => {
    const matchesSupplier =
      selectSupplierId === "" ||
      productSupplier.supplier.id === selectSupplierId;
    const matchesCode =
      inputCode === "" || productSupplier.product.code.includes(inputCode);
    const matchesProduct =
      inputProduct === "" ||
      productSupplier.product.name
        .toLowerCase()
        .includes(inputProduct.toLowerCase());

    return matchesSupplier && matchesCode && matchesProduct;
  });

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
                <FormComponent.Label>Número da Nota Fiscal</FormComponent.Label>
                <FormField
                  control={invoiceCreateForm.form.control}
                  name="documentNumber"
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

              <FormComponent.Frame>
                <FormComponent.Label>Empresa</FormComponent.Label>
                <FormField
                  control={invoiceCreateForm.form.control}
                  name="companyId"
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
                          {companies.map((company, index) => (
                            <SelectItem value={company.id} key={index}>
                              {company.name}
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
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectSupplierId(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                            <SelectValue placeholder="Selecione o fornecedor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {suppliers.map((supplier, index) => (
                            <SelectItem value={supplier.id} key={index}>
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
            </FormComponent.Line>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Data de Emissão</FormComponent.Label>
                <FormField
                  control={invoiceCreateForm.form.control}
                  name="documentDate"
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
                  name="deadlineDate"
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
                <FormComponent.Label>Tipo de Despesa</FormComponent.Label>
                <FormField
                  control={invoiceCreateForm.form.control}
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
                  control={invoiceCreateForm.form.control}
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
                  control={invoiceCreateForm.form.control}
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
                    setSelectedAccountPlan(plan);
                  }}
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
                  control={invoiceCreateForm.form.control}
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
                  control={invoiceCreateForm.form.control}
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

            <h2 className="text-[1.4rem] font-medium">Produtos:</h2>

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
                      <FormComponent.Line className="my-1 flex items-center">
                        <div className="flex items-center gap-2 text-base">
                          Utilize os filtros para encontrar e selecionar um
                          produto cadastrado no estoque:
                          <Filter className="lg:w-[130px]">
                            <Filter.Icon
                              icon={({ className }: { className: string }) => (
                                <Search className={className} />
                              )}
                            />
                            <Filter.Input
                              placeholder="Código"
                              state={inputCode}
                              setState={setInputCode}
                            />
                          </Filter>
                          <Filter>
                            <Filter.Icon
                              icon={({ className }: { className: string }) => (
                                <Search className={className} />
                              )}
                            />
                            <Filter.Input
                              placeholder="Nome do produto"
                              state={inputProduct}
                              setState={setInputProduct}
                            />
                          </Filter>
                        </div>
                      </FormComponent.Line>

                      <FormComponent.Line>
                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Produto
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`invoiceProducts.${index}.productSupplierId`}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                                      <SelectValue placeholder="Selecione o produto" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {filteredProducts.map(
                                      (productSupplier, index) => (
                                        <SelectItem
                                          value={productSupplier.id}
                                          key={index}
                                        >
                                          {productSupplier.product.name}
                                          {/* - {productSupplier.supplier.name} */}
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
                            Quantidade
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`invoiceProducts.${index}.purchaseQuantity`}
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
                            name={`invoiceProducts.${index}.unitValue`}
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

                      {/* <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Produto
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`invoiceProducts.${index}.name`}
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
                            name={`invoiceProducts.${index}.code`}
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
                        </FormComponent.Frame> */}

                      {/* <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            NCM
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`invoiceProducts.${index}.ncm`}
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
                            name={`invoiceProducts.${index}.cfop`}
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
                        </FormComponent.Frame> */}

                      {/* <FormComponent.Line>
                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Unidade
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`invoiceProducts.${index}.unitId`}
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
                                      <SelectItem value={unit.name} key={index}>
                                        {unit.name} ({unit.abbreviation}) -{" "}
                                        {unit.unitsPerPack}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormComponent.Frame>
                      </FormComponent.Line> */}

                      {/* <FormComponent.Line>
                        <FormComponent.Frame>
                          <FormComponent.Label className="text-[#444444]">
                            Tipo de Controle
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`invoiceProducts.${index}.controlTypeId`}
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
                                    {controlTypes.map((type, index) => (
                                      <SelectItem value={type.id} key={index}>
                                        {type.name}
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
                            name={`invoiceProducts.${index}.categoryId`}
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
                                    {productCategories.map(
                                      (category, index) => (
                                        <SelectItem
                                          value={category.id}
                                          key={index}
                                        >
                                          {category.name}
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
                            name={`invoiceProducts.${index}.sectorOfUseId`}
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
                                    {sectorsOfUse.map((sector, index) => (
                                      <SelectItem value={sector.id} key={index}>
                                        {sector.name}
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
                          <FormComponent.Label>Estoque</FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`invoiceProducts.${index}.stockId`}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={(value) => {
                                    setSelectedStockId(value);
                                    field.onChange(value);
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                                      <SelectValue placeholder="Selecione o estoque do produto" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {stocks.map((stock, index) => (
                                      <SelectItem value={stock.id} key={index}>
                                        {stock.name}
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
                          <FormComponent.Label>
                            Endereço no Estoque
                          </FormComponent.Label>
                          <FormField
                            control={invoiceCreateForm.form.control}
                            name={`invoiceProducts.${index}.shelfId`}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  disabled={!selectedStockId}
                                >
                                  <FormControl>
                                    <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                                      <SelectValue placeholder="Selecione um endereço do estoque selecionado" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {cabinets.map((cabinet) =>
                                      cabinet.shelf.map((shelf, index) => (
                                        <SelectItem
                                          value={shelf.id}
                                          key={index}
                                        >
                                          {cabinet.name} - {shelf.name}
                                        </SelectItem>
                                      )),
                                    )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </FormComponent.Frame>
                      </FormComponent.Line> */}

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

            <FormComponent.ButtonLayout className="justify-end">
              <button
                onClick={() =>
                  invoiceCreateForm.arrayAppend({
                    // name: "",
                    // code: "",
                    // ncm: 0,
                    // cfop: 0,
                    // unitId: "",
                    productSupplierId: "",
                    purchaseQuantity: 0,
                    unitValue: 0,
                    // controlTypeId: "",
                    // categoryId: "",
                    // sectorOfUseId: "",
                    // stockId: "",
                    // shelfId: "",
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
