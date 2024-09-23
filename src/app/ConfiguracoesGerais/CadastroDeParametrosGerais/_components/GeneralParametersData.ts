/* TRADUÇÃO
Produtos               -> Products           (Product)
Tipos de Controle      -> Types of Control   (Type of Control)
Categorias de Produtos -> Product Categories (Product Category) 
Setores de Utilização  -> Sectors of Use     (Sector of Use)

Estoques               -> Stocks   (Stock)
Locais                 -> Places   (Place)
Armários/Zonas         -> Storages (Storage)
Pratelerias            -> Shelves  (Shelf)
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
  { description: "Equipamento - Cozinha" },
  { description: "Equipamento - Refrigeração" },
  { description: "Equipamento - Bar" },
  { description: "Equipamento - Cozinha" },
  { description: "Equipamento - Eletrônico" },
  { description: "Equipamento - Limpeza" },
  { description: "Equipamento - Refrigeração" },
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
