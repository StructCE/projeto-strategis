type Product = {
  code: string;
  name: string;
  stock_old: number;
  stock_adjusted: number;
  reason: AdjustmentReason;
};

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

export type Adjustment = {
  date: Date;
  name: string;
  responsible: string;
  type: string;
  products: Product[];
};

export const adjustments: Adjustment[] = [
  {
    date: new Date(2024, 9, 18),
    name: "Ajuste 2024.09.17.00X.Categoria.Estoquista1",
    responsible: "Estoquista 1",
    type: "Manual",
    products: [
      {
        code: "1001",
        name: "Cerveja Pilsen",
        stock_old: 200,
        stock_adjusted: 180,
        reason: { description: "Congelamento" },
      },
      {
        code: "1003",
        name: "Água Mineral",
        stock_old: 250,
        stock_adjusted: 240,
        reason: { description: "Queima/desperdício" },
      },
      {
        code: "1005",
        name: "Vinho Tinto",
        stock_old: 150,
        stock_adjusted: 140,
        reason: { description: "Congelamento" },
      },
    ],
  },
  {
    date: new Date(2024, 9, 19),
    name: "Ajuste 2024.09.18.00X.Categoria.Estoquista2",
    responsible: "Estoquista 2",
    type: "Manual",
    products: [
      {
        code: "1004",
        name: "Sabão em Pó",
        stock_old: 80,
        stock_adjusted: 75,
        reason: { description: "Queima/desperdício" },
      },
      {
        code: "1003",
        name: "Água Mineral",
        stock_old: 240,
        stock_adjusted: 230,
        reason: { description: "Congelamento" },
      },
    ],
  },
  {
    date: new Date(2024, 9, 20),
    name: "Ajuste 2024.09.19.00X.Categoria.Estoquista1",
    responsible: "Estoquista 1",
    type: "Automático",
    products: [
      {
        code: "1002",
        name: "Carne Bovina",
        stock_old: 120,
        stock_adjusted: 110,
        reason: { description: "Queima/desperdício" },
      },
      {
        code: "1006",
        name: "Carne Moída",
        stock_old: 60,
        stock_adjusted: 58,
        reason: { description: "Contagem anterior errada" },
      },
    ],
  },
  {
    date: new Date(2024, 9, 21),
    name: "Ajuste 2024.09.20.00X.Categoria.Estoquista2",
    responsible: "Estoquista 2",
    type: "Automático",
    products: [
      {
        code: "1001",
        name: "Cerveja Pilsen",
        stock_old: 180,
        stock_adjusted: 178,
        reason: { description: "Quebra/extravio" },
      },
      {
        code: "1005",
        name: "Vinho Tinto",
        stock_old: 140,
        stock_adjusted: 135,
        reason: { description: "Outro" },
      },
    ],
  },
];
