export type Role = {
  name: string;
  value: string;
};

type User = {
  name: string;
  email: string;
};

type Supplier = {
  name: string;
};

type Stock = {
  name: string;
};

export type Company = {
  name: string;
  cnpj: string;
  suppliers: Supplier[];
  company_type: "Matriz" | "Filial";
  company_headquarters?: { name: string; cnpj: string };
  email: string;
  phone: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  state_registration: string;
  tax_regime: string;
  legal_representative: User;
  xmlFilePath: string;
  registered_products: number;
  low_stock_products: number;
  stocks: Stock[];
};

export const companies: Company[] = [
  {
    name: "Alimentos WCW",
    cnpj: "12.345.678/0001-90",
    suppliers: [
      { name: "Fornecedor A" },
      { name: "Fornecedor B" },
      { name: "Fornecedor C" },
    ],
    company_type: "Matriz",
    email: "contato@wcwalimentos.com",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    cep: "01001-000",
    state_registration: "123456789",
    tax_regime: "Lucro Real (LR)",
    registered_products: 10,
    low_stock_products: 10,
    legal_representative: {
      name: "Nome do Usuário 1",
      email: "usuario1@gmail.com",
    },
    xmlFilePath: "/caminho/arquivo.xml",
    stocks: [{ name: "Estoque Bar" }, { name: "Estoque Cozinha" }],
  },
  {
    name: "TechNova Matriz",
    cnpj: "23.456.800/0001-01",
    suppliers: [{ name: "Fornecedor A" }],
    company_type: "Matriz",
    email: "contato@technovamatriz.com",
    phone: "(21) 91234-5678",
    address: "Av. Paulista, 456",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    cep: "01311-200",
    state_registration: "987654321",
    tax_regime: "Lucro Presumido (LP)",
    registered_products: 10,
    low_stock_products: 10,
    legal_representative: {
      name: "Nome do Usuário 2",
      email: "usuario2@gmail.com",
    },
    xmlFilePath: "/caminho/arquivo2.xml",
    stocks: [
      { name: "Estoque Bar" },
      { name: "Estoque Cozinha" },
      { name: "Estoque Salão" },
    ],
  },
  {
    name: "TechNova Filial",
    cnpj: "23.456.789/0001-01",
    suppliers: [{ name: "Fornecedor A" }, { name: "Fornecedor B" }],
    company_type: "Filial",
    company_headquarters: {
      name: "TechNova Matriz",
      cnpj: "23.456.800/0001-01",
    },
    email: "contato@technovafilial.com",
    phone: "(21) 91234-5678",
    address: "Av. Paulista, 457",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    cep: "01311-200",
    state_registration: "987654321",
    tax_regime: "Lucro Presumido (LP)",
    registered_products: 10,
    low_stock_products: 10,
    legal_representative: {
      name: "Nome do Usuário 3",
      email: "usuario3@gmail.com",
    },
    xmlFilePath: "/caminho/arquivo2.xml",
    stocks: [
      { name: "Estoque Bar" },
      { name: "Estoque Cozinha" },
      { name: "Estoque Salão" },
    ],
  },
  {
    name: "Quantum Dynamics",
    cnpj: "34.567.890/0001-12",
    suppliers: [{ name: "Fornecedor B" }],
    company_type: "Matriz",
    email: "contact@quantumdynamics.com",
    phone: "(31) 99876-5432",
    address: "Rua dos Andrades, 789",
    neighborhood: "Savassi",
    city: "Belo Horizonte",
    state: "MG",
    cep: "30140-000",
    state_registration: "123987456",
    tax_regime: "Simples Nacional (SN)",
    registered_products: 10,
    low_stock_products: 10,
    legal_representative: {
      name: "Nome do Usuário 4",
      email: "usuario4gmail.com",
    },
    xmlFilePath: "/caminho/arquivo3.xml",
    stocks: [{ name: "Estoque Bar" }, { name: "Estoque Cozinha" }],
  },
  {
    name: "Apex Innovations Matriz",
    cnpj: "45.678.900/0001-23",
    suppliers: [{ name: "Fornecedor B" }],
    company_type: "Matriz",
    email: "contato@apexfilial.com",
    phone: "(41) 90987-6543",
    address: "Av. do Contorno, 158",
    neighborhood: "Batel",
    city: "Curitiba",
    state: "PR",
    cep: "80420-000",
    state_registration: "654321789",
    tax_regime: "Lucro Real (LR)",
    registered_products: 10,
    low_stock_products: 10,
    legal_representative: {
      name: "Nome do Usuário 5",
      email: "usuario5gmail.com",
    },
    xmlFilePath: "/caminho/arquivo4.xml",
    stocks: [{ name: "Estoque Bar" }],
  },
  {
    name: "Apex Innovations Filial",
    cnpj: "45.678.901/0001-23",
    suppliers: [{ name: "Fornecedor B" }],
    company_type: "Filial",
    company_headquarters: {
      name: "Apex Innovations Matriz",
      cnpj: "45.678.900/0001-23",
    },
    email: "contato@apexfilial.com",
    phone: "(41) 90987-6543",
    address: "Av. do Contorno, 159",
    neighborhood: "Batel",
    city: "Curitiba",
    state: "PR",
    cep: "80420-000",
    state_registration: "654321789",
    tax_regime: "Lucro Real (LR)",
    registered_products: 10,
    low_stock_products: 10,
    legal_representative: {
      name: "Nome do Usuário 3",
      email: "usuario3gmail.com",
    },
    xmlFilePath: "/caminho/arquivo4.xml",
    stocks: [
      { name: "Estoque Bar" },
      { name: "Estoque Cozinha" },
      { name: "Estoque Salão" },
    ],
  },
  {
    name: "FusionWare",
    cnpj: "56.789.012/0001-34",
    suppliers: [{ name: "Fornecedor C" }],
    company_type: "Matriz",
    email: "support@fusionware.com",
    phone: "(51) 99876-1234",
    address: "Av. Ipiranga, 202",
    neighborhood: "Cidade Baixa",
    city: "Porto Alegre",
    state: "RS",
    cep: "90050-000",
    state_registration: "987123654",
    tax_regime: "Lucro Presumido (LP)",
    registered_products: 10,
    low_stock_products: 10,
    legal_representative: {
      name: "Nome do Usuário 4",
      email: "usuario4gmail.com",
    },
    xmlFilePath: "/caminho/arquivo5.xml",
    stocks: [
      { name: "Estoque Bar" },
      { name: "Estoque Cozinha" },
      { name: "Estoque Salão" },
    ],
  },
];
