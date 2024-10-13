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

// export type ProductCategory = {
//   description: string;
// };

// export const ProductCategories = [
//   { description: "Acompanhamento" },
//   { description: "Bebidas" },
//   { description: "Bebidas - Águas" },
//   { description: "Bebidas - Café" },
//   { description: "Bebidas - Cervejas" },
//   { description: "Bebidas - Chop" },
//   { description: "Bebidas - Destilados" },
//   { description: "Bebidas - Energéticos" },
//   { description: "Bebidas - Refrigerantes" },
//   { description: "Bebidas - Vinho" },
//   { description: "Bebidas - Xaropes" },
//   { description: "Carnes" },
//   { description: "Carnes - Em Processo" },
//   { description: "Carnes - Funcionários" },
//   { description: "Carnes - In Natura" },
//   { description: "Carnes - Porcionadas" },
//   { description: "Embalagens" },
//   { description: "Embalagens - A vácuo" },
//   { description: "Embalagens - Evento" },
//   { description: "Entradas" },
//   { description: "Equipamento" },
//   { description: "Equipamento - Refrigeração" },
//   { description: "Equipamento - Bar" },
//   { description: "Equipamento - Cozinha" },
//   { description: "Equipamento - Eletrônico" },
//   { description: "Equipamento - Limpeza" },
//   { description: "Funcionários" },
//   { description: "Hortifruti" },
//   { description: "Insumos" },
//   { description: "Mobiliário" },
//   { description: "Mobiliário - Salão" },
//   { description: "Mobiliário - Assentos Salão" },
//   { description: "Mobiliário - Mesas Salão" },
//   { description: "Mobiliário - Cozinha" },
//   { description: "Molhos" },
//   { description: "Pães" },
//   { description: "Produtos" },
//   { description: "Produtos - Limpeza" },
//   { description: "Queijos" },
//   { description: "Queijos - Porcionados" },
//   { description: "Queima" },
//   { description: "Sobremesas" },
//   { description: "Temperos" },
//   { description: "Utensilhos" },
//   { description: "Utensilhos - Bar" },
//   { description: "Utensilhos - Cozinho" },
//   { description: "Utensilhos - Quadro" },
// ];

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

// export type AdjustmentReason = {
//   description: string;
// };

// export const adjustment_reasons: AdjustmentReason[] = [
//   {
//     description: "Congelamento",
//   },
//   {
//     description: "Queima/desperdício",
//   },
//   {
//     description: "Quebra/extravio",
//   },
//   {
//     description: "Contagem anterior errada",
//   },
//   {
//     description: "Outro",
//   },
// ];

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

export type Account = {
  name: string;
};

export const accounts = [
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
  { name: "Antecipação" },
  { name: "COFINS" },
  { name: "DAS - Simples Nacional" },
  { name: "ICMS" },
  { name: "IPI" },
  { name: "ISS" },
  { name: "PIS" },
  { name: "ID" },
  { name: "CSLL" },
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
  { name: "Trafego pago" },
  { name: "Transporte ADM" },
  { name: "Uber" },
  { name: "Viagens e Deslocamento" },
  { name: "Vídeos" },
  { name: "Financiamento Veiculo" },
  { name: "Manutenção de Veículos" },
  { name: "Marcas e Patentes" },
  { name: "Material de Escritório" },
  { name: "Seguro Veículo" },
  { name: "Uber (Administrativo)" },
  { name: "Uber (Outros)" },
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
  { name: "Vendas - Salão/Balcão" },
  { name: "Vendas - Incentivos (Parceiros)" },
  { name: "Vendas - Funcionários" },
  { name: "Vendas - Delivery Próprio" },
  { name: "Vendas - Delivery Ifood" },
  { name: "Vendas - Eventos (Próprios)" },
  { name: "Vendas - Eventos (Participação)" },
  { name: "Reembolso Diversos" },
  { name: "Ressarcimento" },
  { name: "Reembolso Bancário" },
  { name: "Reembolso de Despesas Canceladas" },
  { name: "Outras Receitas" },
  { name: "Depósitos Indevidos" },
  { name: "Empréstimos Bancários" },
  { name: "Empréstimos de Terceiros" },
  { name: "Rendimentos de Aplicações" },
];

export type AccountPlan = {
  name: string;
  abbreviation: string;
  accounts: Account[];
};

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
