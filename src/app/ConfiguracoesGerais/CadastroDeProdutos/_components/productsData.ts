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

export type Shelf = {
  description: string;
};

export type Storage = {
  description: string;
  shelves?: Shelf[];
};

export type Place = {
  description: string;
  storages?: Storage[];
};

export const Places: Place[] = [
  {
    description: "Local 1",
    storages: [
      {
        description: "Armário 1",
        shelves: [
          { description: "Prateleira 1" },
          { description: "Prateleira 2" },
        ],
      },
      {
        description: "Armário 2",
        shelves: [
          { description: "Prateleira 3" },
          { description: "Prateleira 4" },
          { description: "Prateleira 5" },
        ],
      },
    ],
  },
  {
    description: "Local 2",
    storages: [
      {
        description: "Zona 1",
        shelves: [{ description: "Prateleira 6" }],
      },
    ],
  },
  {
    description: "Local 3",
    storages: [
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
    ],
  },
];

export type Status = {
  description: string;
};

export const status: Status[] = [
  {
    description: "Ativo",
  },
  {
    description: "Inativo",
  },
];

export type Supplier = {
  name: string;
};

export const suppliers: Supplier[] = [
  {
    name: "Fornecedor A",
  },
  {
    name: "Fornecedor B",
  },
  {
    name: "Fornecedor C",
  },
  {
    name: "Fornecedor D",
  },
  {
    name: "Fornecedor E",
  },
  {
    name: "Fornecedor F",
  },
  {
    name: "Fornecedor G",
  },
  {
    name: "Fornecedor H",
  },
  {
    name: "Fornecedor I",
  },
  {
    name: "Fornecedor J",
  },
];

export type WeekDay = {
  day: string;
};

export const weekDays: WeekDay[] = [
  {
    day: "Segunda",
  },
  {
    day: "Terça",
  },
  {
    day: "Quarta",
  },
  {
    day: "Quinta",
  },
  {
    day: "Sexta",
  },
  {
    day: "Sábado",
  },
  {
    day: "Domingo",
  },
  {
    day: "Qualquer dia",
  },
];

export type ProductUnit = {
  unit: string;
};

export const units: ProductUnit[] = [
  { unit: "KG" },
  { unit: "L" },
  { unit: "G" },
  { unit: "ML" },
  { unit: "UN" },
  { unit: "M" },
  { unit: "CM" },
  { unit: "MM" },
  { unit: "PCT" },
  { unit: "CX" },
];

// Verificar como vai ser estruturado o endereço com relação aos parâmetros gerais, não sei se essa é a melhor maneira
export type Address = {
  place: string;
  storage: string;
  shelf: string;
};

export type Product = {
  name: string;
  code: number;
  status: Status;
  suppliers: Supplier[];
  buy_unit: ProductUnit;
  buy_quantity: string;
  buy_day: WeekDay;
  stock_current: string;
  stock_min: string;
  stock_max: string;
  type_of_control: TypeOfControl;
  product_category: ProductCategory;
  sector_of_use: SectorOfUse;
  address: Address;
};

export const products: Product[] = [
  {
    name: "Cerveja Pilsen",
    code: 1001,
    status: { description: "Ativo" },
    suppliers: [
      {
        name: "Fornecedor A",
      },
    ],
    buy_unit: { unit: "KG" },
    buy_quantity: "100",
    buy_day: { day: "Segunda" },
    stock_current: "200",
    stock_min: "50",
    stock_max: "300",
    type_of_control: { description: "Produtos de Bar" },
    product_category: { description: "Bebidas - Cervejas" },
    sector_of_use: { description: "Bar" },
    address: {
      place: "Local 1",
      storage: "Armário 1",
      shelf: "Prateleira 1",
    },
  },
  {
    name: "Carne Bovina",
    code: 1002,
    status: { description: "Ativo" },
    suppliers: [
      {
        name: "Fornecedor B",
      },
    ],
    buy_unit: { unit: "KG" },
    buy_quantity: "50",
    buy_day: { day: "Terça" },
    stock_current: "120",
    stock_min: "30",
    stock_max: "200",
    type_of_control: { description: "Produtos de Produção" },
    product_category: { description: "Carnes - In Natura" },
    sector_of_use: { description: "Cozinha" },
    address: {
      place: "Local 2",
      storage: "Armário 2",
      shelf: "Prateleira 2",
    },
  },
  {
    name: "Água Mineral",
    code: 1003,
    status: { description: "Ativo" },
    suppliers: [
      {
        name: "Fornecedor C",
      },
    ],
    buy_unit: { unit: "KG" },
    buy_quantity: "200",
    buy_day: { day: "Quarta" },
    stock_current: "250",
    stock_min: "100",
    stock_max: "400",
    type_of_control: { description: "Produtos de Bar" },
    product_category: { description: "Bebidas - Águas" },
    sector_of_use: { description: "Bar" },
    address: {
      place: "Local 3",
      storage: "Armário 3",
      shelf: "Prateleira 3",
    },
  },
  {
    name: "Sabão em Pó",
    code: 1004,
    status: { description: "Ativo" },
    suppliers: [
      {
        name: "Fornecedor D",
      },
    ],
    buy_unit: { unit: "KG" },
    buy_quantity: "30",
    buy_day: { day: "Quinta" },
    stock_current: "80",
    stock_min: "20",
    stock_max: "100",
    type_of_control: { description: "Produtos de Limpeza" },
    product_category: { description: "Produtos - Limpeza" },
    sector_of_use: { description: "Serviços Gerais" },
    address: {
      place: "Local 4",
      storage: "Armário 4",
      shelf: "Prateleira 4",
    },
  },
  {
    name: "Vinho Tinto",
    code: 1005,
    status: { description: "Ativo" },
    suppliers: [
      {
        name: "Fornecedor E",
      },
    ],
    buy_unit: { unit: "KG" },
    buy_quantity: "120",
    buy_day: { day: "Sexta" },
    stock_current: "150",
    stock_min: "50",
    stock_max: "250",
    type_of_control: { description: "Produtos de Bar" },
    product_category: { description: "Bebidas - Vinho" },
    sector_of_use: { description: "Bar" },
    address: {
      place: "Local 5",
      storage: "Armário 5",
      shelf: "Prateleira 5",
    },
  },
];

// export const products: Product[] = [
//   {
//     name: "Cerveja Pilsen",
//     code: 1001,
//     status: { description: "Ativo" },
//     suppliers: [{ name: "Fornecedor A" }, { name: "Fornecedor B" }],
//     buy_unit: { unit: "L" },
//     buy_quantity: "500",
//     buy_day: { day: "Segunda" },
//     stock_current: "300",
//     stock_min: "100",
//     stock_max: "600",
//     type_of_control: { description: "Produtos de Bar" },
//     product_category: { description: "Bebidas - Cervejas" },
//     sector_of_use: { description: "Bar" },
//     place: {
//       description: "Local 1",
//       storages: [
//         {
//           description: "Armário 1",
//           shelves: [{ description: "Prateleira 1" }],
//         },
//       ],
//     },
//   },
//   {
//     name: "Carne Bovina",
//     code: 1002,
//     status: { description: "Ativo" },
//     suppliers: [{ name: "Fornecedor C" }],
//     buy_unit: { unit: "KG" },
//     buy_quantity: "1000",
//     buy_day: { day: "Quarta" },
//     stock_current: "500",
//     stock_min: "200",
//     stock_max: "1200",
//     type_of_control: { description: "Carnes - In Natura" },
//     product_category: { description: "Carnes" },
//     sector_of_use: { description: "Cozinha" },
//     place: {
//       description: "Local 2",
//       storages: [
//         {
//           description: "Armário 2",
//           shelves: [{ description: "Prateleira 2" }],
//         },
//       ],
//     },
//   },
//   {
//     name: "Detergente Líquido",
//     code: 1003,
//     status: { description: "Ativo" },
//     suppliers: [{ name: "Fornecedor D" }, { name: "Fornecedor E" }],
//     buy_unit: { unit: "L" },
//     buy_quantity: "200",
//     buy_day: { day: "Qualquer dia" },
//     stock_current: "150",
//     stock_min: "50",
//     stock_max: "300",
//     type_of_control: { description: "Produtos de Limpeza" },
//     product_category: { description: "Produtos - Limpeza" },
//     sector_of_use: { description: "Serviços Gerais" },
//     place: {
//       description: "Local 3",
//       storages: [
//         {
//           description: "Armário 3",
//           shelves: [{ description: "Prateleira 3" }],
//         },
//       ],
//     },
//   },
//   {
//     name: "Queijo Parmesão",
//     code: 1004,
//     status: { description: "Ativo" },
//     suppliers: [{ name: "Fornecedor F" }],
//     buy_unit: { unit: "KG" },
//     buy_quantity: "50",
//     buy_day: { day: "Sexta" },
//     stock_current: "25",
//     stock_min: "10",
//     stock_max: "60",
//     type_of_control: { description: "Queijos" },
//     product_category: { description: "Queijos" },
//     sector_of_use: { description: "Finalização" },
//     place: {
//       description: "Local 4",
//       storages: [
//         {
//           description: "Armário 4",
//           shelves: [{ description: "Prateleira 4" }],
//         },
//       ],
//     },
//   },
//   {
//     name: "Água Mineral",
//     code: 1005,
//     status: { description: "Ativo" },
//     suppliers: [{ name: "Fornecedor G" }, { name: "Fornecedor H" }],
//     buy_unit: { unit: "L" },
//     buy_quantity: "1000",
//     buy_day: { day: "Terça" },
//     stock_current: "800",
//     stock_min: "200",
//     stock_max: "1500",
//     type_of_control: { description: "Produtos de Bar" },
//     product_category: { description: "Bebidas - Águas" },
//     sector_of_use: { description: "Bar" },
//     place: {
//       description: "Local 5",
//       storages: [
//         {
//           description: "Armário 5",
//           shelves: [{ description: "Prateleira 5" }],
//         },
//       ],
//     },
//   },
// ];
