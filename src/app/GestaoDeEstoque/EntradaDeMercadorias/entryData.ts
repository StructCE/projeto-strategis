type Supplier = {
  name: string;
};

type Product = {
  name: string;
  code: string;
  supplier_product: string;
  unit: string;
  quantity_unit: number;
  quantity_bale: number;
  price_unit: number;
  total_price: number;
};

export type Entry = {
  invoice: string;
  date_issue: Date;
  quantity_products: number;
  status: "Confirmada" | "Em Aberto";
  suppliers: Supplier[];
  products: Product[];
  manager: string;
};

export const entries: Entry[] = [
  {
    invoice: "201531",
    date_issue: new Date(2024, 8, 14),
    quantity_products: 2,
    suppliers: [{ name: "Fornecedor A" }, { name: "Fornecedor E" }],
    status: "Confirmada",
    manager: "Nome do Usuário 2",
    products: [
      {
        code: "237",
        name: "Água Tônica",
        supplier_product: "Fornecedor A",
        unit: "UND",
        quantity_unit: 58.0,
        quantity_bale: 60.0,
        price_unit: 10.0,
        total_price: 60.0,
      },
      {
        code: "125",
        name: "Água de Coco",
        supplier_product: "Fornecedor E",
        unit: "CX",
        quantity_unit: 10.0,
        quantity_bale: 50.0,
        price_unit: 20.0,
        total_price: 80.0,
      },
    ],
  },
  {
    invoice: "201532",
    date_issue: new Date(2024, 8, 15),
    quantity_products: 3,
    suppliers: [
      { name: "Fornecedor A" },
      { name: "Fornecedor F" },
      { name: "Fornecedor C" },
    ],
    status: "Em Aberto",
    manager: "Nome do Usuário 5",
    products: [
      {
        code: "365",
        name: "Fornecedor F",
        supplier_product: "Fornecedor A",
        unit: "PCT",
        quantity_unit: 45.0,
        quantity_bale: 100.0,
        price_unit: 5.0,
        total_price: 500.0,
      },
      {
        code: "412",
        name: "Fornecedor C",
        supplier_product: "Fornecedor F",
        unit: "CX",
        quantity_unit: 20.0,
        quantity_bale: 50.0,
        price_unit: 12.0,
        total_price: 240.0,
      },
      {
        code: "500",
        name: "Fanta Uva",
        supplier_product: "Fornecedor C",
        unit: "LT",
        quantity_unit: 30.0,
        quantity_bale: 60.0,
        price_unit: 15.0,
        total_price: 450.0,
      },
    ],
  },
  {
    invoice: "201533",
    date_issue: new Date(2024, 8, 16),
    quantity_products: 4,
    suppliers: [
      { name: "Fornecedor A" },
      { name: "Fornecedor E" },
      { name: "Fornecedor D" },
    ],
    status: "Confirmada",
    manager: "Nome do Usuário 1",
    products: [
      {
        code: "987",
        name: "Fornecedor D Antarctica",
        supplier_product: "Fornecedor B",
        unit: "FRD",
        quantity_unit: 70.0,
        quantity_bale: 80.0,
        price_unit: 7.5,
        total_price: 525.0,
      },
      {
        code: "621",
        name: "Cerveja",
        supplier_product: "Fornecedor A",
        unit: "SC",
        quantity_unit: 30.0,
        quantity_bale: 40.0,
        price_unit: 15.0,
        total_price: 600.0,
      },
      {
        code: "333",
        name: "Suco Del Valle",
        supplier_product: "Fornecedor E",
        unit: "CX",
        quantity_unit: 50.0,
        quantity_bale: 80.0,
        price_unit: 12.0,
        total_price: 600.0,
      },
      {
        code: "127",
        name: "Água Tônica",
        supplier_product: "Fornecedor D",
        unit: "UND",
        quantity_unit: 20.0,
        quantity_bale: 25.0,
        price_unit: 10.0,
        total_price: 250.0,
      },
    ],
  },
  {
    invoice: "201534",
    date_issue: new Date(2024, 8, 17),
    quantity_products: 5,
    suppliers: [
      { name: "Fornecedor A" },
      { name: "Fornecedor C" },
      { name: "Fornecedor E" },
      { name: "Fornecedor E" },
    ],
    status: "Em Aberto",
    manager: "Nome do Usuário 2",
    products: [
      {
        code: "741",
        name: "Heineken",
        supplier_product: "Fornecedor B",
        unit: "LT",
        quantity_unit: 50.0,
        quantity_bale: 100.0,
        price_unit: 25.0,
        total_price: 1250.0,
      },
      {
        code: "852",
        name: "Cerveja Brahma",
        supplier_product: "Fornecedor A",
        unit: "KG",
        quantity_unit: 35.0,
        quantity_bale: 75.0,
        price_unit: 18.0,
        total_price: 630.0,
      },
      {
        code: "963",
        name: "Suco Del Valle",
        supplier_product: "Fornecedor B",
        unit: "UND",
        quantity_unit: 20.0,
        quantity_bale: 50.0,
        price_unit: 6.0,
        total_price: 300.0,
      },
      {
        code: "546",
        name: "Cerveja Skol",
        supplier_product: "Fornecedor A",
        unit: "FRD",
        quantity_unit: 60.0,
        quantity_bale: 120.0,
        price_unit: 9.0,
        total_price: 540.0,
      },
      {
        code: "678",
        name: "Fornecedor F",
        supplier_product: "Fornecedor C",
        unit: "PCT",
        quantity_unit: 25.0,
        quantity_bale: 60.0,
        price_unit: 14.0,
        total_price: 350.0,
      },
    ],
  },
  {
    invoice: "201535",
    date_issue: new Date(2024, 8, 18),
    quantity_products: 3,
    suppliers: [{ name: "Fornecedor E" }, { name: "Fornecedor D" }],
    status: "Confirmada",
    manager: "Nome do Usuário 4",
    products: [
      {
        code: "963",
        name: "Suco Del Valle",
        supplier_product: "Fornecedor B",
        unit: "UND",
        quantity_unit: 20.0,
        quantity_bale: 50.0,
        price_unit: 6.0,
        total_price: 300.0,
      },
      {
        code: "456",
        name: "Suco de Laranja",
        supplier_product: "Fornecedor E",
        unit: "PCT",
        quantity_unit: 30.0,
        quantity_bale: 60.0,
        price_unit: 8.0,
        total_price: 480.0,
      },
      {
        code: "789",
        name: "Refrigerante Fornecedor D",
        supplier_product: "Fornecedor D",
        unit: "KG",
        quantity_unit: 45.0,
        quantity_bale: 70.0,
        price_unit: 12.0,
        total_price: 540.0,
      },
    ],
  },
  {
    invoice: "201536",
    date_issue: new Date(2024, 8, 19),
    quantity_products: 4,
    suppliers: [
      { name: "Fornecedor A" },
      { name: "Fornecedor F" },
      { name: "Fornecedor C" },
      { name: "Fornecedor E" },
    ],
    status: "Em Aberto",
    manager: "Nome do Usuário 3",
    products: [
      {
        code: "123",
        name: "Cerveja Skol",
        supplier_product: "Fornecedor B",
        unit: "SC",
        quantity_unit: 40.0,
        quantity_bale: 80.0,
        price_unit: 9.5,
        total_price: 760.0,
      },
      {
        code: "789",
        name: "Refrigerante Fanta",
        supplier_product: "Fornecedor F",
        unit: "LT",
        quantity_unit: 25.0,
        quantity_bale: 50.0,
        price_unit: 12.0,
        total_price: 300.0,
      },
      {
        code: "321",
        name: "Cerveja Heineken",
        supplier_product: "Fornecedor F",
        unit: "PCT",
        quantity_unit: 50.0,
        quantity_bale: 100.0,
        price_unit: 15.0,
        total_price: 750.0,
      },
      {
        code: "654",
        name: "Suco de Uva",
        supplier_product: "Fornecedor C",
        unit: "CX",
        quantity_unit: 60.0,
        quantity_bale: 90.0,
        price_unit: 18.0,
        total_price: 1080.0,
      },
    ],
  },
];
