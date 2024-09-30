type suppliers = {
  name: string;
};

type products = {
  name: string;
  code: string;
  supplier_product: string;
  unit: string;
  quantity_unit: number;
  quantity_bale: number;
  price_unit: number;
  total_price: number;
};

type detailsEntry = {
  product: products[];
};

type entryData = {
  invoice: string;
  date_issue: string;
  quantity_products: number;
  isConfirmed?: boolean; // se for true vai aparecer no histórico de entradas
  suppliers: suppliers[];
  details_entry: detailsEntry[];
  manager: string;
};

export const entryData: entryData[] = [
  {
    invoice: "201531",
    date_issue: "14/08/2024",
    quantity_products: 2,
    suppliers: [{ name: "Ambev" }, { name: "Del Vale" }],
    isConfirmed: true,
    manager: "Guilherme",
    details_entry: [
      {
        product: [
          {
            code: "237",
            name: "Água Tônica",
            supplier_product: "Ambev",
            unit: "UND",
            quantity_unit: 58.0,
            quantity_bale: 60.0,
            price_unit: 10.0,
            total_price: 60.0,
          },
          {
            code: "125",
            name: "Água de Coco",
            supplier_product: "Del Vale",
            unit: "CX",
            quantity_unit: 10.0,
            quantity_bale: 50.0,
            price_unit: 20.0,
            total_price: 80.0,
          },
        ],
      },
    ],
  },
  {
    invoice: "201532",
    date_issue: "15/08/2024",
    quantity_products: 3,
    suppliers: [{ name: "Ambev" }, { name: "Coca-Cola" }, { name: "Pepsi" }],
    isConfirmed: false,
    manager: "Maria",
    details_entry: [
      {
        product: [
          {
            code: "365",
            name: "Coca-Cola",
            supplier_product: "Ambev",
            unit: "PCT",
            quantity_unit: 45.0,
            quantity_bale: 100.0,
            price_unit: 5.0,
            total_price: 500.0,
          },
          {
            code: "412",
            name: "Pepsi",
            supplier_product: "Coca-Cola",
            unit: "CX",
            quantity_unit: 20.0,
            quantity_bale: 50.0,
            price_unit: 12.0,
            total_price: 240.0,
          },
          {
            code: "500",
            name: "Fanta Uva",
            supplier_product: "Pepsi",
            unit: "LT",
            quantity_unit: 30.0,
            quantity_bale: 60.0,
            price_unit: 15.0,
            total_price: 450.0,
          },
        ],
      },
    ],
  },
  {
    invoice: "201533",
    date_issue: "16/08/2024",
    quantity_products: 4,
    suppliers: [{ name: "Ambev" }, { name: "Del Vale" }, { name: "Guaraná" }],
    isConfirmed: true,
    manager: "João",
    details_entry: [
      {
        product: [
          {
            code: "987",
            name: "Guaraná Antarctica",
            supplier_product: "Brasil",
            unit: "FRD",
            quantity_unit: 70.0,
            quantity_bale: 80.0,
            price_unit: 7.5,
            total_price: 525.0,
          },
          {
            code: "621",
            name: "Cerveja",
            supplier_product: "Ambev",
            unit: "SC",
            quantity_unit: 30.0,
            quantity_bale: 40.0,
            price_unit: 15.0,
            total_price: 600.0,
          },
          {
            code: "333",
            name: "Suco Del Valle",
            supplier_product: "Del Valle",
            unit: "CX",
            quantity_unit: 50.0,
            quantity_bale: 80.0,
            price_unit: 12.0,
            total_price: 600.0,
          },
          {
            code: "127",
            name: "Água Tônica",
            supplier_product: "Guaraná",
            unit: "UND",
            quantity_unit: 20.0,
            quantity_bale: 25.0,
            price_unit: 10.0,
            total_price: 250.0,
          },
        ],
      },
    ],
  },
  {
    invoice: "201534",
    date_issue: "17/08/2024",
    quantity_products: 5,
    suppliers: [
      { name: "Ambev" },
      { name: "Pepsi" },
      { name: "Del Vale" },
      { name: "Heineken" },
    ],
    isConfirmed: false,
    manager: "Ricardo",
    details_entry: [
      {
        product: [
          {
            code: "741",
            name: "Heineken",
            supplier_product: "Brasil",
            unit: "LT",
            quantity_unit: 50.0,
            quantity_bale: 100.0,
            price_unit: 25.0,
            total_price: 1250.0,
          },
          {
            code: "852",
            name: "Cerveja Brahma",
            supplier_product: "Ambev",
            unit: "KG",
            quantity_unit: 35.0,
            quantity_bale: 75.0,
            price_unit: 18.0,
            total_price: 630.0,
          },
          {
            code: "963",
            name: "Suco Del Valle",
            supplier_product: "Brasil",
            unit: "UND",
            quantity_unit: 20.0,
            quantity_bale: 50.0,
            price_unit: 6.0,
            total_price: 300.0,
          },
          {
            code: "546",
            name: "Cerveja Skol",
            supplier_product: "Ambev",
            unit: "FRD",
            quantity_unit: 60.0,
            quantity_bale: 120.0,
            price_unit: 9.0,
            total_price: 540.0,
          },
          {
            code: "678",
            name: "Coca-Cola",
            supplier_product: "Pepsi",
            unit: "PCT",
            quantity_unit: 25.0,
            quantity_bale: 60.0,
            price_unit: 14.0,
            total_price: 350.0,
          },
        ],
      },
    ],
  },
  {
    invoice: "201535",
    date_issue: "18/08/2024",
    quantity_products: 3,
    suppliers: [{ name: "Del Vale" }, { name: "Guaraná" }],
    isConfirmed: true,
    manager: "Fernanda",
    details_entry: [
      {
        product: [
          {
            code: "963",
            name: "Suco Del Valle",
            supplier_product: "Brasil",
            unit: "UND",
            quantity_unit: 20.0,
            quantity_bale: 50.0,
            price_unit: 6.0,
            total_price: 300.0,
          },
          {
            code: "456",
            name: "Suco de Laranja",
            supplier_product: "Del Valle",
            unit: "PCT",
            quantity_unit: 30.0,
            quantity_bale: 60.0,
            price_unit: 8.0,
            total_price: 480.0,
          },
          {
            code: "789",
            name: "Refrigerante Guaraná",
            supplier_product: "Guaraná",
            unit: "KG",
            quantity_unit: 45.0,
            quantity_bale: 70.0,
            price_unit: 12.0,
            total_price: 540.0,
          },
        ],
      },
    ],
  },
  {
    invoice: "201536",
    date_issue: "19/08/2024",
    quantity_products: 4,
    suppliers: [
      { name: "Ambev" },
      { name: "Coca-Cola" },
      { name: "Pepsi" },
      { name: "Heineken" },
    ],
    isConfirmed: false,
    manager: "Carlos",
    details_entry: [
      {
        product: [
          {
            code: "123",
            name: "Cerveja Skol",
            supplier_product: "Brasil",
            unit: "SC",
            quantity_unit: 40.0,
            quantity_bale: 80.0,
            price_unit: 9.5,
            total_price: 760.0,
          },
          {
            code: "789",
            name: "Refrigerante Fanta",
            supplier_product: "Coca-Cola",
            unit: "LT",
            quantity_unit: 25.0,
            quantity_bale: 50.0,
            price_unit: 12.0,
            total_price: 300.0,
          },
          {
            code: "321",
            name: "Cerveja Heineken",
            supplier_product: "Heineken",
            unit: "PCT",
            quantity_unit: 50.0,
            quantity_bale: 100.0,
            price_unit: 15.0,
            total_price: 750.0,
          },
          {
            code: "654",
            name: "Suco de Uva",
            supplier_product: "Pepsi",
            unit: "CX",
            quantity_unit: 60.0,
            quantity_bale: 90.0,
            price_unit: 18.0,
            total_price: 1080.0,
          },
        ],
      },
    ],
  },
];
