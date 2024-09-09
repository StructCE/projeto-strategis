export type Company = {
  nome: string;
  uf: string;
  tributo: string;
};

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

export type Companies = {
  empresa: string;
  cnpj: string;
  tipo_empresa: "Matriz" | "Filial";
  matriz_empresa?: MatrizEmpresa[]; // Mostrado quando tipo_empresa é "Matriz"
  filial_empresa?: FilialEmpresa[]; // Mostrado quando tipo_empresa é "Filial"
  email: string;
  phone: string;
  endereco: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  inscricao_estadual: string;
  regime_tributario: string;
  legalRepresentative: LegalRepresentative[];
  xmlFilePath: string;
  registered_products: number;
  registered_suppliers: number;
  low_stock_products: number;
};

export const TipoEmpresa = [
  {
    nome: "Matriz",
    value: "Matriz",
  },
  {
    nome: "Filial",
    value: "Filial",
  },
];

export type MatrizEmpresa = {
  nome: string;
  value: string;
};

export type FilialEmpresa = {
  nome: string;
  value: string;
};

export const EmpresaMatriz: MatrizEmpresa[] = [
  { nome: "TechNova", value: "1" },
  { nome: "Skyline Solutions", value: "2" },
  { nome: "Quantum Dynamics", value: "3" },
  { nome: "Apex Innovations", value: "4" },
  { nome: "FusionWare", value: "5" },
];

export const EmpresaFilial: FilialEmpresa[] = [
  { nome: "TechNova", value: "1" },
  { nome: "Skyline Solutions", value: "2" },
  { nome: "Quantum Dynamics", value: "3" },
  { nome: "Apex Innovations", value: "4" },
  { nome: "FusionWare", value: "5" },
];

export const companies: Companies[] = [
  {
    empresa: "Alimentos WCW",
    cnpj: "12.345.678/0001-90",
    tipo_empresa: "Matriz",
    matriz_empresa: EmpresaMatriz,
    email: "contato@wcwalimentos.com",
    phone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123",
    bairro: "Centro",
    municipio: "São Paulo",
    uf: "SP",
    cep: "01001-000",
    inscricao_estadual: "123456789",
    regime_tributario: "LR",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: [
      {
        name: "Maria Silva",
        role: { name: "Estoquista", value: "Estoquista" },
        email: "maria.silva@fornecedora.com",
        phone: "(11) 91234-5678",
      },
    ],
    xmlFilePath: "/caminho/arquivo.xml",
  },
  {
    empresa: "TechNova Filial",
    cnpj: "23.456.789/0001-01",
    tipo_empresa: "Filial",
    filial_empresa: EmpresaFilial,
    email: "contato@technovafilial.com",
    phone: "(21) 91234-5678",
    endereco: "Av. Paulista, 456",
    bairro: "Bela Vista",
    municipio: "São Paulo",
    uf: "SP",
    cep: "01311-200",
    inscricao_estadual: "987654321",
    regime_tributario: "LP",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: [
      {
        name: "João Pereira",
        role: { name: "Gerente", value: "Gerente" },
        email: "joao.pereira@technovafilial.com",
        phone: "(21) 98765-4321",
      },
    ],
    xmlFilePath: "/caminho/arquivo2.xml",
  },
  {
    empresa: "Quantum Dynamics",
    cnpj: "34.567.890/0001-12",
    tipo_empresa: "Matriz",
    matriz_empresa: EmpresaMatriz,
    email: "contact@quantumdynamics.com",
    phone: "(31) 99876-5432",
    endereco: "Rua dos Andrades, 789",
    bairro: "Savassi",
    municipio: "Belo Horizonte",
    uf: "MG",
    cep: "30140-000",
    inscricao_estadual: "123987456",
    regime_tributario: "SN",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: [
      {
        name: "Carlos Andrade",
        role: { name: "Diretor", value: "Diretor" },
        email: "carlos.andrade@quantumdynamics.com",
        phone: "(31) 99876-5432",
      },
    ],
    xmlFilePath: "/caminho/arquivo3.xml",
  },
  {
    empresa: "Apex Innovations Filial",
    cnpj: "45.678.901/0001-23",
    tipo_empresa: "Filial",
    filial_empresa: EmpresaFilial,
    email: "contato@apexfilial.com",
    phone: "(41) 90987-6543",
    endereco: "Av. do Contorno, 159",
    bairro: "Batel",
    municipio: "Curitiba",
    uf: "PR",
    cep: "80420-000",
    inscricao_estadual: "654321789",
    regime_tributario: "LR",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: [
      {
        name: "Ana Costa",
        role: { name: "Supervisor", value: "Supervisor" },
        email: "ana.costa@apexfilial.com",
        phone: "(41) 90987-6543",
      },
    ],
    xmlFilePath: "/caminho/arquivo4.xml",
  },
  {
    empresa: "FusionWare",
    cnpj: "56.789.012/0001-34",
    tipo_empresa: "Matriz",
    matriz_empresa: EmpresaMatriz,
    email: "support@fusionware.com",
    phone: "(51) 99876-1234",
    endereco: "Av. Ipiranga, 202",
    bairro: "Cidade Baixa",
    municipio: "Porto Alegre",
    uf: "RS",
    cep: "90050-000",
    inscricao_estadual: "987123654",
    regime_tributario: "LP",
    registered_products: 10,
    registered_suppliers: 15,
    low_stock_products: 10,
    legalRepresentative: [
      {
        name: "Roberto Lima",
        role: { name: "Coordenador", value: "Coordenador" },
        email: "roberto.lima@fusionware.com",
        phone: "(51) 99876-1234",
      },
    ],
    xmlFilePath: "/caminho/arquivo5.xml",
  },
];

export const RegimeTribuario = [
  {
    tributo: "LR",
    value: "LR",
  },
  {
    tributo: "LP",
    value: "LP",
  },
  {
    tributo: "SN",
    value: "SN",
  },
];
