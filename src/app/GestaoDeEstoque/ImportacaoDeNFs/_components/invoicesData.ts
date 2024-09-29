import {
  type ProductCategory,
  type SectorOfUse,
  type TypeOfControl,
  type Unit,
} from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  type Address,
  type Supplier,
} from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";

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

export type Product = {
  name: string;
  ncm: number;
  cfop: number;
  code: string;
  status: string;
  buy_unit: Unit;
  buy_quantity: number;
  value_unit: number;
  type_of_control: TypeOfControl;
  product_category: ProductCategory;
  sector_of_use: SectorOfUse;
  address: Address;
};

export type Invoice = {
  document_number: string;
  company: Company;
  date_document: Date;
  document: DocumentType | undefined;
  account_plan: AccountPlan | undefined;
  project: Project | undefined;
  account: Account | undefined;
  expense_type: "Despesa Fixa" | "Despesa Variável" | "Receita" | undefined;
  recurrence: "Recorrente" | "Avulsa" | "Parcelas" | undefined;
  supplier: Supplier;
  // Descrição -> padrão com nº da nota, valor global e nomes dos produtos
  bank: Bank | undefined;
  installment: string; // Parcela (Pode ser 'única' ou o numero da parcela incluindo a data ou não)
  value_payed: number | undefined;
  date_deadline: Date;
  date_payment: Date | undefined;
  confirmed_status: "Pendente" | "Confirmada" | "Rejeitada";
  payed_status: "Pago" | "Em Aberto" | "Cancelado";
  // Lista -> é a abreviação do AccountPlan
  group: Group | undefined;
  products: Product[];
};

export const invoices: Invoice[] = [
  {
    document_number: "000120568",
    company: { name: "FusionWare" },
    date_document: new Date("2024-09-01"),
    document: undefined,
    account_plan: undefined,
    project: undefined,
    account: undefined,
    expense_type: undefined,
    recurrence: undefined,
    supplier: { name: "Fornecedor A" },
    bank: undefined,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date("2024-09-10"),
    date_payment: undefined,
    confirmed_status: "Pendente",
    payed_status: "Em Aberto",
    group: undefined,
    products: [
      {
        name: "Cerveja Pilsen",
        ncm: 7031020,
        cfop: 5102,
        code: "1001",
        status: "Ativo",
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        buy_quantity: 36,
        value_unit: 2.49,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Cervejas" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Bar",
          storage: "Armário 1",
          shelf: "Prateleira 1",
        },
      },
      {
        name: "Vinho Tinto",
        ncm: 7049020,
        cfop: 5104,
        code: "1005",
        status: "Ativo",
        buy_unit: {
          description: "Fardo",
          abbreviation: "FRD",
          unitsPerPack: 10,
        },
        buy_quantity: 10,
        value_unit: 34.9,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Vinho" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Padaria",
          storage: "Zona 3",
          shelf: "Prateleira 10",
        },
      },
      {
        name: "Vodka Orloff",
        ncm: 7070000,
        cfop: 5103,
        code: "1007",
        status: "Ativo",
        buy_unit: {
          description: "Unidade",
          abbreviation: "UN",
          unitsPerPack: 1,
        },
        buy_quantity: 2,
        value_unit: 39.9,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Destilados" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Bar",
          storage: "Armário 1",
          shelf: "Prateleira 2",
        },
      },
    ],
  },
  {
    document_number: "000124798",
    company: { name: "Apex Innovations Filial" },
    date_document: new Date("2024-09-02"),
    document: undefined,
    account_plan: undefined,
    project: undefined,
    account: undefined,
    expense_type: undefined,
    recurrence: undefined,
    supplier: { name: "Fornecedor B" },
    bank: undefined,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date("2024-09-10"),
    date_payment: undefined,
    confirmed_status: "Pendente",
    payed_status: "Em Aberto",
    group: undefined,
    products: [
      {
        name: "Vinho Tinto",
        ncm: 7049020,
        cfop: 5104,
        code: "1005",
        status: "Ativo",
        buy_unit: {
          description: "Fardo",
          abbreviation: "FRD",
          unitsPerPack: 10,
        },
        buy_quantity: 10,
        value_unit: 34.9,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Vinho" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Padaria",
          storage: "Zona 3",
          shelf: "Prateleira 10",
        },
      },
      {
        name: "Vodka Orloff",
        ncm: 7070000,
        cfop: 5103,
        code: "1007",
        status: "Ativo",
        buy_unit: {
          description: "Unidade",
          abbreviation: "UN",
          unitsPerPack: 1,
        },
        buy_quantity: 2,
        value_unit: 39.9,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Destilados" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Bar",
          storage: "Armário 1",
          shelf: "Prateleira 2",
        },
      },
    ],
  },
  {
    document_number: "000892359",
    company: { name: "Apex Innovations Matriz" },
    date_document: new Date("2024-08-31"),
    document: undefined,
    account_plan: undefined,
    project: undefined,
    account: undefined,
    expense_type: undefined,
    recurrence: undefined,
    supplier: { name: "Fornecedor C" },
    bank: undefined,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date("2024-09-11"),
    date_payment: undefined,
    confirmed_status: "Pendente",
    payed_status: "Em Aberto",
    group: undefined,
    products: [
      {
        name: "Cerveja Pilsen",
        ncm: 7031020,
        cfop: 5102,
        code: "1001",
        status: "Ativo",
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        buy_quantity: 72,
        value_unit: 2.49,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Cervejas" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Bar",
          storage: "Armário 1",
          shelf: "Prateleira 1",
        },
      },
    ],
  },
  {
    document_number: "000691459",
    company: { name: "Quantum Dynamics" },
    date_document: new Date("2024-09-05"),
    document: undefined,
    account_plan: undefined,
    project: undefined,
    account: undefined,
    expense_type: undefined,
    recurrence: undefined,
    supplier: { name: "Fornecedor C" },
    bank: undefined,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date("2024-09-15"),
    date_payment: undefined,
    confirmed_status: "Confirmada",
    payed_status: "Em Aberto",
    group: undefined,
    products: [
      {
        name: "Cerveja Pilsen",
        ncm: 7031020,
        cfop: 5102,
        code: "1001",
        status: "Ativo",
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        buy_quantity: 36,
        value_unit: 2.49,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Cervejas" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Bar",
          storage: "Armário 1",
          shelf: "Prateleira 1",
        },
      },
      {
        name: "Vinho Tinto",
        ncm: 7049020,
        cfop: 5104,
        code: "1005",
        status: "Ativo",
        buy_unit: {
          description: "Fardo",
          abbreviation: "FRD",
          unitsPerPack: 10,
        },
        buy_quantity: 10,
        value_unit: 34.9,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Vinho" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Padaria",
          storage: "Zona 3",
          shelf: "Prateleira 10",
        },
      },
      {
        name: "Vodka Orloff",
        ncm: 7070000,
        cfop: 5103,
        code: "1007",
        status: "Ativo",
        buy_unit: {
          description: "Unidade",
          abbreviation: "UN",
          unitsPerPack: 1,
        },
        buy_quantity: 2,
        value_unit: 39.9,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Destilados" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Bar",
          storage: "Armário 1",
          shelf: "Prateleira 2",
        },
      },
    ],
  },
  {
    document_number: "000543731",
    company: { name: "TechNova Filial" },
    date_document: new Date("2024-09-05"),
    document: undefined,
    account_plan: undefined,
    project: undefined,
    account: undefined,
    expense_type: undefined,
    recurrence: undefined,
    supplier: { name: "Fornecedor C" },
    bank: undefined,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date("2024-09-15"),
    date_payment: undefined,
    confirmed_status: "Rejeitada",
    payed_status: "Em Aberto",
    group: undefined,
    products: [
      {
        name: "Cerveja Pilsen",
        ncm: 7031020,
        cfop: 5102,
        code: "1001",
        status: "Ativo",
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        buy_quantity: 36,
        value_unit: 2.49,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Cervejas" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Bar",
          storage: "Armário 1",
          shelf: "Prateleira 1",
        },
      },
      {
        name: "Vinho Tinto",
        ncm: 7049020,
        cfop: 5104,
        code: "1005",
        status: "Ativo",
        buy_unit: {
          description: "Fardo",
          abbreviation: "FRD",
          unitsPerPack: 10,
        },
        buy_quantity: 10,
        value_unit: 34.9,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Vinho" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Padaria",
          storage: "Zona 3",
          shelf: "Prateleira 10",
        },
      },
      {
        name: "Vodka Orloff",
        ncm: 7070000,
        cfop: 5103,
        code: "1007",
        status: "Ativo",
        buy_unit: {
          description: "Unidade",
          abbreviation: "UN",
          unitsPerPack: 1,
        },
        buy_quantity: 2,
        value_unit: 39.9,
        type_of_control: { description: "Produtos de Bar" },
        product_category: { description: "Bebidas - Destilados" },
        sector_of_use: { description: "Bar" },
        address: {
          stock: "Estoque Bar",
          storage: "Armário 1",
          shelf: "Prateleira 2",
        },
      },
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
