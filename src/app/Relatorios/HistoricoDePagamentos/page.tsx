"use client";
import {
  Building2,
  Calendar,
  Check,
  Clock,
  Download,
  Eraser,
  Landmark,
  Search,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";
import { companies } from "~/app/ConfiguracoesGerais/CadastroDeEmpresas/_components/companiesData";
import { suppliers } from "~/app/ConfiguracoesGerais/CadastroDeFornecedores/_components/supplierData";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import PaymentDetails from "./_components/paymentDetails";
import {
  account_plans,
  banks,
  groups,
  payments,
  projects,
} from "./_components/paymentsData";

export default function PaymentHistory() {
  // Checkboxes dos pagamentos
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  // Filtros - Linha 1
  const [dateDocument, setDateDocument] = useState<Date | undefined>(undefined);
  const [openDateDocument, setOpenDateDocument] = useState(false);
  const [dateDeadline, setDateDeadline] = useState<Date | undefined>(undefined);
  const [openDateDeadline, setOpenDateDeadline] = useState(false);
  const [datePayment, setDatePayment] = useState<Date | undefined>(undefined);
  const [openDatePayment, setOpenDatePayment] = useState(false);
  const [inputDescription, setInputDescription] = useState("");

  // Filtros - Linha 2
  const [selectBank, setSelectBank] = useState("");
  const [selectSupplier, setSelectSupplier] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [selectTypeOfStatus, setSelectTypeOfStatus] = useState("");
  const [selectStatus, setSelectStatus] = useState("");

  // Filtros - Linha 3
  const [selectAccountPlan, setSelectAccountPlan] = useState("");
  const [selectGroup, setSelectGroup] = useState("");
  const [selectAccount, setSelectAccount] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [selectExpenseType, setSelectExpenseType] = useState("");

  // Filtragem dos pagamentos
  const filteredPayments = payments.filter((payment) => {
    const matchesDateDocument =
      !dateDocument ||
      (payment.date_document.getDate() === dateDocument.getDate() &&
        payment.date_document.getMonth() === dateDocument.getMonth() + 1 &&
        payment.date_document.getFullYear() === dateDocument.getFullYear());

    const matchesDateDeadline =
      !dateDeadline ||
      (payment.date_deadline.getDate() === dateDeadline.getDate() &&
        payment.date_deadline.getMonth() === dateDeadline.getMonth() + 1 &&
        payment.date_deadline.getFullYear() === dateDeadline.getFullYear());

    const matchesDatePayment =
      !datePayment ||
      (payment.date_payment &&
        payment.date_payment.getDate() === datePayment.getDate() &&
        payment.date_payment.getMonth() === datePayment.getMonth() + 1 &&
        payment.date_payment.getFullYear() === datePayment.getFullYear());

    const matchesDescription =
      inputDescription === "" ||
      payment.document_number.includes(inputDescription);

    const matchesBank = selectBank === "" || payment.bank.name === selectBank;

    const matchesSupplier =
      selectSupplier === "" || payment.supplier.name === selectSupplier;

    const matchesCompany =
      selectCompany === "" || payment.company.name === selectCompany;

    const matchesTypeOfStatus =
      selectTypeOfStatus === "" ||
      payment.type_of_status === selectTypeOfStatus;

    const matchesStatus =
      selectStatus === "" || payment.type_of_status === selectStatus;

    const matchesAccountPlan =
      selectAccountPlan === "" ||
      payment.account_plan.name === selectAccountPlan;

    const matchesGroup =
      selectGroup === "" || payment.group.name === selectGroup;

    const matchesAccount =
      selectAccount === "" || payment.account.name === selectAccount;

    const matchesProject =
      selectProject === "" || payment.project.name === selectProject;

    const matchesExpenseType =
      selectExpenseType === "" || payment.expense_type === selectExpenseType;

    return (
      matchesDateDocument &&
      matchesDateDeadline &&
      matchesDatePayment &&
      matchesDescription &&
      matchesBank &&
      matchesSupplier &&
      matchesCompany &&
      matchesTypeOfStatus &&
      matchesStatus &&
      matchesAccountPlan &&
      matchesGroup &&
      matchesAccount &&
      matchesProject &&
      matchesExpenseType
    );
  });

  // Seleção dos pagamentos via checkbox
  function handleProductSelection(
    paymentDocumentNumber: string,
    checked: string | boolean,
  ) {
    if (checked) {
      setSelectedPayments((prevSelected) => [
        ...prevSelected,
        paymentDocumentNumber,
      ]);
    } else {
      setSelectedPayments((prevSelected) =>
        prevSelected.filter((code) => code !== paymentDocumentNumber),
      );
    }
  }

  // Selecionar todos pagamentos filtrados
  function handleSelectAll() {
    const allFilteredProductCodes = filteredPayments.map(
      (payment) => payment.document_number,
    );
    setSelectedPayments(allFilteredProductCodes);
  }

  // Deselecionar tudo
  function handleDeselectAll() {
    setSelectedPayments([]);
  }

  function calculateTotalValue() {
    const selectedPaymentObjects = filteredPayments.filter((payment) =>
      selectedPayments.includes(payment.document_number),
    );

    const totalValue = selectedPaymentObjects.reduce(
      (total, payment) => total + payment.value_payed,
      0,
    );

    return totalValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function capitalizeFirstLetter(str: string): string {
    return str
      .toLowerCase()
      .replace(/\s+/g, "") // Remove espaços em branco
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza a primeira letra
  }

  type Product = {
    name: string;
  };

  function paymentDescription(
    nota_fiscal: string,
    valor: number,
    produtos: Product[],
  ): string {
    const productsString = produtos
      .map((product) => capitalizeFirstLetter(product.name))
      .join(", ");

    return `NF:${nota_fiscal}-VG:${valor
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
      .replace(/\s/g, "")}-[${productsString}]`;
  }

  function printSelectedPaymentsData() {
    const paymentsToPrint = payments.filter((payment) =>
      selectedPayments.includes(payment.document_number),
    );

    const stockWarningsData = {
      report_date: new Date()?.toISOString(),
      products: paymentsToPrint.map((payment) => ({
        document_number: payment.document_number,
        company: payment.company,
        date_document: payment.date_document,
        document: payment.document,
        account_plan: payment.account_plan,
        project: payment.project,
        account: payment.account,
        expense_type: payment.expense_type,
        recurrence: payment.recurrence,
        supplier: payment.supplier,
        // Descrição -> padrão com nº da nota, valor global e nomes dos produtos
        bank: payment.bank,
        value: payment.value,
        installment: payment.installment, // Parcela (Pode ser 'única' ou o numero da parcela incluindo a data ou não)
        value_payed: payment.value_payed,
        date_deadline: payment.date_deadline,
        date_payment: payment.date_payment,
        type_of_status: payment.type_of_status,
        // Lista -> é a abreviação do AccountPlan
        group: payment.group,
        products: payment.products,
      })),
    };

    console.log(JSON.stringify(stockWarningsData, null, 2));

    // Exemplo de exportação do pedido como JSON (feito com gpt, verificar se ta tudo certo)
    // const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    //   JSON.stringify(stockWarningsData),
    // )}`;
    // const link = document.createElement("a");
    // link.href = jsonString;
    // link.download = `RelatorioPersonalizado`;
    // link.click();
  }

  return (
    <TableComponent>
      <TableComponent.Title>Histórico de Pagamentos</TableComponent.Title>

      <TableComponent.Subtitle>
        Selecione os dados nos filtros abaixo para exportar uma planilha de
        pagamentos
      </TableComponent.Subtitle>

      {/* Filtros Linha 1 - Data de Vencimento, Data da Nota e Data do Pagamento, Descrição */}
      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Calendar className={className} />
            )}
          />
          <Filter.DatePicker
            date={dateDocument}
            setDate={setDateDocument}
            open={openDateDocument}
            setOpen={setOpenDateDocument}
            placeholder="Data do Documento"
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Calendar className={className} />
            )}
          />
          <Filter.DatePicker
            date={dateDeadline}
            setDate={setDateDeadline}
            open={openDateDeadline}
            setOpen={setOpenDateDeadline}
            placeholder="Data de Vencimento"
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Calendar className={className} />
            )}
          />
          <Filter.DatePicker
            date={datePayment}
            setDate={setDatePayment}
            open={openDatePayment}
            setOpen={setOpenDatePayment}
            placeholder="Data de Pagamento"
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Descrição"
            state={inputDescription}
            setState={setInputDescription}
          />
        </Filter>
      </TableComponent.FiltersLine>

      {/* Filtros Linha 2 - Banco, Fornecedor, Empresa, Tipo de Status, Status */}
      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Landmark className={className} />
            )}
          />
          <Filter.Select
            placeholder="Banco"
            state={selectBank}
            setState={setSelectBank}
          >
            {banks.map((bank, index) => (
              <Filter.SelectItems
                value={bank.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Truck className={className} />
            )}
          />
          <Filter.Select
            placeholder="Fornecedor"
            state={selectSupplier}
            setState={setSelectSupplier}
          >
            {suppliers.map((supplier, index) => (
              <Filter.SelectItems
                value={supplier.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Building2 className={className} />
            )}
          />
          <Filter.Select
            placeholder="Empresa"
            state={selectCompany}
            setState={setSelectCompany}
          >
            {companies.map((company, index) => (
              <Filter.SelectItems
                value={company.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Clock className={className} />
            )}
          />
          <Filter.Select
            placeholder="Tipo de Status"
            state={selectTypeOfStatus}
            setState={setSelectTypeOfStatus}
          >
            <Filter.SelectItems value="Pago"></Filter.SelectItems>
            <Filter.SelectItems value="Em Aberto"></Filter.SelectItems>
            <Filter.SelectItems value="Cancelado"></Filter.SelectItems>
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Clock className={className} />
            )}
          />
          <Filter.Select
            placeholder="Status"
            state={selectStatus}
            setState={setSelectStatus}
          >
            <Filter.SelectItems value="Em Dia"></Filter.SelectItems>
            <Filter.SelectItems value="Atrasado"></Filter.SelectItems>
          </Filter.Select>
        </Filter>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setDateDocument(undefined);
                  setDateDeadline(undefined);
                  setDatePayment(undefined);
                  setInputDescription("");
                  setSelectBank("");
                  setSelectSupplier("");
                  setSelectCompany("");
                  setSelectTypeOfStatus("");
                  setSelectStatus("");
                  setSelectAccountPlan("");
                  setSelectGroup("");
                  setSelectAccount("");
                  setSelectProject("");
                  setSelectExpenseType("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      {/* Filtros Linha 3 - Plano de conta, Grupo, Conta, Projeto, Tipo de Despesa */}
      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Plano de Contas"
            state={selectAccountPlan}
            setState={setSelectAccountPlan}
          >
            {account_plans.map((account_plan, index) => (
              <Filter.SelectItems
                value={account_plan.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Grupo"
            state={selectGroup}
            setState={setSelectGroup}
          >
            {groups.map((group, index) => (
              <Filter.SelectItems
                value={group.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Conta"
            state={selectAccount}
            setState={setSelectAccount}
          >
            {groups.map(
              (
                group,
                index, // Montar esse select, dados estão na parte Plano de Contas Geral do arquivo Planilha de Contas 1
              ) => (
                <Filter.SelectItems
                  value={group.name}
                  key={index}
                ></Filter.SelectItems>
              ),
            )}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Projeto"
            state={selectProject}
            setState={setSelectProject}
          >
            {projects.map((project, index) => (
              <Filter.SelectItems
                value={project.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Tipo de Despesa"
            state={selectExpenseType}
            setState={setSelectExpenseType}
          >
            <Filter.SelectItems value="Despesa Fixa"></Filter.SelectItems>
            <Filter.SelectItems value="Despesa Variável"></Filter.SelectItems>
            <Filter.SelectItems value="Receita"></Filter.SelectItems>
          </Filter.Select>
        </Filter>
      </TableComponent.FiltersLine>

      {/* Botões de selecionar todos e remover todos */}
      <div className="mt-2 flex items-center gap-3">
        <Button
          className="flex h-fit items-center gap-2 rounded-[8px] bg-cinza_destaque py-1.5 pl-3 pr-4 text-[14px] text-black hover:bg-hover_cinza_destaque_escuro"
          onClick={handleSelectAll}
        >
          <Check size={18} className="flex items-center" />
          Selecionar Todos
        </Button>
        <Button
          className="flex h-fit items-center gap-2 rounded-[8px] bg-cinza_destaque py-1.5 pl-3 pr-4 text-[14px] text-black hover:bg-hover_cinza_destaque_escuro"
          onClick={handleDeselectAll}
        >
          <X size={18} className="flex items-center" />
          Remover Seleção
        </Button>
        <div className="mx-2">
          <span className="font-medium">Pagamento Selecionados:</span>{" "}
          {selectedPayments.length}
        </div>
        <div>
          <span className="font-medium">Valor Total:</span>{" "}
          {calculateTotalValue()}
        </div>
      </div>

      <TableComponent.Table className="mt-1">
        <TableComponent.LineTitle className="grid-cols-[85px_1fr_170px_120px_120px_0.6fr_130px] gap-4 md:gap-8">
          <TableComponent.ValueTitle className="text-center">
            Exportar
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Descrição</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Status
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Data do Documento
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Data de Vencimento
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>

          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {filteredPayments.map((payment, index) => (
          <TableComponent.Line
            className={`grid-cols-[85px_1fr_170px_120px_120px_0.6fr_130px] gap-4 md:gap-8 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value className="text-center">
              <Checkbox
                checked={selectedPayments.includes(payment.document_number)}
                onCheckedChange={(checked) =>
                  handleProductSelection(payment.document_number, checked)
                }
              />
            </TableComponent.Value>
            <TableComponent.Value className="tracking-tight">
              {paymentDescription(
                parseInt(
                  payment.document_number.replace(/\./g, ""),
                  10,
                ).toString(),
                payment.value,
                payment.products,
              )}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              <span
                className={`${
                  payment.type_of_status === "Pago"
                    ? "text-verde_botao"
                    : payment.type_of_status === "Em Aberto"
                      ? "text-amarelo_botao"
                      : payment.type_of_status === "Cancelado"
                        ? "text-vermelho_botao_2"
                        : ""
                }`}
              >
                {payment.type_of_status}
              </span>
              {" - "}
              <span
                className={`${
                  payment.date_payment &&
                  payment.date_payment <= payment.date_deadline
                    ? "text-verde_botao"
                    : "text-vermelho_botao_2"
                }`}
              >
                {payment.date_payment &&
                payment.date_payment <= payment.date_deadline
                  ? "Em Dia"
                  : "Atrasado"}
              </span>
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {`${payment.date_document.getDate()}/${payment.date_document.getMonth()}/${payment.date_document.getFullYear()}`}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">{`${payment.date_deadline.getDate()}/${payment.date_deadline.getMonth()}/${payment.date_deadline.getFullYear()}`}</TableComponent.Value>
            <TableComponent.Value>{payment.company.name}</TableComponent.Value>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent
                aria-describedby={undefined}
                className="max-h-[90vh] overflow-y-auto sm:max-w-4xl"
              >
                <DialogHeader>
                  <DialogTitle className="pb-1.5">
                    Informações do Pagamento:
                  </DialogTitle>

                  <PaymentDetails payment={payment} />

                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>

      <TableButtonComponent className="flex w-fit flex-col justify-end pt-2 sm:pt-4 md:flex-row lg:w-full">
        <TableButtonComponent.Button
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1 max-[425px]:w-full"
          icon={
            <Download
              className="flex h-full cursor-pointer self-center"
              size={20}
              strokeWidth={2.2}
              color="white"
            />
          }
          handlePress={printSelectedPaymentsData}
        >
          Exportar Dados em CSV
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </TableComponent>
  );
}
