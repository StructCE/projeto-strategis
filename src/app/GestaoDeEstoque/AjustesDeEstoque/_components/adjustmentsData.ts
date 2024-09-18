type Product = {
  code: string;
  name: string;
  stockQuantity: number;
  inventoryQuantity: number;
};

export type Inventory = {
  date: string;
  name: string;
  responsible: string;
  products: Product[];
};

export const inventories: Inventory[] = [
  {
    date: "16/09/2024",
    name: "Inventário 2024.09.16.001.Categoria.Estoquista",
    responsible: "Estoquista 1",
    products: [
      { code: "P001", name: "Arroz", stockQuantity: 20, inventoryQuantity: 18 },
      {
        code: "P002",
        name: "Feijão",
        stockQuantity: 15,
        inventoryQuantity: 15,
      },
      { code: "P003", name: "Óleo", stockQuantity: 10, inventoryQuantity: 9 },
      { code: "P004", name: "Sal", stockQuantity: 30, inventoryQuantity: 29 },
      {
        code: "P005",
        name: "Açúcar",
        stockQuantity: 12,
        inventoryQuantity: 15,
      },
    ],
  },
  {
    date: "16/09/2024",
    name: "Inventário 2024.09.16.002.Categoria.Estoquista",
    responsible: "Estoquista 2",
    products: [
      {
        code: "P006",
        name: "Farinha",
        stockQuantity: 25,
        inventoryQuantity: 24,
      },
      { code: "P007", name: "Leite", stockQuantity: 40, inventoryQuantity: 38 },
      { code: "P008", name: "Carne", stockQuantity: 60, inventoryQuantity: 59 },
      {
        code: "P009",
        name: "Manteiga",
        stockQuantity: 20,
        inventoryQuantity: 19,
      },
      { code: "P010", name: "Ovos", stockQuantity: 50, inventoryQuantity: 48 },
    ],
  },
  {
    date: "16/09/2024",
    name: "Inventário 2024.09.16.003.Categoria.Estoquista",
    responsible: "Estoquista 3",
    products: [
      {
        code: "P011",
        name: "Batata",
        stockQuantity: 35,
        inventoryQuantity: 34,
      },
      {
        code: "P012",
        name: "Cebola",
        stockQuantity: 22,
        inventoryQuantity: 20,
      },
      { code: "P013", name: "Alho", stockQuantity: 18, inventoryQuantity: 18 },
      {
        code: "P014",
        name: "Tomate",
        stockQuantity: 25,
        inventoryQuantity: 23,
      },
      {
        code: "P015",
        name: "Cenoura",
        stockQuantity: 30,
        inventoryQuantity: 29,
      },
    ],
  },
];

export type Adjustment = {
  date: string;
  name: string;
  responsible: string;
  type: string;
  products: Product[];
};

export const adjustments: Adjustment[] = [
  {
    date: "17/09/2024",
    name: "Ajuste 2024.09.17.00X.Categoria.Estoquista1",
    responsible: "Estoquista 1",
    type: "Manual",
    products: [
      {
        code: "P011",
        name: "Batata",
        stockQuantity: 35,
        inventoryQuantity: 34,
      },
      {
        code: "P012",
        name: "Cebola",
        stockQuantity: 22,
        inventoryQuantity: 20,
      },
      { code: "P013", name: "Alho", stockQuantity: 18, inventoryQuantity: 18 },
      {
        code: "P014",
        name: "Tomate",
        stockQuantity: 25,
        inventoryQuantity: 23,
      },
      {
        code: "P015",
        name: "Cenoura",
        stockQuantity: 30,
        inventoryQuantity: 29,
      },
    ],
  },
  {
    date: "18/09/2024",
    name: "Ajuste 2024.09.18.00X.Categoria.Estoquista2",
    responsible: "Estoquista 2",
    type: "Manual",
    products: [
      {
        code: "P011",
        name: "Batata",
        stockQuantity: 35,
        inventoryQuantity: 34,
      },
      {
        code: "P012",
        name: "Cebola",
        stockQuantity: 22,
        inventoryQuantity: 20,
      },
      { code: "P013", name: "Alho", stockQuantity: 18, inventoryQuantity: 18 },
      {
        code: "P014",
        name: "Tomate",
        stockQuantity: 25,
        inventoryQuantity: 23,
      },
      {
        code: "P015",
        name: "Cenoura",
        stockQuantity: 30,
        inventoryQuantity: 29,
      },
    ],
  },
  {
    date: "19/09/2024",
    name: "Ajuste 2024.09.19.00X.Categoria.Estoquista1",
    responsible: "Estoquista 1",
    type: "Automático",
    products: [
      {
        code: "P011",
        name: "Batata",
        stockQuantity: 35,
        inventoryQuantity: 34,
      },
      {
        code: "P012",
        name: "Cebola",
        stockQuantity: 22,
        inventoryQuantity: 20,
      },
      { code: "P013", name: "Alho", stockQuantity: 18, inventoryQuantity: 18 },
      {
        code: "P014",
        name: "Tomate",
        stockQuantity: 25,
        inventoryQuantity: 23,
      },
      {
        code: "P015",
        name: "Cenoura",
        stockQuantity: 30,
        inventoryQuantity: 29,
      },
    ],
  },
  {
    date: "20/09/2024",
    name: "Ajuste 2024.09.20.00X.Categoria.Estoquista2",
    responsible: "Estoquista 2",
    type: "Automático",
    products: [
      {
        code: "P011",
        name: "Batata",
        stockQuantity: 35,
        inventoryQuantity: 34,
      },
      {
        code: "P012",
        name: "Cebola",
        stockQuantity: 22,
        inventoryQuantity: 20,
      },
      { code: "P013", name: "Alho", stockQuantity: 18, inventoryQuantity: 18 },
      {
        code: "P014",
        name: "Tomate",
        stockQuantity: 25,
        inventoryQuantity: 23,
      },
      {
        code: "P015",
        name: "Cenoura",
        stockQuantity: 30,
        inventoryQuantity: 29,
      },
    ],
  },
];
