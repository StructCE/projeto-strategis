import { type Supplier } from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";

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

type Product = {
  name: string;
};

export type Payment = {
  document_number: string;
  company: Company;
  date_document: Date;
  document: DocumentType;
  account_plan: {
    name: string;
    abbreviation: string;
    account: Account;
  };
  project: Project;
  expense_type: "Despesa Fixa" | "Despesa Variável" | "Receita";
  recurrence: "Recorrente" | "Avulsa" | "Parcelas";
  supplier: Supplier;
  bank: Bank | undefined;
  value: number;
  installment: string; // Parcela (Pode ser 'única' ou o numero da parcela incluindo a data ou não)
  value_payed: number | undefined;
  date_deadline: Date;
  date_payment: Date | undefined;
  confirmed_status: "Pendente" | "Confirmada" | "Rejeitada";
  payed_status: "Pago" | "Em Aberto" | "Cancelado";
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
      account: { name: "Bebidas (Diversos)" },
    },
    project: { name: "Strategis - BPO Financeiro" },
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
      account: { name: "Uber (Outros)" },
    },
    project: { name: "Strategis - FidelizClub" },
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
      account: { name: "Vendas - Delivery Ifood" },
    },
    project: { name: "Strategis - Geral" },
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
    account_plan: {
      name: "Despesas com Pessoal",
      abbreviation: "DPE",
      account: { name: "Alimentação (Diversas)" },
    },
    project: { name: "Strategis - Geral" },
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
      account: { name: "Bebidas (Diversos)" },
    },
    project: { name: "Strategis - FidelizClub" },
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
      abbreviation: "DPS",
      account: { name: "Vendas - Delivery Próprio" },
    },
    project: { name: "Strategis - Geral" },
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
    account_plan: {
      name: "Investimentos e Retiradas",
      abbreviation: "DIR",
      account: { name: "Utensílios (I)" },
    },
    project: { name: "Strategis - BPO Financeiro" },
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
