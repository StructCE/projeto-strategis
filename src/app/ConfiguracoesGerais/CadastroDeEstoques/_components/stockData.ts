export type Role = {
  name: string;
  value: string;
};

export type ResponsibleStock = {
  name: string;
  role: Role;
  email: string;
  phone: string;
};

export type Zone = {
  nameZone: string;
  value: string;
};

export type Shelf = {
  nameShelf: string;
  value: string;
};

export type StockAddress = {
  nameAddress: string;
  value: string;
};

export type Company = {
  nameCompany: string;
  value: string;
};

export type Stock = {
  code: string;
  name: string;
  company: Company;
  responsible_stock: ResponsibleStock;
  stock_address: StockAddress[];
  zone: Zone[];
  shelf: Shelf[];
};

export const stocks: Stock[] = [
  {
    code: "001",
    name: "Cerveja Pilsen",
    company: {
      nameCompany: "TechNova",
      value: "TechNova",
    },
    stock_address: [
      {
        nameAddress: "Estoque Secos",
        value: "Estoque Secos",
      },
    ],
    zone: [
      {
        nameZone: "A001",
        value: "A001",
      },
    ],
    shelf: [
      {
        nameShelf: "P001",
        value: "P001",
      },
    ],
    responsible_stock: {
      name: "Maria Silva",
      role: { name: "Estoquista", value: "Estoquista" },
      email: "maria.silva@fornecedora.com",
      phone: "(11) 91234-5678",
    },
  },
  {
    code: "002",
    name: "Refrigerante Cola",
    company: {
      nameCompany: "Skyline Solutions",
      value: "Skyline Solutions",
    },
    stock_address: [
      {
        nameAddress: "Bar",
        value: "Bar",
      },
    ],
    zone: [
      {
        nameZone: "A002",
        value: "A002",
      },
    ],
    shelf: [
      {
        nameShelf: "P002",
        value: "P002",
      },
    ],
    responsible_stock: {
      name: "Carlos Pereira",
      role: { name: "Operador", value: "Operador" },
      email: "carlos.pereira@distribuidora.com",
      phone: "(21) 92345-6789",
    },
  },
  {
    code: "003",
    name: "Água Mineral",
    company: {
      nameCompany: "Quantum Dynamics",
      value: "Quantum Dynamics",
    },
    stock_address: [
      {
        nameAddress: "Estoque Secos",
        value: "Estoque Secos",
      },
    ],
    zone: [
      {
        nameZone: "A003",
        value: "A003",
      },
    ],
    shelf: [
      {
        nameShelf: "P003",
        value: "P003",
      },
    ],
    responsible_stock: {
      name: "Juliana Costa",
      role: { name: "Administrador", value: "Administrador" },
      email: "juliana.costa@fornecedora.com",
      phone: "(31) 98765-4321",
    },
  },
  {
    code: "004",
    name: "Leite Integral",
    company: {
      nameCompany: "Apex Innovations",
      value: "Apex Innovations",
    },
    stock_address: [
      {
        nameAddress: "Estoque Frio",
        value: "Estoque Frio",
      },
    ],
    zone: [
      {
        nameZone: "A004",
        value: "A004",
      },
    ],
    shelf: [
      {
        nameShelf: "P004",
        value: "P004",
      },
    ],
    responsible_stock: {
      name: "Rafael Souza",
      role: { name: "Operador", value: "Operador" },
      email: "rafael.souza@logistica.com",
      phone: "(41) 91234-5678",
    },
  },
  {
    code: "005",
    name: "Achocolatado em Pó",
    company: {
      nameCompany: "FusionWare",
      value: "FusionWare",
    },
    stock_address: [
      {
        nameAddress: "Estoque Frio",
        value: "Estoque Frio",
      },
    ],
    zone: [
      {
        nameZone: "A005",
        value: "A005",
      },
    ],
    shelf: [
      {
        nameShelf: "P005",
        value: "P005",
      },
    ],
    responsible_stock: {
      name: "Patricia Oliveira",
      role: { name: "Requisitante", value: "Requisitante" },
      email: "patricia.oliveira@suprimentos.com",
      phone: "(51) 92345-6789",
    },
  },
];

export const roles: Role[] = [
  {
    name: "Administrador",
    value: "Administrador",
  },
  {
    name: "Operador",
    value: "Operador",
  },
  {
    name: "Estoquista",
    value: "Estoquista",
  },
  {
    name: "Requisitante",
    value: "Requisitante",
  },
  {
    name: "Personalizado 1",
    value: "Personalizado 1",
  },
];

export const stockCompanies = [
  { nome: "TechNova", value: "TechNova" },
  { nome: "Skyline Solutions", value: "Skyline Solutions" },
  { nome: "Quantum Dynamics", value: "Quantum Dynamics" },
  { nome: "Apex Innovations", value: "Apex Innovations" },
  { nome: "FusionWare", value: "FusionWare" },
];

export const zones = [
  {
    nome: "A001",
    value: "A001",
  },
  {
    nome: "A002",
    value: "A002",
  },
  {
    nome: "A003",
    value: "A003",
  },
  {
    nome: "A004",
    value: "A004",
  },
  {
    nome: "A005",
    value: "A005",
  },
];

export const shelfs = [
  {
    nome: "P001",
    value: "P001",
  },
  {
    nome: "P002",
    value: "P002",
  },
  {
    nome: "P003",
    value: "P003",
  },
  {
    nome: "P004",
    value: "P004",
  },
  {
    nome: "P005",
    value: "P005",
  },
];

export const stocksAddress = [
  {
    nome: "Estoque Secos",
    value: "Estoque Secos",
  },
  {
    nome: "Bar",
    value: "Bar",
  },
  {
    nome: "Estoque Frio",
    value: "Estoque Frio",
  },
];
