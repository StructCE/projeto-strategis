type suppliers = {
  name: string;
};

type detailsEntry = {
  code: string;
  product: string;
  unit: string;
  quantity_unit: number;
  quantity_bale: number;
  price_unit: number;
  total_price: number;
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
    quantity_products: 16,
    suppliers: [{ name: "Brasil" }, { name: "Ambev" }],
    isConfirmed: true,
    manager: "Guilherme",
    details_entry: [
      {
        code: "237",
        product: "Água Tônica",
        unit: "UND",
        quantity_unit: 58.0,
        quantity_bale: 60.0,
        price_unit: 10.0,
        total_price: 60.0,
      },
    ],
  },
  {
    invoice: "201532",
    date_issue: "26/08/2024",
    quantity_products: 20,
    suppliers: [{ name: "Coca-Cola" }, { name: "Nestlé" }],
    isConfirmed: true,
    manager: "Jonatas Silva",
    details_entry: [
      {
        code: "238",
        product: "Refrigerante",
        unit: "UND",
        quantity_unit: 50.0,
        quantity_bale: 50.0,
        price_unit: 5.0,
        total_price: 250.0,
      },
    ],
  },
  {
    invoice: "201533",
    date_issue: "27/08/2024",
    quantity_products: 12,
    isConfirmed: true,
    manager: "Matias",
    suppliers: [
      { name: "Pão de Açúcar" },
      { name: "JBS" },
      { name: "Marfrig" },
    ],
    details_entry: [
      {
        code: "239",
        product: "Carne Bovina",
        unit: "KG",
        quantity_unit: 25.0,
        quantity_bale: 30.0,
        price_unit: 15.0,
        total_price: 450.0,
      },
    ],
  },
  {
    invoice: "201534",
    date_issue: "28/08/2024",
    quantity_products: 30,
    suppliers: [{ name: "Ambev" }],
    isConfirmed: false,
    manager: "Farias Lima",
    details_entry: [
      {
        code: "240",
        product: "Cerveja",
        unit: "CX",
        quantity_unit: 40.0,
        quantity_bale: 40.0,
        price_unit: 8.0,
        total_price: 320.0,
      },
    ],
  },
  {
    invoice: "201535",
    date_issue: "29/08/2024",
    quantity_products: 15,
    isConfirmed: false,
    manager: "Jeff",
    suppliers: [
      { name: "Heinz" },
      { name: "Unilever" },
      { name: "Bunge" },
      { name: "Nestlé" },
    ],
    details_entry: [
      {
        code: "241",
        product: "Ketchup",
        unit: "UND",
        quantity_unit: 75.0,
        quantity_bale: 75.0,
        price_unit: 12.0,
        total_price: 900.0,
      },
    ],
  },
];
