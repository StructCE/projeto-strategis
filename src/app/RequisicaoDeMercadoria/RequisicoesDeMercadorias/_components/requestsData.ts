import { type Unit } from "~/app/ConfiguracoesGerais/CadastroDeProdutos/_components/productsData";

type Supplier = {
  name: string;
};

export type Product = {
  name: string;
  code: string;
  supplier: Supplier;
  status: string;
  parent_product?: string;
  buy_or_production: string;
  buy_unit: Unit;
  requested_quantity: string;
  released_quantity: string;
  buy_day: string;
  stock_current: string;
  stock_min: string;
  stock_max: string;
};

export type Request = {
  request_date: Date;
  request_responsible: string;
  products: Product[];
  request_description: string;
  status: "pending" | "accepted" | "rejected";
  status_description?: string;
  status_date?: Date;
  status_responsible?: string;
};

export const requests: Request[] = [
  {
    request_date: new Date(2024, 9, 22),
    request_responsible: "Requisitante 1",
    products: [
      {
        name: "Cerveja Pilsen",
        code: "1001",
        status: "Ativo",
        supplier: { name: "Fornecedor A" },
        buy_or_production: "Produto de Compra",
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        requested_quantity: "3",
        released_quantity: "3",
        buy_day: "Segunda",
        stock_current: "200",
        stock_min: "50",
        stock_max: "300",
      },
      {
        name: "Água Mineral",
        code: "1003",
        status: "Ativo",
        supplier: { name: "Fornecedor C" },
        buy_or_production: "Produto de Compra",
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        requested_quantity: "2",
        released_quantity: "2",
        buy_day: "Quarta",
        stock_current: "250",
        stock_min: "100",
        stock_max: "400",
      },
    ],
    request_description: "Descrição da requisição 1",
    status: "pending",
  },
  {
    request_date: new Date(2024, 9, 23),
    request_responsible: "Requisitante 2",
    products: [
      {
        name: "Carne Bovina",
        code: "1002",
        status: "Ativo",
        supplier: { name: "Fornecedor B" },
        buy_or_production: "Produto de Compra",
        buy_unit: {
          description: "Kilograma",
          abbreviation: "KG",
          unitsPerPack: 1,
        },
        requested_quantity: "10",
        released_quantity: "10",
        buy_day: "Terça",
        stock_current: "120",
        stock_min: "30",
        stock_max: "200",
      },
      {
        name: "Carne Moída",
        code: "1006",
        status: "Ativo",
        supplier: { name: "Fornecedor B" },
        buy_or_production: "Produto de Produção",
        parent_product: "Carne Bovina",
        buy_unit: {
          description: "Kilograma",
          abbreviation: "KG",
          unitsPerPack: 1,
        },
        requested_quantity: "20",
        released_quantity: "19",
        buy_day: "Quarta",
        stock_current: "60",
        stock_min: "10",
        stock_max: "100",
      },
    ],
    request_description: "Descrição da requisição 2",
    status: "accepted",
    status_description: "Confirmada parcialmente por motivo x",
    status_date: new Date(2024, 9, 24),
    status_responsible: "Estoquista 1",
  },
  {
    request_date: new Date(2024, 9, 24),
    request_responsible: "Requisitante 3",
    products: [
      {
        name: "Sabão em Pó",
        code: "1004",
        status: "Ativo",
        supplier: { name: "Fornecedor D" },
        buy_or_production: "Produto de Compra",
        buy_unit: {
          description: "Kilograma",
          abbreviation: "KG",
          unitsPerPack: 1,
        },
        requested_quantity: "30",
        released_quantity: "30",
        buy_day: "Quinta",
        stock_current: "80",
        stock_min: "20",
        stock_max: "100",
      },
      {
        name: "Vinho Tinto",
        code: "1005",
        status: "Ativo",
        supplier: { name: "Fornecedor E" },
        buy_or_production: "Produto de Compra",
        buy_unit: {
          description: "Fardo",
          abbreviation: "FRD",
          unitsPerPack: 10,
        },
        requested_quantity: "4",
        released_quantity: "3",
        buy_day: "Sexta",
        stock_current: "150",
        stock_min: "50",
        stock_max: "250",
      },
    ],
    request_description: "Descrição da requisição 3",
    status: "rejected",
    status_description: "Rejeitada por motivo x",
    status_date: new Date(2024, 9, 25),
    status_responsible: "Estoquista 2",
  },
];
