import { type Supplier } from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";

type Company = {
  name: string;
};

export type Bank = {
  name:
    | "Caixa (Escritório)"
    | "Caixa (Suprimento Loja)"
    | "CC GetNet"
    | "CC Ifood"
    | "CC Itaú"
    | "CC ParceleJá"
    | "CC Santander"
    | "CRT Itaú Master"
    | "PagSeguro (Loja)";
};

export type AccountPlan = {
  name:
    | "Despesas com Produção/Serviço"
    | "Despesas com Ocupação"
    | "Despesas com Terceiros"
    | "Despesas com Pessoal"
    | "Deduções sobre Vendas"
    | "Impostos Diretos"
    | "Despesas Comerciais/Vendas"
    | "Despesas Administrativas Outras"
    | "Despesas com Tecnologia"
    | "Despesas Financeiras"
    | "Investimentos e Retiradas"
    | "Receitas de Vendas (Loja)"
    | "Receitas de Vendas (Delivery)"
    | "Receitas de Vendas (Eventos)"
    | "Receitas de Reembolsos"
    | "Receitas Diversas"
    | "Receitas Financeiras";
  abbreviation:
    | "DPS"
    | "DOC"
    | "DTC"
    | "DPE"
    | "DSV"
    | "DID"
    | "DCV"
    | "DOA"
    | "DFI"
    | "DIR"
    | "RVL"
    | "RVD"
    | "RVE"
    | "RRB"
    | "RDI"
    | "RFI";
};

export type DocumentType = {
  name:
    | "A Classificar"
    | "Boleto"
    | "Cupom Fiscal"
    | "Débito Automático"
    | "Fatura"
    | "Fechamento Caixa"
    | "NF"
    | "Recibo"
    | "Transf/PIX/TED/DOC"
    | "Crédito Automático"
    | "Cartão Crédito"
    | "Cartão Débito"
    | "Sem Comprovante"
    | "Boleto e NF";
};

export type Project = {
  name:
    | "Strategis - Assessoria"
    | "Strategis - BPO Financeiro"
    | "Strategis - Compartilhado"
    | "Strategis - FidelizClub"
    | "Strategis - Geral";
};

export type Account = {
  name: string; // Plano de Contas Geral do arquivo Planilha de Contas 1
};

export type Group = {
  name:
    | "A Categorizar | Diversos Empresa"
    | "Deduções sobre Vendas"
    | "Despesas Comerciais/Vendas"
    | "Despesas com Impostos Diretos"
    | "Despesas com Ocupação"
    | "Despesas com Pessoal"
    | "Despesas com Produção/Serviço"
    | "Despesas com Tecnologia"
    | "Despesas com Terceiros"
    | "Despesas com Transporte"
    | "Despesas Financeiras"
    | "Estornos Diversos"
    | "Excluir (DDA ou Agrupado)"
    | "Investimentos e Retiradas"
    | "Receita de Venads (Delivery)"
    | "Receita de Vendas (Delivery)"
    | "Receita de Vendas (Eventos)"
    | "Receitas de Reembolsos"
    | "Receitas de Vendas (Loja)"
    | "Receitas Diversas"
    | "Receitas Financeiras"
    | "TR transferência entre Contas";
};

type Product = {
  name: string;
};

export type Payment = {
  document_number: string;
  company: Company;
  date_document: Date;
  document: DocumentType;
  account_plan: AccountPlan;
  project: Project;
  account: Account;
  expense_type: "Despesa Fixa" | "Despesa Variável" | "Receita";
  recurrence: "Recorrente" | "Avulsa" | "Parcelas";
  supplier: Supplier;
  // Descrição -> padrão com nº da nota, valor global e nomes dos produtos
  bank: Bank | undefined;
  value: number;
  installment: string; // Parcela (Pode ser 'única' ou o numero da parcela incluindo a data ou não)
  value_payed: number | undefined;
  date_deadline: Date;
  date_payment: Date | undefined;
  confirmed_status: "Pendente" | "Confirmada" | "Rejeitada";
  payed_status: "Pago" | "Em Aberto" | "Cancelado";
  // Lista -> é a abreviação do AccountPlan
  group: Group;
  products: Product[];
};

export const payments: Payment[] = [
  {
    document_number: "000120568",
    company: { name: "FusionWare" },
    date_document: new Date("2024-09-01"),
    document: { name: "Boleto" },
    account_plan: {
      name: "Despesas com Produção/Serviço",
      abbreviation: "DPS",
    },
    project: { name: "Strategis - BPO Financeiro" },
    account: { name: "Plano Produção" },
    expense_type: "Despesa Fixa",
    recurrence: "Recorrente",
    supplier: { name: "Fornecedor A" },
    bank: { name: "CC Itaú" },
    value: 1500,
    installment: "Única",
    value_payed: 1500,
    date_deadline: new Date("2024-09-10"),
    date_payment: new Date("2024-09-09"),
    confirmed_status: "Confirmada",
    payed_status: "Pago",
    group: { name: "Despesas com Produção/Serviço" },
    products: [{ name: "Produto 1" }, { name: "Produto 2" }],
  },
  {
    document_number: "000124798",
    company: { name: "Apex Innovations Filial" },
    date_document: new Date("2024-09-02"),
    document: { name: "Cartão Crédito" },
    account_plan: {
      name: "Despesas Administrativas Outras",
      abbreviation: "DOA",
    },
    project: { name: "Strategis - FidelizClub" },
    account: { name: "Plano Administrativo" },
    expense_type: "Despesa Variável",
    recurrence: "Avulsa",
    supplier: { name: "Fornecedor B" },
    bank: undefined,
    value: 300,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date("2024-09-15"),
    date_payment: undefined,
    confirmed_status: "Confirmada",
    payed_status: "Em Aberto",
    group: { name: "Despesas com Pessoal" },
    products: [{ name: "Produto 1" }, { name: "Produto 2" }],
  },
  {
    document_number: "000892359",
    company: { name: "Apex Innovations Matriz" },
    date_document: new Date("2024-08-31"),
    document: { name: "Transf/PIX/TED/DOC" },
    account_plan: {
      name: "Receitas de Vendas (Delivery)",
      abbreviation: "RVD",
    },
    project: { name: "Strategis - Geral" },
    account: { name: "Receita Delivery" },
    expense_type: "Receita",
    recurrence: "Avulsa",
    supplier: { name: "Fornecedor C" },
    bank: { name: "PagSeguro (Loja)" },
    value: 1200,
    installment: "Única",
    value_payed: 1200,
    date_deadline: new Date("2024-09-05"),
    date_payment: new Date("2024-09-03"),
    confirmed_status: "Confirmada",
    payed_status: "Pago",
    group: { name: "Receitas de Vendas (Loja)" },
    products: [{ name: "Produto 1" }, { name: "Produto 2" }],
  },
  {
    document_number: "000782354",
    company: { name: "Quantum Dynamics" },
    date_document: new Date("2024-09-01"),
    document: { name: "Boleto" },
    account_plan: { name: "Despesas com Pessoal", abbreviation: "DPE" },
    project: { name: "Strategis - Geral" },
    account: { name: "Conta de Pessoal" },
    expense_type: "Despesa Fixa",
    recurrence: "Recorrente",
    supplier: { name: "Fornecedor A" },
    bank: { name: "CC Itaú" },
    value: 3000,
    installment: "Única",
    value_payed: 3000,
    date_deadline: new Date("2024-09-10"),
    date_payment: new Date("2024-09-08"),
    confirmed_status: "Confirmada",
    payed_status: "Pago",
    group: { name: "Despesas com Pessoal" },
    products: [{ name: "Produto 3" }, { name: "Produto 4" }],
  },
  {
    document_number: "000543731",
    company: { name: "TechNova Filial" },
    date_document: new Date("2024-09-05"),
    document: { name: "NF" },
    account_plan: {
      name: "Despesas com Produção/Serviço",
      abbreviation: "DPS",
    },
    project: { name: "Strategis - FidelizClub" },
    account: { name: "Conta de Serviços" },
    expense_type: "Despesa Variável",
    recurrence: "Parcelas",
    supplier: { name: "Fornecedor B" },
    bank: { name: "CC Santander" },
    value: 4500,
    installment: "2/3",
    value_payed: 1500,
    date_deadline: new Date("2024-09-15"),
    date_payment: new Date("2024-09-14"),
    confirmed_status: "Confirmada",
    payed_status: "Pago",
    group: { name: "Despesas com Produção/Serviço" },
    products: [{ name: "Produto 1" }, { name: "Produto 3" }],
  },
  {
    document_number: "000457643",
    company: { name: "TechNova Matriz" },
    date_document: new Date("2024-08-20"),
    document: { name: "Recibo" },
    account_plan: {
      name: "Receitas de Vendas (Delivery)",
      abbreviation: "RVD",
    },
    project: { name: "Strategis - Geral" },
    account: { name: "Conta de Receita Delivery" },
    expense_type: "Receita",
    recurrence: "Avulsa",
    supplier: { name: "Fornecedor C" },
    bank: undefined,
    value: 7500,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date("2024-09-01"),
    date_payment: undefined,
    confirmed_status: "Confirmada",
    payed_status: "Em Aberto",
    group: { name: "Receita de Venads (Delivery)" },
    products: [{ name: "Produto 2" }, { name: "Produto 4" }],
  },
  {
    document_number: "000823612",
    company: { name: "Alimentos WCW" },
    date_document: new Date("2024-09-12"),
    document: { name: "Transf/PIX/TED/DOC" },
    account_plan: { name: "Investimentos e Retiradas", abbreviation: "DIR" },
    project: { name: "Strategis - BPO Financeiro" },
    account: { name: "Conta de Investimentos" },
    expense_type: "Despesa Fixa",
    recurrence: "Recorrente",
    supplier: { name: "Fornecedor D" },
    bank: { name: "CRT Itaú Master" },
    value: 15000,
    installment: "Única",
    value_payed: 15000,
    date_deadline: new Date("2024-09-25"),
    date_payment: new Date("2024-09-24"),
    confirmed_status: "Confirmada",
    payed_status: "Pago",
    group: { name: "Investimentos e Retiradas" },
    products: [
      { name: "Produto 1" },
      { name: "Produto 2" },
      { name: "Produto 5" },
    ],
  },
];

/* Empresas:
  - Alimentos WCW
  - TechNova Matriz
  - TechNova Filial
  - Quantum Dynamics
  - Apex Innovations Matriz
  - Apex Innovations Filial
  - FusionWare
*/

export const banks: Bank[] = [
  { name: "Caixa (Escritório)" },
  { name: "Caixa (Suprimento Loja)" },
  { name: "CC GetNet" },
  { name: "CC Ifood" },
  { name: "CC Itaú" },
  { name: "CC ParceleJá" },
  { name: "CC Santander" },
  { name: "CRT Itaú Master" },
  { name: "PagSeguro (Loja)" },
];

export const account_plans: AccountPlan[] = [
  { name: "Despesas com Produção/Serviço", abbreviation: "DPS" },
  { name: "Despesas com Ocupação", abbreviation: "DOC" },
  { name: "Despesas com Terceiros", abbreviation: "DTC" },
  { name: "Despesas com Pessoal", abbreviation: "DPE" },
  { name: "Deduções sobre Vendas", abbreviation: "DSV" },
  { name: "Impostos Diretos", abbreviation: "DID" },
  { name: "Despesas Comerciais/Vendas", abbreviation: "DCV" },
  { name: "Despesas Administrativas Outras", abbreviation: "DOA" },
  { name: "Despesas com Tecnologia", abbreviation: "DTC" },
  { name: "Despesas Financeiras", abbreviation: "DFI" },
  { name: "Investimentos e Retiradas", abbreviation: "DIR" },
  { name: "Receitas de Vendas (Loja)", abbreviation: "RVL" },
  { name: "Receitas de Vendas (Delivery)", abbreviation: "RVD" },
  { name: "Receitas de Vendas (Eventos)", abbreviation: "RVE" },
  { name: "Receitas de Reembolsos", abbreviation: "RRB" },
  { name: "Receitas Diversas", abbreviation: "RDI" },
  { name: "Receitas Financeiras", abbreviation: "RFI" },
];

export const document_types: DocumentType[] = [
  { name: "A Classificar" },
  { name: "Boleto" },
  { name: "Cupom Fiscal" },
  { name: "Débito Automático" },
  { name: "Fatura" },
  { name: "Fechamento Caixa" },
  { name: "NF" },
  { name: "Recibo" },
  { name: "Transf/PIX/TED/DOC" },
  { name: "Crédito Automático" },
  { name: "Cartão Crédito" },
  { name: "Cartão Débito" },
  { name: "Sem Comprovante" },
  { name: "Boleto e NF" },
];

export const projects: Project[] = [
  { name: "Strategis - Assessoria" },
  { name: "Strategis - BPO Financeiro" },
  { name: "Strategis - Compartilhado" },
  { name: "Strategis - FidelizClub" },
  { name: "Strategis - Geral" },
];

export const groups: Group[] = [
  { name: "A Categorizar | Diversos Empresa" },
  { name: "Deduções sobre Vendas" },
  { name: "Despesas Comerciais/Vendas" },
  { name: "Despesas com Impostos Diretos" },
  { name: "Despesas com Ocupação" },
  { name: "Despesas com Pessoal" },
  { name: "Despesas com Produção/Serviço" },
  { name: "Despesas com Tecnologia" },
  { name: "Despesas com Terceiros" },
  { name: "Despesas com Transporte" },
  { name: "Despesas Financeiras" },
  { name: "Estornos Diversos" },
  { name: "Excluir (DDA ou Agrupado)" },
  { name: "Investimentos e Retiradas" },
  { name: "Receita de Venads (Delivery)" },
  { name: "Receita de Vendas (Delivery)" },
  { name: "Receita de Vendas (Eventos)" },
  { name: "Receitas de Reembolsos" },
  { name: "Receitas de Vendas (Loja)" },
  { name: "Receitas Diversas" },
  { name: "Receitas Financeiras" },
  { name: "TR transferência entre Contas" },
];
