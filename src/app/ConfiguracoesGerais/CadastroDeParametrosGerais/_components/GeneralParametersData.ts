// Produtos

export type TipoDeControle = {
  descricao: string;
};

export const TiposDeControle = [
  { descricao: "Patrimônio" },
  { descricao: "Produtos de Bar" },
  { descricao: "Produtos de Finalização" },
  { descricao: "Produtos de Funcionários" },
  { descricao: "Produtos de Hortifruti" },
  { descricao: "Produtos de Limpeza" },
  { descricao: "Produtos de Produção" },
  { descricao: "Produtos de Salao" },
  { descricao: "Produtos Evento" },
  { descricao: "Produtos Porcionados" },
];

export type CategoriaDoProduto = {
  descricao: string;
};

export const CategoriasDoProduto = [
  { descricao: "Acompanhamento" },
  { descricao: "Bebidas" },
  { descricao: "Bebidas - Águas" },
  { descricao: "Bebidas - Café" },
  { descricao: "Bebidas - Cervejas" },
  { descricao: "Bebidas - Chop" },
  { descricao: "Bebidas - Destilados" },
  { descricao: "Bebidas - Energéticos" },
  { descricao: "Bebidas - Refrigerantes" },
  { descricao: "Bebidas - Vinho" },
  { descricao: "Bebidas - Xaropes" },
  { descricao: "Carnes" },
  { descricao: "Carnes - Em Processo" },
  { descricao: "Carnes - Funcionários" },
  { descricao: "Carnes - In Natura" },
  { descricao: "Carnes - Porcionadas" },
  { descricao: "Embalagens" },
  { descricao: "Embalagens - A vácuo" },
  { descricao: "Embalagens - Evento" },
  { descricao: "Entradas" },
  { descricao: "Equipamento" },
  { descricao: "Equipamento - Cozinha" },
  { descricao: "Equipamento - Refrigeração" },
  { descricao: "Equipamento - Bar" },
  { descricao: "Equipamento - Cozinha" },
  { descricao: "Equipamento - Eletrônico" },
  { descricao: "Equipamento - Limpeza" },
  { descricao: "Equipamento - Refrigeração" },
  { descricao: "Funcionários" },
  { descricao: "Hortifruti" },
  { descricao: "Insumos" },
  { descricao: "Mobiliário" },
  { descricao: "Mobiliário - Salão" },
  { descricao: "Mobiliário - Assentos Salão" },
  { descricao: "Mobiliário - Mesas Salão" },
  { descricao: "Mobiliário - Cozinha" },
  { descricao: "Molhos" },
  { descricao: "Pães" },
  { descricao: "Produtos" },
  { descricao: "Produtos - Limpeza" },
  { descricao: "Queijos" },
  { descricao: "Queijos - Porcionados" },
  { descricao: "Queima" },
  { descricao: "Sobremesas" },
  { descricao: "Temperos" },
  { descricao: "Utensilhos" },
  { descricao: "Utensilhos - Bar" },
  { descricao: "Utensilhos - Cozinho" },
  { descricao: "Utensilhos - Quadro" },
];

export type SetorDeUtilizacao = {
  descricao: string;
};

export const SetoresDeUtilizacao = [
  { descricao: "Bar" },
  { descricao: "Caixa" },
  { descricao: "Cozinha" },
  { descricao: "Delivery" },
  { descricao: "Evento" },
  { descricao: "Finalização" },
  { descricao: "Geral" },
  { descricao: "Produção" },
  { descricao: "Salão" },
  { descricao: "Serviços Gerais" },
  { descricao: "Sobremesa" },
];

// Estoques
export type Prateleira = {
  descricao: string;
};

export type ArmarioZona = {
  descricao: string;
  prateleiras: Prateleira[];
};

export type Local = {
  descricao: string;
  armariosZonas: ArmarioZona[];
};

export const locais: Local[] = [
  {
    descricao: "Local 1",
    armariosZonas: [
      {
        descricao: "Armário/Zona 1",
        prateleiras: [
          { descricao: "Prateleira 1" },
          { descricao: "Prateleira 2" },
        ],
      },
      {
        descricao: "Armário/Zona 2",
        prateleiras: [
          { descricao: "Prateleira 3" },
          { descricao: "Prateleira 4" },
        ],
      },
    ],
  },
  {
    descricao: "Local 2",
    armariosZonas: [
      {
        descricao: "Armário/Zona 3",
        prateleiras: [{ descricao: "Prateleira 5" }],
      },
    ],
  },
];
