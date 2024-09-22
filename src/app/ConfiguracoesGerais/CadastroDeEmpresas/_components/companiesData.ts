export type Role = {
  name: string;
  value: string;
};

export type LegalRepresentative = {
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
  tipo_empresa: "Matriz" | "Filial";
  matriz_empresa?: { name: string; cnpj: string };
  email: string;
  phone: string;
  endereco: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  inscricao_estadual: string;
  regime_tributario: string;
  legalRepresentative: LegalRepresentative;
  xmlFilePath: string;
  registered_products: number;
  registered_suppliers: number;
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
    tipo_empresa: "Matriz",
    email: "contato@wcwalimentos.com",
    phone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123",
    bairro: "Centro",
    municipio: "São Paulo",
    uf: "SP",
    cep: "01001-000",
    inscricao_estadual: "123456789",
    regime_tributario: "Lucro Real (LR)",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: {
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
    tipo_empresa: "Matriz",
    email: "contato@technovamatriz.com",
    phone: "(21) 91234-5678",
    endereco: "Av. Paulista, 456",
    bairro: "Bela Vista",
    municipio: "São Paulo",
    uf: "SP",
    cep: "01311-200",
    inscricao_estadual: "987654321",
    regime_tributario: "Lucro Presumido (LP)",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: {
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
    tipo_empresa: "Filial",
    matriz_empresa: {
      name: "TechNova Matriz",
      cnpj: "23.456.800/0001-01",
    },
    email: "contato@technovafilial.com",
    phone: "(21) 91234-5678",
    endereco: "Av. Paulista, 457",
    bairro: "Bela Vista",
    municipio: "São Paulo",
    uf: "SP",
    cep: "01311-200",
    inscricao_estadual: "987654321",
    regime_tributario: "Lucro Presumido (LP)",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: {
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
    tipo_empresa: "Matriz",
    email: "contact@quantumdynamics.com",
    phone: "(31) 99876-5432",
    endereco: "Rua dos Andrades, 789",
    bairro: "Savassi",
    municipio: "Belo Horizonte",
    uf: "MG",
    cep: "30140-000",
    inscricao_estadual: "123987456",
    regime_tributario: "Simples Nacional (SN)",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: {
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
    tipo_empresa: "Matriz",
    email: "contato@apexfilial.com",
    phone: "(41) 90987-6543",
    endereco: "Av. do Contorno, 158",
    bairro: "Batel",
    municipio: "Curitiba",
    uf: "PR",
    cep: "80420-000",
    inscricao_estadual: "654321789",
    regime_tributario: "Lucro Real (LR)",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: {
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
    tipo_empresa: "Filial",
    matriz_empresa: {
      name: "Apex Innovations Matriz",
      cnpj: "45.678.900/0001-23",
    },
    email: "contato@apexfilial.com",
    phone: "(41) 90987-6543",
    endereco: "Av. do Contorno, 159",
    bairro: "Batel",
    municipio: "Curitiba",
    uf: "PR",
    cep: "80420-000",
    inscricao_estadual: "654321789",
    regime_tributario: "Lucro Real (LR)",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: {
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
    tipo_empresa: "Matriz",
    email: "support@fusionware.com",
    phone: "(51) 99876-1234",
    endereco: "Av. Ipiranga, 202",
    bairro: "Cidade Baixa",
    municipio: "Porto Alegre",
    uf: "RS",
    cep: "90050-000",
    inscricao_estadual: "987123654",
    regime_tributario: "Lucro Presumido (LP)",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: {
      name: "Roberto Lima",
      role: { name: "Operador", value: "Operador" },
      email: "roberto.lima@fusionware.com",
      phone: "(51) 99876-1234",
    },
    xmlFilePath: "/caminho/arquivo5.xml",
  },
];
