import { type User } from "~/components/navbar/_components/userData";

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

// Verificar como vai ser estruturado o endereço com relação aos parâmetros gerais, não sei se essa é a melhor maneira
export type Address = {
  stock: string;
  storage: string;
  shelf: string;
};

export type Product = {
  name: string;
  code: string;
  suppliers: Supplier[];
  status: string;
  parent_product?: string;
  buy_or_production: string;
  buy_unit: Unit;
  buy_quantity: string;
  buy_day: string;
  stock_current: string;
  stock_min: string;
  stock_max: string;
  type_of_control: TypeOfControl;
  product_category: ProductCategory;
  sector_of_use: SectorOfUse;
  address: Address;
  permission?: User[];
};

export const products: Product[] = [
  {
    name: "Cerveja Pilsen",
    code: "1001",
    status: "Ativo",
    suppliers: [
      { name: "Fornecedor A" },
      { name: "Fornecedor B" },
      { name: "Fornecedor C" },
    ],
    buy_or_production: "Produto de Compra",
    buy_unit: { description: "Pacote", abbreviation: "PCT", unitsPerPack: 12 },
    buy_quantity: "100",
    buy_day: "Segunda",
    stock_current: "200",
    stock_min: "50",
    stock_max: "300",
    type_of_control: { description: "Produtos de Bar" },
    product_category: { description: "Bebidas - Cervejas" },
    sector_of_use: { description: "Bar" },
    address: {
      stock: "Estoque Bar",
      storage: "Armário 1",
      shelf: "Prateleira 1",
    },
    permission: [
      {
        name: "Usuário 1",
        role: "Requisitante",
        company: "Alimentos WCW",
        phone: "(61) 99999-9999",
      },
      {
        name: "Usuário 3",
        role: "Requisitante",
        company: "TechNova Matriz",
        phone: "(61) 99999-9999",
      },
    ],
  },
  {
    name: "Carne Bovina",
    code: "1002",
    status: "Ativo",
    suppliers: [{ name: "Fornecedor B" }, { name: "Fornecedor C" }],
    buy_or_production: "Produto de Compra",
    buy_unit: { description: "Kilograma", abbreviation: "KG", unitsPerPack: 1 },
    buy_quantity: "50",
    buy_day: "Terça",
    stock_current: "120",
    stock_min: "30",
    stock_max: "200",
    type_of_control: { description: "Produtos de Produção" },
    product_category: { description: "Carnes - In Natura" },
    sector_of_use: { description: "Cozinha" },
    address: {
      stock: "Estoque Cozinha",
      storage: "Armário 2",
      shelf: "Prateleira 3",
    },
    permission: [
      {
        name: "Usuário 2",
        role: "Requisitante",
        company: "Alimentos WCW",
        phone: "(61) 99999-9999",
      },
    ],
  },
  {
    name: "Carne Moída",
    code: "1006",
    status: "Ativo",
    suppliers: [{ name: "Fornecedor B" }],
    buy_or_production: "Produto de Produção",
    parent_product: "Carne Bovina",
    buy_unit: { description: "Kilograma", abbreviation: "KG", unitsPerPack: 1 },
    buy_quantity: "20",
    buy_day: "Quarta",
    stock_current: "60",
    stock_min: "10",
    stock_max: "100",
    type_of_control: { description: "Produtos de Produção" },
    product_category: { description: "Carnes - Processadas" },
    sector_of_use: { description: "Cozinha" },
    address: {
      stock: "Estoque Cozinha",
      storage: "Armário 2",
      shelf: "Prateleira 4",
    },
    permission: [
      {
        name: "Usuário 2",
        role: "Requisitante",
        company: "Alimentos WCW",
        phone: "(61) 99999-9999",
      },
    ],
  },
  {
    name: "Água Mineral",
    code: "1003",
    status: "Ativo",
    suppliers: [{ name: "Fornecedor C" }, { name: "Fornecedor D" }],
    buy_or_production: "Produto de Compra",
    buy_unit: { description: "Pacote", abbreviation: "PCT", unitsPerPack: 12 },
    buy_quantity: "200",
    buy_day: "Quarta",
    stock_current: "250",
    stock_min: "100",
    stock_max: "400",
    type_of_control: { description: "Produtos de Bar" },
    product_category: { description: "Bebidas - Águas" },
    sector_of_use: { description: "Bar" },
    address: {
      stock: "Estoque Salão",
      storage: "Zona 1",
      shelf: "Prateleira 6",
    },
    permission: [
      {
        name: "Usuário 1",
        role: "Requisitante",
        company: "Alimentos WCW",
        phone: "(61) 99999-9999",
      },
      {
        name: "Usuário 4",
        role: "Requisitante",
        company: "TechNova Filial",
        phone: "(61) 99999-9999",
      },
    ],
  },
  {
    name: "Sabão em Pó",
    code: "1004",
    status: "Ativo",
    suppliers: [{ name: "Fornecedor D" }],
    buy_or_production: "Produto de Compra",
    buy_unit: { description: "Kilograma", abbreviation: "KG", unitsPerPack: 1 },
    buy_quantity: "30",
    buy_day: "Quinta",
    stock_current: "80",
    stock_min: "20",
    stock_max: "100",
    type_of_control: { description: "Produtos de Limpeza" },
    product_category: { description: "Produtos - Limpeza" },
    sector_of_use: { description: "Serviços Gerais" },
    address: {
      stock: "Estoque Geral",
      storage: "Zona 2",
      shelf: "Prateleira 7",
    },
    permission: [
      {
        name: "Usuário 2",
        role: "Requisitante",
        company: "Alimentos WCW",
        phone: "(61) 99999-9999",
      },
    ],
  },
  {
    name: "Vinho Tinto",
    code: "1005",
    status: "Ativo",
    suppliers: [{ name: "Fornecedor E" }],
    buy_or_production: "Produto de Compra",
    buy_unit: { description: "Fardo", abbreviation: "FRD", unitsPerPack: 10 },
    buy_quantity: "120",
    buy_day: "Sexta",
    stock_current: "150",
    stock_min: "50",
    stock_max: "250",
    type_of_control: { description: "Produtos de Bar" },
    product_category: { description: "Bebidas - Vinho" },
    sector_of_use: { description: "Bar" },
    address: {
      stock: "Estoque Padaria",
      storage: "Zona 3",
      shelf: "Prateleira 10",
    },
    permission: [
      {
        name: "Usuário 1",
        role: "Requisitante",
        company: "Alimentos WCW",
        phone: "(61) 99999-9999",
      },
    ],
  },
  {
    name: "Vodka Orloff",
    code: "1006",
    status: "Ativo",
    suppliers: [{ name: "Fornecedor C" }, { name: "Fornecedor E" }],
    buy_or_production: "Produto de Compra",
    buy_unit: { description: "Unidade", abbreviation: "UN", unitsPerPack: 1 },
    buy_quantity: "4",
    buy_day: "Sexta",
    stock_current: "11",
    stock_min: "10",
    stock_max: "40",
    type_of_control: { description: "Produtos de Bar" },
    product_category: { description: "Bebidas - Destilados" },
    sector_of_use: { description: "Bar" },
    address: {
      stock: "Estoque Bar",
      storage: "Armário 1",
      shelf: "Prateleira 2",
    },
    permission: [
      {
        name: "Usuário 1",
        role: "Requisitante",
        company: "Alimentos WCW",
        phone: "(61) 99999-9999",
      },
    ],
  },
  {
    name: "Arroz Branco",
    code: "1007",
    status: "Ativo",
    suppliers: [
      { name: "Fornecedor A" },
      { name: "Fornecedor C" },
      { name: "Fornecedor D" },
    ],
    buy_or_production: "Produto de Compra",
    buy_unit: { description: "Kilograma", abbreviation: "KG", unitsPerPack: 1 },
    buy_quantity: "10",
    buy_day: "Sexta",
    stock_current: "0",
    stock_min: "10",
    stock_max: "30",
    type_of_control: { description: "Produtos de Bar" },
    product_category: { description: "Bebidas - Vinho" },
    sector_of_use: { description: "Bar" },
    address: {
      stock: "Estoque Padaria",
      storage: "Zona 3",
      shelf: "Prateleira 10",
    },
    permission: [
      {
        name: "Usuário 2",
        role: "Requisitante",
        company: "Alimentos WCW",
        phone: "(61) 99999-9999",
      },
    ],
  },
];
