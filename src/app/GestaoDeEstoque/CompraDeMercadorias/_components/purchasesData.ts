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
  buy_unit: Unit;
  buy_quantity: string;
  buy_day: string;
  stock_current: string;
  stock_min: string;
  stock_max: string;
};

export type Purchase = {
  date: Date;
  responsible: string;
  products: Product[];
};

export const purchases: Purchase[] = [
  {
    date: new Date(2024, 9, 22),
    responsible: "Estoquista 1",
    products: [
      {
        name: "Cerveja Pilsen",
        code: "1001",
        status: "Ativo",
        supplier: { name: "Fornecedor A" },
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        buy_quantity: "3",
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
        buy_unit: {
          description: "Pacote",
          abbreviation: "PCT",
          unitsPerPack: 12,
        },
        buy_quantity: "2",
        buy_day: "Quarta",
        stock_current: "250",
        stock_min: "100",
        stock_max: "400",
      },
    ],
  },
  {
    date: new Date(2024, 9, 23),
    responsible: "Estoquista 2",
    products: [
      {
        name: "Carne Bovina",
        code: "1002",
        status: "Ativo",
        supplier: { name: "Fornecedor B" },
        buy_unit: {
          description: "Kilograma",
          abbreviation: "KG",
          unitsPerPack: 1,
        },
        buy_quantity: "10",
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
        parent_product: "Carne Bovina",
        buy_unit: {
          description: "Kilograma",
          abbreviation: "KG",
          unitsPerPack: 1,
        },
        buy_quantity: "20",
        buy_day: "Quarta",
        stock_current: "60",
        stock_min: "10",
        stock_max: "100",
      },
    ],
  },
  {
    date: new Date(2024, 9, 24),
    responsible: "Estoquista 3",
    products: [
      {
        name: "Sabão em Pó",
        code: "1004",
        status: "Ativo",
        supplier: { name: "Fornecedor D" },
        buy_unit: {
          description: "Kilograma",
          abbreviation: "KG",
          unitsPerPack: 1,
        },
        buy_quantity: "30",
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
        buy_unit: {
          description: "Fardo",
          abbreviation: "FRD",
          unitsPerPack: 10,
        },
        buy_quantity: "4",
        buy_day: "Sexta",
        stock_current: "150",
        stock_min: "50",
        stock_max: "250",
      },
    ],
  },
];
