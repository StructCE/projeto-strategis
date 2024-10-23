"use client";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
import PaymentDetails from "./_components/editPayment/paymentDetails";
import PaymentCompleteDetails from "./_components/paymentCompleteDetails";
import {
  account_plans,
  banks,
  groups,
  type Payment,
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

    const matchesBank = selectBank === "" || payment.bank?.name === selectBank;

    const matchesSupplier =
      selectSupplier === "" || payment.supplier.name === selectSupplier;

    const matchesCompany =
      selectCompany === "" || payment.company.name === selectCompany;

    const matchesTypeOfStatus =
      selectTypeOfStatus === "" || payment.payed_status === selectTypeOfStatus;

    const matchesStatus =
      selectStatus === "" || payment.payed_status === selectStatus;

    const matchesAccountPlan =
      selectAccountPlan === "" ||
      payment.account_plan.name === selectAccountPlan;

    const matchesGroup =
      selectGroup === "" || payment.group.name === selectGroup;

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
      matchesProject &&
      matchesExpenseType
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
    const allFilteredPayments = filteredPayments.map(
      (payment) => payment.document_number,
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
    const selectedPaymentObjects = filteredPayments.filter((payment) =>
      selectedPayments.includes(payment.document_number),
    );

    const totalValue = selectedPaymentObjects.reduce(
      (total, payment) =>
        total + (payment.value_payed ? payment.value_payed : 0),
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
      .join(", ");

    return `NF:${nota_fiscal}-VG:${valor
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
      .replace(/\s/g, "")}-[${productsString}]`;
  }

  interface PaymentReportData {
    date: string;
    payments: Payment[];
  }

  function exportSelectedProductData(fileType: string) {
    const paymentsToPrint = payments.filter((payment) =>
      selectedPayments.includes(payment.document_number),
    );

    const paymentReportData = {
      date: new Date()?.toISOString(),
      payments: paymentsToPrint.map((payment) => ({
        document_number: payment.document_number,
        company: payment.company,
        date_document: payment.date_document,
        document: payment.document,
        account_plan: payment.account_plan,
        project: payment.project,
        expense_type: payment.expense_type,
        recurrence: payment.recurrence,
        supplier: payment.supplier,
        bank: payment.bank,
        value: payment.value,
        installment: payment.installment,
        value_payed: payment.value_payed,
        date_deadline: payment.date_deadline,
        date_payment: payment.date_payment,
        confirmed_status: payment.confirmed_status,
        payed_status: payment.payed_status,
        group: payment.group,
        products: payment.products,
      })),
    };

    switch (fileType) {
      case "csv":
        exportToCSV(paymentReportData);
        break;

      case "json":
        exportToJson(paymentReportData);
        break;

      case "pdf":
        exportToPDF(paymentReportData);
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

  function exportToPDF(paymentReportData: PaymentReportData) {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(
      `Relatório de Pagamentos - ${new Date(paymentReportData.date).toLocaleDateString()}`,
      14,
      20,
    );

    doc.setFontSize(12);
    let yPosition = 25;
    const lineHeight = 5.5; // Altura entre as linhas de texto
    const pageHeight = 280; // Limite de altura da página

    function addKeyValuePair(
      key: string,
      value: string | number,
      x1: number,
      x2: number,
      y: number,
    ) {
      doc.setFont("helvetica", "bold");
      doc.text(`${key}:`, x1, y); // Chave
      doc.setFont("helvetica", "normal");

      const splitText: string[] = doc.splitTextToSize(
        `${value}`,
        120,
      ) as string[];
      doc.text(splitText, x2, y);

      return splitText.length * lineHeight;
    }

    paymentReportData.payments.forEach((payment) => {
      const productHeight = 12 * lineHeight + 14;

      if (yPosition + productHeight > pageHeight) {
        doc.addPage();
        yPosition = 14;
      }

      yPosition += addKeyValuePair(
        "Nº do Documento",
        payment.document_number,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Empresa",
        payment.company.name,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Fornecedor",
        payment.supplier.name,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Data do Documento",
        new Date(payment.date_document).toLocaleDateString(),
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Data de Vencimento",
        new Date(payment.date_deadline).toLocaleDateString(),
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Produtos",
        payment.products.map((product) => product.name).join(", "),
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Banco",
        payment.bank?.name ?? "N/A",
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Valor",
        payment.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Parcela",
        payment.installment,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Valor Pago",
        payment.value_payed?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }) ?? "N/A",
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Data de Pagamento",
        new Date(
          payment.date_payment ? payment.date_payment : "",
        ).toLocaleDateString() ?? "N/A",
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Status",
        payment.payed_status,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Tipo de Documento",
        payment.document.name,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Plano de Contas",
        payment.account_plan.name,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Conta",
        payment.account_plan.account.name,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Projeto",
        payment.project.name,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Tipo de Despesa",
        payment.expense_type,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Recorrência",
        payment.recurrence,
        14,
        70,
        (yPosition += lineHeight),
      );
      yPosition += addKeyValuePair(
        "Grupo",
        payment.group.name,
        14,
        70,
        (yPosition += lineHeight),
      );

      yPosition += 10;
    });

    doc.save(`Avisos_Estoque_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  function exportToCSV(paymentReportData: PaymentReportData) {
    const headers = [
      "Nº do Documento",
      "Empresa",
      "Fornecedor",
      "Data do Documento",
      "Data de Vencimento",
      "Produtos",
      "Banco",
      "Valor",
      "Parcela",
      "Valor Pago",
      "Data de Pagamento",
      "Status",
      "Tipo de Documento",
      "Plano de Contas",
      "Conta",
      "Projeto",
      "Tipo de Despesa",
      "Recorrência",
      "Grupo",
    ];

    const worksheetData = [
      headers,
      ...paymentReportData.payments.map((payment: Payment) => [
        payment.document_number,
        payment.company.name,
        payment.supplier.name,
        new Date(payment.date_document).toLocaleDateString(),
        new Date(payment.date_deadline).toLocaleDateString(),
        payment.products.map((product) => product.name).join(", "),
        payment.bank ? payment.bank.name : "Em Aberto",
        payment.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        payment.installment,
        payment.value_payed
          ? payment.value_payed.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "Em Aberto",
        payment.date_payment
          ? new Date(
              payment.date_payment ? payment.date_payment : "",
            ).toLocaleDateString()
          : "Em Aberto",
        payment.payed_status,
        payment.document.name,
        payment.account_plan.name,
        payment.account_plan.account.name,
        payment.project.name,
        payment.expense_type,
        payment.recurrence,
        payment.group.name,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Avisos de Estoque");
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

        {filteredPayments
          .sort((a, b) => a.date_document.getTime() - b.date_document.getTime())
          .map((payment, index) => (
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
                    handlePaymentSelection(payment.document_number, checked)
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
                    payment.payed_status === "Pago"
                      ? "text-verde_botao"
                      : payment.payed_status === "Em Aberto"
                        ? "text-amarelo_botao"
                        : payment.payed_status === "Cancelado"
                          ? "text-vermelho_botao_2"
                          : ""
                  }`}
                >
                  {payment.payed_status}
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
                {`${String(payment.date_document.getDate()).padStart(2, "0")}/${String(payment.date_document.getMonth()).padStart(2, "0")}/${String(payment.date_document.getFullYear()).padStart(2, "0")}`}
              </TableComponent.Value>
              <TableComponent.Value className="text-center">{`${String(payment.date_deadline.getDate()).padStart(2, "0")}/${String(payment.date_deadline.getMonth()).padStart(2, "0")}/${String(payment.date_deadline.getFullYear()).padStart(2, "0")}`}</TableComponent.Value>
              <TableComponent.Value>
                {payment.company.name}
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

                    {payment.payed_status === "Pago" ? (
                      <PaymentCompleteDetails payment={payment} />
                    ) : (
                      <PaymentDetails payment={payment} />
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
