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
import * as XLSX from "xlsx";
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
import { api } from "~/trpc/react";
import PaymentDetails from "./_components/editPayment/paymentDetails";
import PaymentCompleteDetails from "./_components/paymentCompleteDetails";

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
  const [selectDocumentType, setSelectDocumentType] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [selectExpenseType, setSelectExpenseType] = useState("");

  // Dados do BD
  const { data: invoices = [] } = api.invoice.getAll.useQuery({});
  const { data: companies = [] } = api.company.getAllCompanies.useQuery();
  const { data: suppliers = [] } = api.supplier.getAll.useQuery();
  const { data: banks = [] } = api.generalParameters.bank.getAll.useQuery();
  const { data: groups = [] } = api.generalParameters.group.getAll.useQuery();
  const { data: projects = [] } =
    api.generalParameters.project.getAll.useQuery();
  const { data: documentTypes = [] } =
    api.generalParameters.documentType.getAll.useQuery();
  const { data: accountPlans = [] } =
    api.generalParameters.accountPlan.getAll.useQuery();

  console.log(invoices);

  // Filtragem dos pagamentos
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesConfirmedStatus = invoice.confirmedStatus != "Rejeitada";

    const matchesDateDocument =
      !dateDocument ||
      (invoice.documentDate.getDate() === dateDocument.getDate() &&
        invoice.documentDate.getMonth() === dateDocument.getMonth() + 1 &&
        invoice.documentDate.getFullYear() === dateDocument.getFullYear());

    const matchesDateDeadline =
      !dateDeadline ||
      (invoice.deadlineDate.getDate() === dateDeadline.getDate() &&
        invoice.deadlineDate.getMonth() === dateDeadline.getMonth() + 1 &&
        invoice.deadlineDate.getFullYear() === dateDeadline.getFullYear());

    const matchesDatePayment =
      !datePayment ||
      (invoice.paymentDate &&
        invoice.paymentDate.getDate() === datePayment.getDate() &&
        invoice.paymentDate.getMonth() === datePayment.getMonth() + 1 &&
        invoice.paymentDate.getFullYear() === datePayment.getFullYear());

    const matchesDescription =
      inputDescription === "" ||
      invoice.documentNumber.includes(inputDescription) ||
      invoice.invoiceValue.toString().includes(inputDescription) ||
      invoice.invoiceProducts.some((invoiceProduct) =>
        invoiceProduct.name.includes(inputDescription),
      );

    const matchesBank = selectBank === "" || invoice.bank?.name === selectBank;

    const matchesSupplier =
      selectSupplier === "" || invoice.supplier.name === selectSupplier;

    const matchesCompany =
      selectCompany === "" || invoice.company.name === selectCompany;

    const matchesTypeOfStatus =
      selectTypeOfStatus === "" || invoice.payedStatus === selectTypeOfStatus;

    const invoiceStatus =
      invoice.deadlineDate && new Date() <= invoice.deadlineDate
        ? "Em Dia"
        : "Atrasado";

    const matchesStatus = selectStatus === "" || invoiceStatus === selectStatus;

    const matchesAccountPlan =
      selectAccountPlan === "" ||
      invoice.accountPlan?.name === selectAccountPlan;

    const matchesGroup =
      selectGroup === "" || invoice.group?.name === selectGroup;

    const matchesProject =
      selectProject === "" || invoice.project?.name === selectProject;

    const matchesExpenseType =
      selectExpenseType === "" || invoice.expenseType === selectExpenseType;

    const matchesDocumentType =
      selectDocumentType === "" ||
      invoice.documentType?.name === selectDocumentType;

    return (
      matchesConfirmedStatus &&
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
      matchesProject &&
      matchesExpenseType &&
      matchesDocumentType
    );
  });

  // Seleção dos pagamentos via checkbox
  function handlePaymentSelection(
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

  function handleSelectAll() {
    const allFilteredPayments = filteredInvoices.map(
      (payment) => payment.documentNumber,
    );

    setSelectedPayments((prevSelectedPayments) => [
      ...new Set([...prevSelectedPayments, ...allFilteredPayments]),
    ]);
  }

  // Deselecionar tudo
  function handleDeselectAll() {
    setSelectedPayments([]);
  }

  function calculateTotalValue() {
    const selectedPaymentObjects = filteredInvoices.filter((payment) =>
      selectedPayments.includes(payment.documentNumber),
    );

    const totalValue = selectedPaymentObjects.reduce(
      (total, payment) =>
        total + (payment.invoiceValue ? payment.invoiceValue : 0),
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

  function paymentDescription(
    nota_fiscal: string,
    valor: number,
    produtos: { name: string }[],
  ): string {
    const productsString = produtos
      .map((product) => capitalizeFirstLetter(product.name))
      .join(",");

    return `NF:${nota_fiscal}-VG:${valor
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
      .replace(/\s/g, "")}-[${productsString}]`;
  }

  interface PaymentReportData {
    date: string;
    invoices: {
      documentNumber: string;
      documentDate: Date;
      companyName: string;
      supplierName: string;
      expenseType: string | null;
      recurrence: string | null;
      installment: string;
      deadlineDate: Date;
      confirmedStatus: string;
      groupName: string | null;
      documentTypeName: string | null;
      accountPlanName: string | null;
      accountName: string | null;
      projectName: string | null;
      bankName: string | null;
      invoiceValue: number;
      payedValue: number | null;
      paymentDate: Date | null;
      payedStatus: string;
      invoiceProductNames: string[];
    }[];
  }

  function exportSelectedProductData(fileType: string) {
    const paymentsToPrint = invoices.filter((payment) =>
      selectedPayments.includes(payment.documentNumber),
    );

    const paymentReportData = {
      date: new Date()?.toISOString(),
      invoices: paymentsToPrint.map((payment) => ({
        documentNumber: payment.documentNumber,
        documentDate: payment.documentDate,
        companyName: payment.company.name,
        supplierName: payment.supplier.name,
        expenseType: payment.expenseType,
        recurrence: payment.recurrence,
        installment: payment.installment,
        deadlineDate: payment.deadlineDate,
        confirmedStatus: payment.confirmedStatus,
        groupName: payment.group?.name ?? "Não informado",
        documentTypeName: payment.documentType?.name ?? "Não informado",
        accountPlanName: payment.accountPlan?.name ?? "Não informado",
        accountName: payment.account?.name ?? "Não informado",
        projectName: payment.project?.name ?? "Não informado",
        bankName: payment.bank?.name ?? "Não informado",
        invoiceValue: payment.invoiceValue,
        payedValue: payment.payedValue ?? 0,
        paymentDate: payment.paymentDate ?? null,
        payedStatus: payment.payedStatus ?? "Não informado",
        invoiceProductNames: payment.invoiceProducts.map(
          (invoiceProduct) => invoiceProduct.name,
        ),
      })),
    };

    switch (fileType) {
      case "csv":
        exportToCSV(paymentReportData);
        break;

      case "json":
        exportToJson(paymentReportData);
        break;

      default:
        break;
    }
  }

  function exportToJson(paymentReportData: PaymentReportData) {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(paymentReportData),
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `Relatorio_Pagamentos_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
  }

  function exportToCSV(paymentReportData: PaymentReportData) {
    const headers = [
      "Nº do Documento",
      "Empresa",
      "Fornecedor",
      "Data do Documento",
      "Data de Vencimento",
      "Produtos",
      "Parcela",
      "Valor",
      "Valor Pago",
      "Data de Pagamento",
      "Banco",
      "Status",
      "Tipo de Despesa",
      "Recorrência",
      "Tipo de Documento",
      "Plano de Contas",
      "Conta",
      "Projeto",
      "Grupo",
    ];

    const worksheetData: (string | number)[][] = [
      headers,
      ...paymentReportData.invoices.map((payment) => [
        payment.documentNumber,
        payment.companyName,
        payment.supplierName,
        new Date(payment.documentDate).toLocaleDateString(),
        new Date(payment.deadlineDate).toLocaleDateString(),
        payment.invoiceProductNames.join(", "),
        payment.installment,
        payment.invoiceValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        payment.payedValue
          ? payment.payedValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "Em Aberto",
        payment.paymentDate
          ? new Date(payment.paymentDate).toLocaleDateString()
          : "Em Aberto",
        payment.bankName ?? "Em Aberto",
        payment.payedStatus,
        payment.expenseType ?? "Não informado",
        payment.recurrence ?? "Não informado",
        payment.documentTypeName ?? "Não informado",
        payment.accountPlanName ?? "Não informado",
        payment.accountName != undefined && payment.accountName != ""
          ? payment.accountName
          : "Não informado",
        payment.projectName ?? "Não informado",
        payment.groupName ?? "Não informado",
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Relatório de Pagamentos",
    );
    XLSX.writeFile(
      workbook,
      `Relatorio_Pagamentos_${new Date().toISOString().slice(0, 10)}.xlsx`,
    );
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
                  setSelectProject("");
                  setSelectExpenseType("");
                  setSelectDocumentType("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      {/* Filtros Linha 3 - Plano de conta, Grupo, Projeto, Tipo de Despesa, Tipo de Documento */}
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
            {accountPlans.map((account_plan, index) => (
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

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Tipo de Documento"
            state={selectDocumentType}
            setState={setSelectDocumentType}
          >
            {documentTypes.map((documentType, index) => (
              <Filter.SelectItems
                value={documentType.name}
                key={index}
              ></Filter.SelectItems>
            ))}
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
          <span className="font-medium">Pagamentos Selecionados:</span>{" "}
          {selectedPayments.length}
        </div>
        <div>
          <span className="font-medium">Valor Total das NFs:</span>{" "}
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

        {filteredInvoices
          .sort((a, b) => a.documentDate.getTime() - b.documentDate.getTime())
          .map((invoice, index) => (
            <TableComponent.Line
              className={`grid-cols-[85px_1fr_170px_120px_120px_0.6fr_130px] gap-4 md:gap-8 ${
                index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
              }`}
              key={index}
            >
              <TableComponent.Value className="text-center">
                <Checkbox
                  checked={selectedPayments.includes(invoice.documentNumber)}
                  onCheckedChange={(checked) =>
                    handlePaymentSelection(invoice.documentNumber, checked)
                  }
                />
              </TableComponent.Value>
              <TableComponent.Value className="tracking-tight">
                {paymentDescription(
                  parseInt(
                    invoice.documentNumber.replace(/\./g, ""),
                    10,
                  ).toString(),
                  invoice.invoiceValue,
                  invoice.invoiceProducts,
                )}
              </TableComponent.Value>
              <TableComponent.Value className="text-center">
                <span
                  className={`${
                    invoice.payedStatus === "Pago"
                      ? "text-verde_botao"
                      : invoice.payedStatus === "Em Aberto"
                        ? "text-amarelo_botao"
                        : invoice.payedStatus === "Cancelado"
                          ? "text-vermelho_botao_2"
                          : ""
                  }`}
                >
                  {invoice.payedStatus}
                </span>
                {" - "}
                <span
                  className={`${
                    invoice.paymentDate &&
                    invoice.paymentDate <= invoice.deadlineDate
                      ? "text-verde_botao"
                      : "text-vermelho_botao_2"
                  }`}
                >
                  {invoice.deadlineDate && new Date() <= invoice.deadlineDate
                    ? "Em Dia"
                    : "Atrasado"}
                </span>
              </TableComponent.Value>
              <TableComponent.Value className="text-center">
                {`${String(invoice.documentDate.getDate()).padStart(2, "0")}/${String(invoice.documentDate.getMonth()).padStart(2, "0")}/${String(invoice.documentDate.getFullYear()).padStart(2, "0")}`}
              </TableComponent.Value>
              <TableComponent.Value className="text-center">{`${String(invoice.deadlineDate.getDate()).padStart(2, "0")}/${String(invoice.deadlineDate.getMonth()).padStart(2, "0")}/${String(invoice.deadlineDate.getFullYear()).padStart(2, "0")}`}</TableComponent.Value>
              <TableComponent.Value>
                {invoice.company.name}
              </TableComponent.Value>

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
                    <DialogDescription></DialogDescription>

                    {invoice.payedStatus === "Em Aberto" ? (
                      <PaymentDetails invoice={invoice} />
                    ) : (
                      <PaymentCompleteDetails invoice={invoice} />
                    )}
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
          handlePress={() => exportSelectedProductData("csv")}
        >
          Exportar Dados em CSV
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </TableComponent>
  );
}
