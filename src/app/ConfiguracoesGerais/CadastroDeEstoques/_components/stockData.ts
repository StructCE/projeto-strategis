export type Role = {
  name: string;
  value: string;
};

export type ResponsableStock = {
  name: string;
  role: Role;
  email: string;
  phone: string;
};

export type Stock = {
  code: string;
  name: string;
  company: string;
  responsable_stock: ResponsableStock[];
  stock_address: string;
  zone: string;
  shelf: string;
};

export const stocks: Stock[] = [
  {
    code: "001",
    name: "Cerveja Pilsen",
    company: "Ambev",
    stock_address: "A",
    zone: "Area 4",
    shelf: "Zona 1",
    responsable_stock: [
      {
        name: "Maria Silva",
        role: { name: "Estoquista", value: "Estoquista" },
        email: "maria.silva@fornecedora.com",
        phone: "(11) 91234-5678",
      },
    ],
  },
  {
    code: "002",
    name: "Refrigerante Cola",
    company: "Coca-Cola",
    stock_address: "B",
    zone: "Area 2",
    shelf: "Zona 3",
    responsable_stock: [
      {
        name: "Carlos Pereira",
        role: { name: "Supervisor de Estoque", value: "Supervisor" },
        email: "carlos.pereira@distribuidora.com",
        phone: "(21) 92345-6789",
      },
    ],
  },
  {
    code: "003",
    name: "Água Mineral",
    company: "Nestlé",
    stock_address: "C",
    zone: "Area 1",
    shelf: "Zona 2",
    responsable_stock: [
      {
        name: "Juliana Costa",
        role: { name: "Coordenadora de Estoques", value: "Coordenadora" },
        email: "juliana.costa@fornecedora.com",
        phone: "(31) 98765-4321",
      },
    ],
  },
  {
    code: "004",
    name: "Leite Integral",
    company: "Itambé",
    stock_address: "D",
    zone: "Area 3",
    shelf: "Zona 5",
    responsable_stock: [
      {
        name: "Rafael Souza",
        role: { name: "Gerente de Estoques", value: "Gerente" },
        email: "rafael.souza@logistica.com",
        phone: "(41) 91234-5678",
      },
    ],
  },
  {
    code: "005",
    name: "Achocolatado em Pó",
    company: "Nestlé",
    stock_address: "E",
    zone: "Area 5",
    shelf: "Zona 7",
    responsable_stock: [
      {
        name: "Patricia Oliveira",
        role: { name: "Assistente de Estoque", value: "Assistente" },
        email: "patricia.oliveira@suprimentos.com",
        phone: "(51) 92345-6789",
      },
    ],
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
