export type Product = {
  code: string;
  name: string;
  buy_unit: string;
  stock_current: number;
  stock_min: number;
  stock_max: number;
  requested_quantity: number;
  released_quantity?: number;
};

export type Request = {
  date: Date;
  request_responsible: string;
  description?: string;
  products: Product[];
};

export const requests: Request[] = [
  {
    date: new Date(2024, 9, 28),
    request_responsible: "Pedro Silva",
    description: "Produtos com estoque baixo no bar",
    products: [
      {
        code: "101",
        name: "Alcatra",
        buy_unit: "kg",
        stock_current: 50,
        stock_min: 10,
        stock_max: 100,
        requested_quantity: 15,
      },
      {
        code: "102",
        name: "Picanha",
        buy_unit: "kg",
        stock_current: 30,
        stock_min: 5,
        stock_max: 50,
        requested_quantity: 15,
      },
      {
        code: "103",
        name: "Limão",
        buy_unit: "unidade",
        stock_current: 200,
        stock_min: 50,
        stock_max: 500,
        requested_quantity: 15,
      },
    ],
  },
  {
    date: new Date(2024, 9, 29),
    request_responsible: "Thiago Santos",
    products: [
      {
        code: "201",
        name: "Alface",
        buy_unit: "unidade",
        stock_current: 100,
        stock_min: 20,
        stock_max: 200,
        requested_quantity: 15,
      },
      {
        code: "202",
        name: "Abóbora",
        buy_unit: "kg",
        stock_current: 60,
        stock_min: 10,
        stock_max: 80,
        requested_quantity: 15,
      },
      {
        code: "203",
        name: "Tomate",
        buy_unit: "kg",
        stock_current: 150,
        stock_min: 30,
        stock_max: 300,
        requested_quantity: 15,
      },
    ],
  },
  {
    date: new Date(2024, 9, 30),
    request_responsible: "Pedro Silva",
    description: "Produtos para funcionários",
    products: [
      {
        code: "301",
        name: "Cerveja",
        buy_unit: "L",
        stock_current: 500,
        stock_min: 100,
        stock_max: 1000,
        requested_quantity: 15,
      },
      {
        code: "302",
        name: "Vodka",
        buy_unit: "L",
        stock_current: 200,
        stock_min: 50,
        stock_max: 400,
        requested_quantity: 15,
      },
      {
        code: "303",
        name: "Catuaba",
        buy_unit: "L",
        stock_current: 300,
        stock_min: 80,
        stock_max: 600,
        requested_quantity: 15,
      },
    ],
  },
];

export type Exit = {
  numero: number;
  date: Date;
  exit_responsible: string;
  request_responsible: string;
  description: string;
  products: Product[];
};

export const exits: Exit[] = [
  {
    numero: 1,
    date: new Date(2024, 9, 25),
    exit_responsible: "João Pedro",
    request_responsible: "Pedro Silva",
    description: "Solicitação de carnes",
    products: [
      {
        code: "101",
        name: "Alcatra",
        buy_unit: "kg",
        stock_current: 50,
        stock_min: 10,
        stock_max: 100,
        requested_quantity: 15,
        released_quantity: 15,
      },
      {
        code: "102",
        name: "Picanha",
        buy_unit: "kg",
        stock_current: 30,
        stock_min: 5,
        stock_max: 50,
        requested_quantity: 15,
        released_quantity: 15,
      },
    ],
  },
  {
    numero: 2,
    date: new Date(2024, 9, 26),
    exit_responsible: "João Pedro",
    request_responsible: "Thiago Santos",
    description: "Solicitação de vegetais",
    products: [
      {
        code: "201",
        name: "Alface",
        buy_unit: "buy_unit",
        stock_current: 100,
        stock_min: 20,
        stock_max: 200,
        requested_quantity: 15,
        released_quantity: 15,
      },
      {
        code: "202",
        name: "Abóbora",
        buy_unit: "kg",
        stock_current: 60,
        stock_min: 10,
        stock_max: 80,
        requested_quantity: 15,
        released_quantity: 15,
      },
    ],
  },
  {
    numero: 3,
    date: new Date(2024, 9, 27),
    exit_responsible: "João Pedro",
    request_responsible: "Pedro Silva",
    description: "Solicitação de bebidas",
    products: [
      {
        code: "301",
        name: "Cerveja",
        buy_unit: "litro",
        stock_current: 500,
        stock_min: 100,
        stock_max: 1000,
        requested_quantity: 15,
        released_quantity: 15,
      },
      {
        code: "302",
        name: "Vodka",
        buy_unit: "litro",
        stock_current: 200,
        stock_min: 50,
        stock_max: 400,
        requested_quantity: 15,
        released_quantity: 15,
      },
    ],
  },
  {
    numero: 4,
    date: new Date(2024, 9, 28),
    exit_responsible: "João Pedro",
    request_responsible: "Pedro Silva",
    description: "Solicitação de carnes adicionais",
    products: [
      {
        code: "101",
        name: "Alcatra",
        buy_unit: "kg",
        stock_current: 50,
        stock_min: 10,
        stock_max: 100,
        requested_quantity: 15,
        released_quantity: 15,
      },
      {
        code: "103",
        name: "Limão",
        buy_unit: "buy_unit",
        stock_current: 200,
        stock_min: 50,
        stock_max: 500,
        requested_quantity: 15,
        released_quantity: 15,
      },
    ],
  },
];
