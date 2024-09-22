export type Role = {
  name: string;
  value: string;
};

export type legal_representative = {
  name: string;
  role: Role;
  email: string;
  phone: string;
};

type Supplier = {
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
  legal_representative: legal_representative;
  xmlFilePath: string;
  registered_products: number;
  low_stock_products: number;
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
      name: "Maria Silva",
      role: { name: "Estoquista", value: "Estoquista" },
      email: "maria.silva@fornecedora.com",
      phone: "(11) 91234-5678",
    },
    xmlFilePath: "/caminho/arquivo.xml",
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
      name: "João Pereira",
      role: { name: "Estoquista", value: "Estoquista" },
      email: "joao.martins@technovamatriz.com",
      phone: "(21) 98765-4321",
    },
    xmlFilePath: "/caminho/arquivo2.xml",
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
      name: "João Pereira",
      role: { name: "Requisitante", value: "Requisitante" },
      email: "joao.pereira@technovafilial.com",
      phone: "(21) 98765-4321",
    },
    xmlFilePath: "/caminho/arquivo2.xml",
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
      name: "Carlos Andrade",
      role: { name: "Requisitante", value: "Requisitante" },
      email: "carlos.andrade@quantumdynamics.com",
      phone: "(31) 99876-5432",
    },
    xmlFilePath: "/caminho/arquivo3.xml",
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
      name: "Ana Costa",
      role: { name: "Estoquista", value: "Estoquista" },
      email: "ana.costa@apexmatriz.com",
      phone: "(41) 90987-6543",
    },
    xmlFilePath: "/caminho/arquivo4.xml",
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
      name: "Ana Costa",
      role: { name: "Estoquista", value: "Estoquista" },
      email: "ana.costa@apexfilial.com",
      phone: "(41) 90987-6543",
    },
    xmlFilePath: "/caminho/arquivo4.xml",
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
      name: "Roberto Lima",
      role: { name: "Operador", value: "Operador" },
      email: "roberto.lima@fusionware.com",
      phone: "(51) 99876-1234",
    },
    xmlFilePath: "/caminho/arquivo5.xml",
  },
];
