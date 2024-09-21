export type Company = {
  name: string;
  value: string;
};

export type StockManager = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

export type Shelf = {
  description: string;
};

export type Storage = {
  description: string;
  shelves: Shelf[];
};

export type Stock = {
  name: string;
  company: Company;
  stock_manager: StockManager;
  address: Storage[];
};

export const stocks: Stock[] = [
  {
    name: "Estoque Bar",
    company: { name: "Alimentos WCW", value: "Alimentos WCW" },
    stock_manager: {
      name: "Maria Silva",
      role: "Estoquista",
      email: "maria.silva@fornecedora.com",
      phone: "(11) 91234-5678",
    },
    address: [
      {
        description: "Armário 1",
        shelves: [
          { description: "Prateleira 1" },
          { description: "Prateleira 2" },
        ],
      },
    ],
  },
  {
    name: "Estoque Cozinha",
    company: { name: "TechNova Filial", value: "TechNova Filial" },
    stock_manager: {
      name: "Carlos Pereira",
      role: "Operador",
      email: "carlos.pereira@distribuidora.com",
      phone: "(21) 92345-6789",
    },
    address: [
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
    name: "Estoque Salão",
    company: { name: "Quantum Dynamics", value: "Quantum Dynamics" },
    stock_manager: {
      name: "Juliana Costa",
      role: "Administrador",
      email: "juliana.costa@fornecedora.com",
      phone: "(31) 98765-4321",
    },
    address: [
      {
        description: "Zona 1",
        shelves: [{ description: "Prateleira 6" }],
      },
    ],
  },
  {
    name: "Estoque Geral",
    company: {
      name: "Apex Innovations Filial",
      value: "Apex Innovations Filial",
    },
    stock_manager: {
      name: "Rafael Souza",
      role: "Operador",
      email: "rafael.souza@logistica.com",
      phone: "(41) 91234-5678",
    },
    address: [
      {
        description: "Zona 2",
        shelves: [
          { description: "Prateleira 7" },
          { description: "Prateleira 8" },
          { description: "Prateleira 9" },
        ],
      },
    ],
  },
  {
    name: "Estoque Padaria",
    company: { name: "FusionWare", value: "FusionWare" },
    stock_manager: {
      name: "Patricia Oliveira",
      role: "Requisitante",
      email: "patricia.oliveira@suprimentos.com",
      phone: "(51) 92345-6789",
    },
    address: [
      {
        description: "Zona 3",
        shelves: [
          { description: "Prateleira 10" },
          { description: "Prateleira 11" },
        ],
      },
    ],
  },
];

export const shelves = [
  { value: "Prateleira 1", label: "Prateleira 1" },
  { value: "Prateleira 2", label: "Prateleira 2" },
  { value: "Prateleira 3", label: "Prateleira 3" },
  { value: "Prateleira 4", label: "Prateleira 4" },
  { value: "Prateleira 5", label: "Prateleira 5" },
  { value: "Prateleira 6", label: "Prateleira 6" },
  { value: "Prateleira 7", label: "Prateleira 7" },
  { value: "Prateleira 8", label: "Prateleira 8" },
  { value: "Prateleira 9", label: "Prateleira 9" },
  { value: "Prateleira 10", label: "Prateleira 10" },
  { value: "Prateleira 11", label: "Prateleira 11" },
  { value: "Prateleira 12", label: "Prateleira 12" },
  { value: "Prateleira 13", label: "Prateleira 13" },
  { value: "Prateleira 14", label: "Prateleira 14" },
  { value: "Prateleira 15", label: "Prateleira 15" },
  { value: "Prateleira 16", label: "Prateleira 16" },
  { value: "Prateleira 17", label: "Prateleira 17" },
  { value: "Prateleira 18", label: "Prateleira 18" },
  { value: "Prateleira 19", label: "Prateleira 19" },
  { value: "Prateleira 20", label: "Prateleira 20" },
  { value: "Prateleira 21", label: "Prateleira 21" },
  { value: "Prateleira 22", label: "Prateleira 22" },
  { value: "Prateleira 23", label: "Prateleira 23" },
  { value: "Prateleira 24", label: "Prateleira 24" },
  { value: "Prateleira 25", label: "Prateleira 25" },
  { value: "Prateleira 26", label: "Prateleira 26" },
  { value: "Prateleira 27", label: "Prateleira 27" },
  { value: "Prateleira 28", label: "Prateleira 28" },
  { value: "Prateleira 29", label: "Prateleira 29" },
  { value: "Prateleira 30", label: "Prateleira 30" },
];
