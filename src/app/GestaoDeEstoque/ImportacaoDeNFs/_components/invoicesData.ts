import { type Unit } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  type Address,
  type ProductCategory,
  type SectorOfUse,
  type Supplier,
  type TypeOfControl,
} from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";

export const inputPath = "Documentos/Strategis/Restaurante1/NFs-pendentes";
export const outputPath = "Documentos/Strategis/Restaurante1/NFs-aceitas";

type Company = {
  name: string;
};

export type Bank = {
  name: string;
};

export type Account = {
  name: string;
};

export type AccountPlan = {
  name: string;
  abbreviation: string;
  accounts: Account[];
};

export type DocumentType = {
  name: string;
};

export type Project = {
  name: string;
};

export type Group = {
  name: string;
};

export type Product = {
  name: string;
  code: string;
  ncm: number;
  cfop: number;
  buy_unit: Unit;
  purchase_quantity: number;
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
  expense_type: "Despesa Fixa" | "Despesa Variável" | "Receita" | undefined;
  recurrence: "Recorrente" | "Avulsa" | "Parcelas" | undefined;
  supplier: Supplier;
  bank: Bank | undefined;
  installment: string; // Parcela (Pode ser 'única' ou o numero da parcela incluindo a data ou não)
  value_payed: number | undefined;
  date_deadline: Date;
  date_payment: Date | undefined;
  confirmed_status: "Pendente" | "Confirmada" | "Rejeitada";
  payed_status: "Pago" | "Em Aberto" | "Cancelado";
  group: Group | undefined;
  products: Product[];
};

export const invoices: Invoice[] = [
  {
    document_number: "000120568",
    company: { name: "FusionWare" },
    date_document: new Date(2024, 9, 1),
    document: undefined,
    account_plan: undefined,
    project: undefined,
    expense_type: undefined,
    recurrence: undefined,
    supplier: { name: "Fornecedor A" },
    bank: undefined,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date(2024, 9, 10),
    date_payment: undefined,
    confirmed_status: "Pendente",
    payed_status: "Em Aberto",
    group: undefined,
    products: [
      {
        name: "Cerveja Pilsen",
        code: "1001",
        ncm: 7031020,
        cfop: 5102,
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        purchase_quantity: 36,
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
        code: "1005",
        ncm: 7049020,
        cfop: 5102,
        buy_unit: {
          description: "Fardo",
          abbreviation: "FRD",
          unitsPerPack: 10,
        },
        purchase_quantity: 10,
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
        code: "1007",
        ncm: 7070000,
        cfop: 5102,
        buy_unit: {
          description: "Unidade",
          abbreviation: "UN",
          unitsPerPack: 1,
        },
        purchase_quantity: 2,
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
    date_document: new Date(2024, 9, 2),
    document: undefined,
    account_plan: undefined,
    project: undefined,
    expense_type: undefined,
    recurrence: undefined,
    supplier: { name: "Fornecedor B" },
    bank: undefined,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date(2024, 9, 10),
    date_payment: undefined,
    confirmed_status: "Pendente",
    payed_status: "Em Aberto",
    group: undefined,
    products: [
      {
        name: "Vinho Tinto",
        code: "1005",
        ncm: 7049020,
        cfop: 5102,
        buy_unit: {
          description: "Fardo",
          abbreviation: "FRD",
          unitsPerPack: 10,
        },
        purchase_quantity: 10,
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
        code: "1007",
        ncm: 7070000,
        cfop: 5102,
        buy_unit: {
          description: "Unidade",
          abbreviation: "UN",
          unitsPerPack: 1,
        },
        purchase_quantity: 2,
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
    date_document: new Date(2024, 8, 31),
    document: undefined,
    account_plan: undefined,
    project: undefined,
    expense_type: undefined,
    recurrence: undefined,
    supplier: { name: "Fornecedor C" },
    bank: undefined,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date(2024, 9, 11),
    date_payment: undefined,
    confirmed_status: "Pendente",
    payed_status: "Em Aberto",
    group: undefined,
    products: [
      {
        name: "Cerveja Pilsen",
        code: "1001",
        ncm: 7031020,
        cfop: 5102,
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        purchase_quantity: 72,
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
    date_document: new Date(2024, 9, 5),
    document: undefined,
    account_plan: undefined,
    project: undefined,
    expense_type: undefined,
    recurrence: undefined,
    supplier: { name: "Fornecedor C" },
    bank: undefined,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date(2024, 9, 15),
    date_payment: undefined,
    confirmed_status: "Confirmada",
    payed_status: "Em Aberto",
    group: undefined,
    products: [
      {
        name: "Cerveja Pilsen",
        code: "1001",
        ncm: 7031020,
        cfop: 5102,
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        purchase_quantity: 36,
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
        code: "1005",
        ncm: 7049020,
        cfop: 5102,
        buy_unit: {
          description: "Fardo",
          abbreviation: "FRD",
          unitsPerPack: 10,
        },
        purchase_quantity: 10,
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
        code: "1007",
        ncm: 7070000,
        cfop: 5102,
        buy_unit: {
          description: "Unidade",
          abbreviation: "UN",
          unitsPerPack: 1,
        },
        purchase_quantity: 2,
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
    date_document: new Date(2024, 9, 5),
    document: undefined,
    account_plan: undefined,
    project: undefined,
    expense_type: undefined,
    recurrence: undefined,
    supplier: { name: "Fornecedor C" },
    bank: undefined,
    installment: "Única",
    value_payed: undefined,
    date_deadline: new Date(2024, 9, 15),
    date_payment: undefined,
    confirmed_status: "Rejeitada",
    payed_status: "Em Aberto",
    group: undefined,
    products: [
      {
        name: "Cerveja Pilsen",
        code: "1001",
        ncm: 7031020,
        cfop: 5102,
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        purchase_quantity: 36,
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
        code: "1005",
        ncm: 7049020,
        cfop: 5102,
        buy_unit: {
          description: "Fardo",
          abbreviation: "FRD",
          unitsPerPack: 10,
        },
        purchase_quantity: 10,
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
        code: "1007",
        ncm: 7070000,
        cfop: 5102,
        buy_unit: {
          description: "Unidade",
          abbreviation: "UN",
          unitsPerPack: 1,
        },
        purchase_quantity: 2,
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
  {
    name: "Despesas com Produção/Serviço",
    abbreviation: "DPS",
    accounts: [
      { name: "Bebidas (Chopp)" },
      { name: "Bebidas (Diversos)" },
      { name: "Bebidas (Xapore)" },
      { name: "Bobinas e Etiquetas" },
      { name: "Carvão" },
      { name: "Embalagem (Personalizada)" },
      { name: "Embalagem (Simples)" },
      { name: "Gás" },
      { name: "Gelo" },
      { name: "Hortifrut" },
      { name: "Insumos Diversos" },
      { name: "Lenha" },
      { name: "Material de Escritório" },
      { name: "Não Categorizados" },
      { name: "Pães de hambúrguer" },
      { name: "Pão de alho" },
      { name: "Insumos (Brinquedoteca)" },
      { name: "Proteína (Bovina)" },
      { name: "Proteína (Diversos)" },
      { name: "Proteína (Embutidos)" },
      { name: "Proteína (Queijos)" },
      { name: "Proteína (Suína)" },
      { name: "Sobremesas" },
      { name: "Temperos" },
      { name: "Material de Uso e Consumo" },
      { name: "Proteína (Ovos)" },
      { name: "Proteína (Aves)" },
      { name: "Frutas Congeladas" },
      { name: "Batata Congelada" },
    ],
  },
  {
    name: "Despesas com Ocupação",
    abbreviation: "DOC",
    accounts: [
      { name: "Água e Esgoto" },
      { name: "Alarme da loja" },
      { name: "Locação Imóvel (Aluguel + IPTU + Seguros)" },
      { name: "Containner de lixo" },
      { name: "Material de Limpeza e Conservação" },
      { name: "Eletricista" },
      { name: "Energia Elétrica" },
      { name: "Internet" },
      { name: "IPTU" },
      { name: "Manutenção Geral" },
      { name: "Manutenção Refrigeração" },
      { name: "Manutenção de Máquinas, Móveis e Equipamentos" },
      { name: "Motoboy Delivery" },
      { name: "Obras e Reformas(D)" },
      { name: "Seguro da Loja" },
      { name: "Telefonia (Celular/Fixo)" },
      { name: "Dedetização" },
    ],
  },
  {
    name: "Despesas com Terceiros",
    abbreviation: "DTC",
    accounts: [
      { name: "Advogados" },
      { name: "BPO-Financeiro" },
      { name: "Consultor de Negócios" },
      { name: "Contabilidade" },
      { name: "Dedetização" },
      { name: "Designer de Imagens" },
      { name: "Especialista em RH" },
      { name: "Limpeza e Conservação" },
      { name: "Músico" },
      { name: "Nutricionista" },
      { name: "Publicidade e Propaganda" },
      { name: "Reforma e Construção" },
      { name: "Segurança moto" },
      { name: "Serviços de TI" },
      { name: "Serviços Jurídicos" },
      { name: "Webdesigner" },
    ],
  },
  {
    name: "Despesas com Pessoal",
    abbreviation: "DPE",
    accounts: [
      { name: "Alimentação (Diversas)" },
      { name: "Assistência Médica" },
      { name: "Assistência Odonto" },
      { name: "Bonificação (Diversos)" },
      { name: "Bonificação 10%" },
      { name: "Bonificação 10% (Adiantamento)" },
      { name: "Confraternização" },
      { name: "Educação (Cursos e Livros)" },
      { name: "Exames Médicos" },
      { name: "Férias" },
      { name: "FGTS" },
      { name: "FGTS (Multa)" },
      { name: "Freelancer" },
      { name: "INSS" },
      { name: "INSS (Parcelamento)" },
      { name: "Insumos para Funcionários" },
      { name: "IRRF" },
      { name: "Mensalidade Sindicato" },
      { name: "Plano de Saúde / Exames" },
      { name: "Pró-Labore (Jefferson)" },
      { name: "Pró-Labore (Jonathan e Ágatha)" },
      { name: "Reembolso Funcionário" },
      { name: "Rescisão" },
      { name: "RH (A Classificar)" },
      { name: "Salário (13o Salário)" },
      { name: "Salário (Adiantamento)" },
      { name: "Salário (Bonificação)" },
      { name: "Salário (Dobras / Diárias)" },
      { name: "Salário (Folha)" },
      { name: "Salário (Gratificações)" },
      { name: "Seguro de Vida (Funcionários)" },
      { name: "Transporte (VT)" },
      { name: "Uniformes" },
      { name: "Vale Refeição/Alimentação" },
      { name: "Vestuário" },
    ],
  },
  {
    name: "Deduções sobre Vendas",
    abbreviation: "DSV",
    accounts: [
      { name: "Antecipação" },
      { name: "COFINS" },
      { name: "DAS - Simples Nacional" },
      { name: "ICMS" },
      { name: "IPI" },
      { name: "ISS" },
      { name: "PIS" },
    ],
  },
  {
    name: "Impostos Diretos",
    abbreviation: "DID",
    accounts: [{ name: "ID" }, { name: "CSLL" }],
  },
  {
    name: "Despesas Comerciais/Vendas",
    abbreviation: "DCV",
    accounts: [
      { name: "Alimentação Diversos" },
      { name: "Comissão (Boleto/Pix)" },
      { name: "Comissão (Diversas)" },
      { name: "Comissão (Emissão de Boletos)" },
      { name: "Comissão (Indicação)" },
      { name: "Deslocamento" },
      { name: "DCV" },
      { name: "Estornos" },
      { name: "Eventos e Network" },
      { name: "Financiamento Veículo" },
      { name: "Gasolina" },
      { name: "Impressões para Marketing" },
      { name: "Logística" },
      { name: "Gestor de Marketing" },
      { name: "Marketing Outdoor" },
      { name: "Contas de comida" },
      { name: "Marketing Televisão" },
      { name: "Materiais para Marketing" },
      { name: "Material impresso | Cardápios" },
      { name: "Programa de Fidelidade" },
      { name: "Redes Sociais" },
      { name: "Seguro Veículo" },
      { name: "Trafego pago" },
      { name: "Transporte ADM" },
      { name: "Uber" },
      { name: "Viagens e Deslocamento" },
      { name: "Vídeos" },
    ],
  },
  {
    name: "Despesas Administrativas Outras",
    abbreviation: "DOA",
    accounts: [
      { name: "Financiamento Veiculo" },
      { name: "Gasolina" },
      { name: "Manutenção de Veículos" },
      { name: "Marcas e Patentes" },
      { name: "Material de Escritório" },
      { name: "Seguro Veículo" },
      { name: "Uber (Administrativo)" },
      { name: "Uber (Outros)" },
    ],
  },
  {
    name: "Despesas com Tecnologia",
    abbreviation: "DTC",
    accounts: [
      { name: "Aplicativos" },
      { name: "Domínios de Sites" },
      { name: "Ferramenta do Portal" },
      { name: "Hospedagem de Sites/Emails" },
      { name: "Relógio de Ponto" },
      { name: "Sistema de Vendas" },
      { name: "Software de Gestão" },
      { name: "Software Gestão Financeira" },
      { name: "Spotify" },
      { name: "Tecnologia Diversos" },
    ],
  },
  {
    name: "Despesas Financeiras",
    abbreviation: "DFI",
    accounts: [
      { name: "Anuidade de Cartão" },
      { name: "Cartório" },
      { name: "Cheque Especial" },
      { name: "Despachante" },
      { name: "Despesa Financeira (A Categorizar)" },
      { name: "Estorno de Vendas" },
      { name: "Juros" },
      { name: "Multas" },
      { name: "Pagamento de Empréstimo" },
      { name: "Reembolso" },
      { name: "SCP" },
      { name: "Taxas Bancárias Diversas" },
      { name: "Taxas de IOF" },
      { name: "Taxas de Pix" },
      { name: "Taxas de TED/DOC" },
      { name: "Pagamento de Cartão de Crédito" },
    ],
  },
  {
    name: "Investimentos e Retiradas",
    abbreviation: "DIR",
    accounts: [
      { name: "Imóveis" },
      { name: "Máquinas, Móveis e Equipamentos (I)" },
      { name: "Móveis" },
      { name: "Reformas (I)" },
      { name: "Pagamento de Empréstimo (Ex-Sócio)" },
      { name: "Renegociação de Dívida - Anterior a Março/2024" },
      { name: "Retiradas (Jonathan e Ágatha)" },
      { name: "Retiradas (Jefferson)" },
      { name: "Utensílios (I)" },
      { name: "Veículos" },
      { name: "Pagamento de Empréstimo" },
    ],
  },
  {
    name: "Receitas de Vendas (Loja)",
    abbreviation: "RVL",
    accounts: [
      { name: "Vendas - Salão/Balcão" },
      { name: "Vendas - Incentivos (Parceiros)" },
      { name: "Vendas - Funcionários" },
    ],
  },
  {
    name: "Receitas de Vendas (Delivery)",
    abbreviation: "RVD",
    accounts: [
      { name: "Vendas - Delivery Próprio" },
      { name: "Vendas - Delivery Ifood" },
    ],
  },
  {
    name: "Receitas de Vendas (Eventos)",
    abbreviation: "RVE",
    accounts: [
      { name: "Vendas - Eventos (Próprios)" },
      { name: "Vendas - Eventos (Participação)" },
    ],
  },
  {
    name: "Receitas de Reembolsos",
    abbreviation: "RRB",
    accounts: [
      { name: "Depósitos Indevidos" },
      { name: "Reembolso Diversos" },
      { name: "Ressarcimento" },
      { name: "Reembolso Bancário" },
      { name: "Reembolso de Despesas Canceladas" },
    ],
  },
  {
    name: "Receitas Diversas",
    abbreviation: "RDI",
    accounts: [{ name: "Outras Receitas" }, { name: "Depósitos Indevidos" }],
  },
  {
    name: "Receitas Financeiras",
    abbreviation: "RFI",
    accounts: [
      { name: "Empréstimos Bancários" },
      { name: "Empréstimos de Terceiros" },
      { name: "Rendimentos de Aplicações" },
    ],
  },
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
