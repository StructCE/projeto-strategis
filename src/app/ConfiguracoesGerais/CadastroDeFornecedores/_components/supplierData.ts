export type Role = {
  name: string;
  value: string;
};

export type Contact = {
  name: string;
  email: string;
  phone: string;
};

export type Supplier = {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  state_registration: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  contacts: Contact[];
};

export const suppliers: Supplier[] = [
  {
    name: "Fornecedor A",
    cnpj: "12.345.678/0001-90",
    email: "contato@fornecedora.com",
    phone: "(11) 1234-5678",
    state_registration: "1234567890",
    address: "Rua das Flores, 123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    cep: "01000-000",
    contacts: [
      {
        name: "Maria Silva",
        email: "maria.silva@fornecedora.com",
        phone: "(11) 91234-5678",
      },
      {
        name: "João Souza",
        email: "joao.souza@fornecedora.com",
        phone: "(11) 98765-4321",
      },
    ],
  },
  {
    name: "Fornecedor B",
    cnpj: "23.456.789/0001-01",
    email: "vendas@fornecedorb.com",
    phone: "(21) 2345-6789",
    state_registration: "2345678901",
    address: "Avenida Brasil, 456",
    neighborhood: "Jardim",
    city: "Rio de Janeiro",
    state: "RJ",
    cep: "22000-000",
    contacts: [
      {
        name: "Ana Oliveira",
        email: "ana.oliveira@fornecedorb.com",
        phone: "(21) 91234-5678",
      },
      {
        name: "Carlos Pereira",
        email: "carlos.pereira@fornecedorb.com",
        phone: "(21) 98765-4321",
      },
    ],
  },
  {
    name: "Fornecedor C",
    cnpj: "34.567.890/0001-12",
    email: "financeiro@fornecedorc.com",
    phone: "(31) 3456-7890",
    state_registration: "3456789012",
    address: "Praça da Liberdade, 789",
    neighborhood: "Liberdade",
    city: "Belo Horizonte",
    state: "MG",
    cep: "30140-000",
    contacts: [
      {
        name: "Paula Costa",
        email: "paula.costa@fornecedorc.com",
        phone: "(31) 91234-5678",
      },
    ],
  },
  {
    name: "Fornecedor D",
    cnpj: "45.678.901/0001-23",
    email: "suporte@fornecedord.com",
    phone: "(88) 88888-8888",
    state_registration: "4567890123",
    address: "Rua XV de Novembro, 101",
    neighborhood: "Centro Cívico",
    city: "Curitiba",
    state: "PR",
    cep: "80010-000",
    contacts: [
      {
        name: "Roberto Lima",
        email: "roberto.lima@fornecedord.com",
        phone: "(41) 98765-4321",
      },
      {
        name: "Fernanda Souza",
        email: "fernanda.souza@fornecedord.com",
        phone: "(41) 91234-5678",
      },
      {
        name: "Pedro Martins",
        email: "pedro.martins@fornecedord.com",
        phone: "(41) 99876-5432",
      },
    ],
  },
  {
    name: "Fornecedor E",
    cnpj: "56.789.012/0001-34",
    email: "emaildofornecedorabcdefghi@gmail.com",
    phone: "(00) 00000-0000",
    state_registration: "5678901234",
    address: "Avenida Ipiranga, 202",
    neighborhood: "Independência",
    city: "Porto Alegre",
    state: "RS",
    cep: "90030-000",
    contacts: [
      {
        name: "Ricardo Almeida",
        email: "ricardo.almeida@fornecedore.com",
        phone: "(51) 98765-4321",
      },
    ],
  },
];

export const states = [
  { name: "Acre (AC)", value: "AC" },
  { name: "Alagoas (AL)", value: "AL" },
  { name: "Amapá (AP)", value: "AP" },
  { name: "Amazonas (AM)", value: "AM" },
  { name: "Bahia (BA)", value: "BA" },
  { name: "Ceará (CE)", value: "CE" },
  { name: "Distrito Federal (DF)", value: "DF" },
  { name: "Espírito Santo (ES)", value: "ES" },
  { name: "Goiás (GO)", value: "GO" },
  { name: "Maranhão (MA)", value: "MA" },
  { name: "Mato Grosso (MT)", value: "MT" },
  { name: "Mato Grosso do Sul (MS)", value: "MS" },
  { name: "Minas Gerais (MG)", value: "MG" },
  { name: "Pará (PA)", value: "PA" },
  { name: "Paraíba (PB)", value: "PB" },
  { name: "Paraná (PR)", value: "PR" },
  { name: "Pernambuco (PE)", value: "PE" },
  { name: "Piauí (PI)", value: "PI" },
  { name: "Rio de Janeiro (RJ)", value: "RJ" },
  { name: "Rio Grande do Norte (RN)", value: "RN" },
  { name: "Rio Grande do Sul (RS)", value: "RS" },
  { name: "Rondônia (RO)", value: "RO" },
  { name: "Roraima (RR)", value: "RR" },
  { name: "Santa Catarina (SC)", value: "SC" },
  { name: "São Paulo (SP)", value: "SP" },
  { name: "Sergipe (SE)", value: "SE" },
  { name: "Tocantins (TO)", value: "TO" },
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
