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
        descricao: "Armário 1",
        prateleiras: [
          { descricao: "Prateleira 1" },
          { descricao: "Prateleira 2" },
        ],
      },
      {
        descricao: "Armário 2",
        prateleiras: [
          { descricao: "Prateleira 3" },
          { descricao: "Prateleira 4" },
          { descricao: "Prateleira 5" },
        ],
      },
    ],
  },
  {
    descricao: "Local 2",
    armariosZonas: [
      {
        descricao: "Zona 1",
        prateleiras: [{ descricao: "Prateleira 6" }],
      },
    ],
  },
  {
    descricao: "Local 3",
    armariosZonas: [
      {
        descricao: "Zona 2",
        prateleiras: [
          { descricao: "Prateleira 7" },
          { descricao: "Prateleira 8" },
          { descricao: "Prateleira 9" },
        ],
      },
      {
        descricao: "Zona 3",
        prateleiras: [
          { descricao: "Prateleira 10" },
          { descricao: "Prateleira 11" },
        ],
      },
      {
        descricao: "Zona 4",
        prateleiras: [
          { descricao: "Prateleira 12" },
          { descricao: "Prateleira 13" },
          { descricao: "Prateleira 14" },
          { descricao: "Prateleira 15" },
        ],
      },
      {
        descricao: "Armário 3",
        prateleiras: [{ descricao: "Prateleira 15" }],
      },
      {
        descricao: "Armário 4",
        prateleiras: [
          { descricao: "Prateleira 16" },
          { descricao: "Prateleira 17" },
          { descricao: "Prateleira 18" },
        ],
      },
      {
        descricao: "Armário 5",
        prateleiras: [
          { descricao: "Prateleira 19" },
          { descricao: "Prateleira 20" },
        ],
      },
      {
        descricao: "Armário 6",
        prateleiras: [
          { descricao: "Prateleira 21" },
          { descricao: "Prateleira 22" },
          { descricao: "Prateleira 23" },
          { descricao: "Prateleira 24" },
        ],
      },
    ],
  },
];

/*
Produtos                -> Products (Product)

Tipos de Controle       -> Types of Control   (Type of Control)
Categorias de Produtos  -> Product Categories (Product Category) 
Setores de Utilização   -> Sectors of Use     (Sector of Use)


Estoques                -> Stocks (Stock)

Locais                  -> Places   (Place)
Armários/Zonas          -> Storages (Storage)
Pratelerias             -> Shelves  (Shelf)
*/
