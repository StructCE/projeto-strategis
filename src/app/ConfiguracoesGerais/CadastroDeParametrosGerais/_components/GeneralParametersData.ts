/* TRADUÇÃO
Produtos                 -> Products           (Product)
- Tipos de Controle      -> Types of Control   (Type of Control)
- Categorias de Produtos -> Product Categories (Product Category) 
- Setores de Utilização  -> Sectors of Use     (Sector of Use)
- Unidades               -> Units              (Unit)
- Motivos de Ajuste      -> Adjustment Reasons (Adjustment Reason)

Estoques                 -> Stocks   (Stock)
- Armários/Zonas         -> Storages (Storage)
- Pratelerias            -> Shelves  (Shelf)

Pagamentos               -> Payments       (Payment)
- Tipos de Documento     -> Document Types (Document Type)
- Planos de Conta        -> Account Plans  (Account Plan)
- Projeto                -> Projects       (Project)
- Banco                  -> Banks          (Bank)
- Grupo                  -> Groups         (Group)
*/

// Products
export type TypeOfControl = {
  description: string;
};

export const TypesOfControl = [
  { description: "Patrimônio" },
  { description: "Produtos de Bar" },
  { description: "Produtos de Finalização" },
  { description: "Produtos de Funcionários" },
  { description: "Produtos de Hortifruti" },
  { description: "Produtos de Limpeza" },
  { description: "Produtos de Produção" },
  { description: "Produtos de Salao" },
  { description: "Produtos Evento" },
  { description: "Produtos Porcionados" },
];

export type ProductCategory = {
  description: string;
};

export const ProductCategories = [
  { description: "Acompanhamento" },
  { description: "Bebidas" },
  { description: "Bebidas - Águas" },
  { description: "Bebidas - Café" },
  { description: "Bebidas - Cervejas" },
  { description: "Bebidas - Chop" },
  { description: "Bebidas - Destilados" },
  { description: "Bebidas - Energéticos" },
  { description: "Bebidas - Refrigerantes" },
  { description: "Bebidas - Vinho" },
  { description: "Bebidas - Xaropes" },
  { description: "Carnes" },
  { description: "Carnes - Em Processo" },
  { description: "Carnes - Funcionários" },
  { description: "Carnes - In Natura" },
  { description: "Carnes - Porcionadas" },
  { description: "Embalagens" },
  { description: "Embalagens - A vácuo" },
  { description: "Embalagens - Evento" },
  { description: "Entradas" },
  { description: "Equipamento" },
  { description: "Equipamento - Refrigeração" },
  { description: "Equipamento - Bar" },
  { description: "Equipamento - Cozinha" },
  { description: "Equipamento - Eletrônico" },
  { description: "Equipamento - Limpeza" },
  { description: "Funcionários" },
  { description: "Hortifruti" },
  { description: "Insumos" },
  { description: "Mobiliário" },
  { description: "Mobiliário - Salão" },
  { description: "Mobiliário - Assentos Salão" },
  { description: "Mobiliário - Mesas Salão" },
  { description: "Mobiliário - Cozinha" },
  { description: "Molhos" },
  { description: "Pães" },
  { description: "Produtos" },
  { description: "Produtos - Limpeza" },
  { description: "Queijos" },
  { description: "Queijos - Porcionados" },
  { description: "Queima" },
  { description: "Sobremesas" },
  { description: "Temperos" },
  { description: "Utensilhos" },
  { description: "Utensilhos - Bar" },
  { description: "Utensilhos - Cozinho" },
  { description: "Utensilhos - Quadro" },
];

export type SectorOfUse = {
  description: string;
};

export const SectorsOfUse = [
  { description: "Bar" },
  { description: "Caixa" },
  { description: "Cozinha" },
  { description: "Delivery" },
  { description: "Evento" },
  { description: "Finalização" },
  { description: "Geral" },
  { description: "Produção" },
  { description: "Salão" },
  { description: "Serviços Gerais" },
  { description: "Sobremesa" },
];

export type Unit = {
  description: string;
  abbreviation: string;
  unitsPerPack: number;
};

export const units: Unit[] = [
  { description: "Kilograma", abbreviation: "KG", unitsPerPack: 1 },
  { description: "Grama", abbreviation: "G", unitsPerPack: 1 },
  { description: "Mililitro", abbreviation: "ML", unitsPerPack: 1 },
  { description: "Unidade", abbreviation: "UN", unitsPerPack: 1 },
  { description: "Pacote", abbreviation: "PCT", unitsPerPack: 12 },
  { description: "Caixa", abbreviation: "CX", unitsPerPack: 24 },
  { description: "Fardo", abbreviation: "FRD", unitsPerPack: 10 },
  { description: "Saco", abbreviation: "SC", unitsPerPack: 20 },
  { description: "Lata", abbreviation: "LT", unitsPerPack: 1 },
];

export type AdjustmentReason = {
  description: string;
};

export const adjustment_reasons: AdjustmentReason[] = [
  {
    description: "Congelamento",
  },
  {
    description: "Queima/desperdício",
  },
  {
    description: "Quebra/extravio",
  },
  {
    description: "Contagem anterior errada",
  },
  {
    description: "Outro",
  },
];

// Stocks
export type Shelf = {
  description: string;
};

export type Storage = {
  description: string;
  shelves: Shelf[];
};

export const storages: Storage[] = [
  {
    description: "Armário 1",
    shelves: [{ description: "Prateleira 1" }, { description: "Prateleira 2" }],
  },
  {
    description: "Armário 2",
    shelves: [
      { description: "Prateleira 3" },
      { description: "Prateleira 4" },
      { description: "Prateleira 5" },
    ],
  },
  {
    description: "Zona 1",
    shelves: [{ description: "Prateleira 6" }],
  },
  {
    description: "Zona 2",
    shelves: [
      { description: "Prateleira 7" },
      { description: "Prateleira 8" },
      { description: "Prateleira 9" },
    ],
  },
  {
    description: "Zona 3",
    shelves: [
      { description: "Prateleira 10" },
      { description: "Prateleira 11" },
    ],
  },
  {
    description: "Zona 4",
    shelves: [
      { description: "Prateleira 12" },
      { description: "Prateleira 13" },
      { description: "Prateleira 14" },
      { description: "Prateleira 15" },
    ],
  },
  {
    description: "Armário 3",
    shelves: [{ description: "Prateleira 15" }],
  },
  {
    description: "Armário 4",
    shelves: [
      { description: "Prateleira 16" },
      { description: "Prateleira 17" },
      { description: "Prateleira 18" },
    ],
  },
  {
    description: "Armário 5",
    shelves: [
      { description: "Prateleira 19" },
      { description: "Prateleira 20" },
    ],
  },
  {
    description: "Armário 6",
    shelves: [
      { description: "Prateleira 21" },
      { description: "Prateleira 22" },
      { description: "Prateleira 23" },
      { description: "Prateleira 24" },
    ],
  },
];

// Payments
export type DocumentType = {
  name: string;
};

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

export type AccountPlan = {
  name: string;
  abbreviation: string;
  accounts: string[];
};

export const account_plans: AccountPlan[] = [
  {
    name: "Despesas com Produção/Serviço",
    abbreviation: "DPS",
    accounts: [
      "Bebidas (Chopp)",
      "Bebidas (Diversos)",
      "Bebidas (Xapore)",
      "Bobinas e Etiquetas",
      "Carvão",
      "Embalagem (Personalizada)",
      "Embalagem (Simples)",
      "Gás",
      "Gelo",
      "Hortifrut",
      "Insumos Diversos",
      "Lenha",
      "Material de Escritório",
      "Não Categorizados",
      "Pães de hambúrguer",
      "Pão de alho",
      "Insumos (Brinquedoteca)",
      "Proteína (Bovina)",
      "Proteína (Diversos)",
      "Proteína (Embutidos)",
      "Proteína (Queijos)",
      "Proteína (Suína)",
      "Sobremesas",
      "Temperos",
      "Material de Uso e Consumo",
      "Proteína (Ovos)",
      "Proteína (Aves)",
      "Frutas Congeladas",
      "Batata Congelada",
    ],
  },
  {
    name: "Despesas com Ocupação",
    abbreviation: "DOC",
    accounts: [
      "Água e Esgoto",
      "Alarme da loja",
      "Locação Imóvel (Aluguel + IPTU + Seguros)",
      "Containner de lixo",
      "Material de Limpeza e Conservação",
      "Eletricista",
      "Energia Elétrica",
      "Internet",
      "IPTU",
      "Manutenção Geral",
      "Manutenção Refrigeração",
      "Manutenção de Máquinas, Móveis e Equipamentos",
      "Motoboy Delivery",
      "Obras e Reformas(D)",
      "Seguro da Loja",
      "Telefonia (Celular/Fixo)",
      "Dedetização",
    ],
  },
  {
    name: "Despesas com Terceiros",
    abbreviation: "DTC",
    accounts: [
      "Advogados",
      "BPO-Financeiro",
      "Consultor de Negócios",
      "Contabilidade",
      "Dedetização",
      "Designer de Imagens",
      "Especialista em RH",
      "Limpeza e Conservação",
      "Músico",
      "Nutricionista",
      "Publicidade e Propaganda",
      "Reforma e Construção",
      "Segurança moto",
      "Serviços de TI",
      "Serviços Jurídicos",
      "Webdesigner",
    ],
  },
  {
    name: "Despesas com Pessoal",
    abbreviation: "DPE",
    accounts: [
      "Alimentação (Diversas)",
      "Assistência Médica",
      "Assistência Odonto",
      "Bonificação (Diversos)",
      "Bonificação 10%",
      "Bonificação 10% (Adiantamento)",
      "Confraternização",
      "Educação (Cursos e Livros)",
      "Exames Médicos",
      "Férias",
      "FGTS",
      "FGTS (Multa)",
      "Freelancer",
      "INSS",
      "INSS (Parcelamento)",
      "Insumos para Funcionários",
      "IRRF",
      "Mensalidade Sindicato",
      "Plano de Saúde / Exames",
      "Pró-Labore (Jefferson)",
      "Pró-Labore (Jonathan e Ágatha)",
      "Reembolso Funcionário",
      "Rescisão",
      "RH (A Classificar)",
      "Salário (13o Salário)",
      "Salário (Adiantamento)",
      "Salário (Bonificação)",
      "Salário (Dobras / Diárias)",
      "Salário (Folha)",
      "Salário (Gratificações)",
      "Seguro de Vida (Funcionários)",
      "Transporte (VT)",
      "Uniformes",
      "Vale Refeição/Alimentação",
      "Vestuário",
    ],
  },
  {
    name: "Deduções sobre Vendas",
    abbreviation: "DSV",
    accounts: [
      "Antecipação",
      "COFINS",
      "DAS - Simples Nacional",
      "ICMS",
      "IPI",
      "ISS",
      "PIS",
    ],
  },
  {
    name: "Impostos Diretos",
    abbreviation: "DID",
    accounts: ["ID", "CSLL"],
  },
  {
    name: "Despesas Comerciais/Vendas",
    abbreviation: "DCV",
    accounts: [
      "Alimentação Diversos",
      "Comissão (Boleto/Pix)",
      "Comissão (Diversas)",
      "Comissão (Emissão de Boletos)",
      "Comissão (Indicação)",
      "Deslocamento",
      "DCV",
      "Estornos",
      "Eventos e Network",
      "Financiamento Veículo",
      "Gasolina",
      "Impressões para Marketing",
      "Logística",
      "Gestor de Marketing",
      "Marketing Outdoor",
      "Contas de comida",
      "Marketing Televisão",
      "Materiais para Marketing",
      "Material impresso | Cardápios",
      "Programa de Fidelidade",
      "Redes Sociais",
      "Seguro Veículo",
      "Trafego pago",
      "Transporte ADM",
      "Uber",
      "Viagens e Deslocamento",
      "Vídeos",
    ],
  },
  {
    name: "Despesas Administrativas Outras",
    abbreviation: "DOA",
    accounts: [
      "Financiamento Veiculo",
      "Gasolina",
      "Manutenção de Veículos",
      "Marcas e Patentes",
      "Material de Escritório",
      "Seguro Veículo",
      "Uber (Administrativo)",
      "Uber (Outros)",
    ],
  },
  {
    name: "Despesas com Tecnologia",
    abbreviation: "DTC",
    accounts: [
      "Aplicativos",
      "Domínios de Sites",
      "Ferramenta do Portal",
      "Hospedagem de Sites/Emails",
      "Relógio de Ponto",
      "Sistema de Vendas",
      "Software de Gestão",
      "Software Gestão Financeira",
      "Spotify",
      "Tecnologia Diversos",
    ],
  },
  {
    name: "Despesas Financeiras",
    abbreviation: "DFI",
    accounts: [
      "Anuidade de Cartão",
      "Cartório",
      "Cheque Especial",
      "Despachante",
      "Despesa Financeira (A Categorizar)",
      "Estorno de Vendas",
      "Juros",
      "Multas",
      "Pagamento de Empréstimo",
      "Reembolso",
      "SCP",
      "Taxas Bancárias Diversas",
      "Taxas de IOF",
      "Taxas de Pix",
      "Taxas de TED/DOC",
      "Pagamento de Cartão de Crédito",
    ],
  },
  {
    name: "Investimentos e Retiradas",
    abbreviation: "DIR",
    accounts: [
      "Imóveis",
      "Máquinas, Móveis e Equipamentos (I)",
      "Móveis",
      "Reformas (I)",
      "Pagamento de Empréstimo (Ex-Sócio)",
      "Renegociação de Dívida - Anterior a Março/2024",
      "Retiradas (Jonathan e Ágatha)",
      "Retiradas (Jefferson)",
      "Utensílios (I)",
      "Veículos",
      "Pagamento de Empréstimo",
    ],
  },
  {
    name: "Receitas de Vendas (Loja)",
    abbreviation: "RVL",
    accounts: [
      "Vendas - Salão/Balcão",
      "Vendas - Incentivos (Parceiros)",
      "Vendas - Funcionários",
    ],
  },
  {
    name: "Receitas de Vendas (Delivery)",
    abbreviation: "RVD",
    accounts: ["Vendas - Delivery Próprio", "Vendas - Delivery Ifood"],
  },
  {
    name: "Receitas de Vendas (Eventos)",
    abbreviation: "RVE",
    accounts: [
      "Vendas - Eventos (Próprios)",
      "Vendas - Eventos (Participação)",
    ],
  },
  {
    name: "Receitas de Reembolsos",
    abbreviation: "RRB",
    accounts: [
      "Depósitos Indevidos",
      "Reembolso Diversos",
      "Ressarcimento",
      "Reembolso Bancário",
      "Reembolso de Despesas Canceladas",
    ],
  },
  {
    name: "Receitas Diversas",
    abbreviation: "RDI",
    accounts: ["Outras Receitas", "Depósitos Indevidos"],
  },
  {
    name: "Receitas Financeiras",
    abbreviation: "RFI",
    accounts: [
      "Empréstimos Bancários",
      "Empréstimos de Terceiros",
      "Rendimentos de Aplicações",
    ],
  },
];

export type Project = {
  name: string;
};

export const projects: Project[] = [
  { name: "Strategis - Assessoria" },
  { name: "Strategis - BPO Financeiro" },
  { name: "Strategis - Compartilhado" },
  { name: "Strategis - FidelizClub" },
  { name: "Strategis - Geral" },
];

export type Bank = {
  name: string;
};

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

export type Group = {
  name: string;
};

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
