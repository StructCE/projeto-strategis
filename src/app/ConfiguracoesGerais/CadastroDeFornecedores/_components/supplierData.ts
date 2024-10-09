import { Supplier } from "~/server/interfaces/supplier/supplier.route.interfaces";

export type Role = {
  name: string;
  value: string;
};

export type Contact = {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
};

export const suppliers: { supplier: Supplier; contacts: Contact[] }[] = [
  {
    supplier: {
      name: "Fornecedor A",
      cnpj: "12.345.678/0001-90",
      email: "contato@fornecedora.com",
      phone: "(11) 1234-5678",
      stateRegistration: "1234567890",
      address: "Rua das Flores, 123",
      neighborhood: "Centro",
      city: "São Paulo",
      federativeUnit: "SP",
      cep: "01000-000",
    },
    contacts: [
      {
        name: "Maria Silva",
        role: { name: "Estoquista", value: "Estoquista" },
        email: "maria.silva@fornecedora.com",
        phone: "(11) 91234-5678",
      },
      {
        name: "João Souza",
        role: { name: "Estoquista", value: "Estoquista" },
        email: "joao.souza@fornecedora.com",
        phone: "(11) 98765-4321",
      },
    ],
  },
  {
    supplier: {
      name: "Fornecedor B",
      cnpj: "23.456.789/0001-01",
      email: "vendas@fornecedorb.com",
      phone: "(21) 2345-6789",
      stateRegistration: "2345678901",
      address: "Avenida Brasil, 456",
      neighborhood: "Jardim",
      city: "Rio de Janeiro",
      federativeUnit: "RJ",
      cep: "22000-000",
    },
    contacts: [
      {
        name: "Ana Oliveira",
        role: { name: "Estoquista", value: "Estoquista" },
        email: "ana.oliveira@fornecedorb.com",
        phone: "(21) 91234-5678",
      },
      {
        name: "Carlos Pereira",
        role: { name: "Estoquista", value: "Estoquista" },
        email: "carlos.pereira@fornecedorb.com",
        phone: "(21) 98765-4321",
      },
    ],
  },
  {
    supplier: {
      name: "Fornecedor C",
      cnpj: "34.567.890/0001-12",
      email: "financeiro@fornecedorc.com",
      phone: "(31) 3456-7890",
      stateRegistration: "3456789012",
      address: "Praça da Liberdade, 789",
      neighborhood: "Liberdade",
      city: "Belo Horizonte",
      federativeUnit: "MG",
      cep: "30140-000",
    },
    contacts: [
      {
        name: "Paula Costa",
        role: { name: "Estoquista", value: "Estoquista" },
        email: "paula.costa@fornecedorc.com",
        phone: "(31) 91234-5678",
      },
    ],
  },
  {
    supplier: {
      name: "Fornecedor D",
      cnpj: "45.678.901/0001-23",
      email: "suporte@fornecedord.com",
      phone: "(88) 88888-8888",
      stateRegistration: "4567890123",
      address: "Rua XV de Novembro, 101",
      neighborhood: "Centro Cívico",
      city: "Curitiba",
      federativeUnit: "PR",
      cep: "80010-000",
    },
    contacts: [
      {
        name: "Roberto Lima",
        role: { name: "Estoquista", value: "Estoquista" },
        email: "roberto.lima@fornecedord.com",
        phone: "(41) 98765-4321",
      },
      {
        name: "Fernanda Souza",
        role: { name: "Estoquista", value: "Estoquista" },
        email: "fernanda.souza@fornecedord.com",
        phone: "(41) 91234-5678",
      },
      {
        name: "Pedro Martins",
        role: { name: "Estoquista", value: "Estoquista" },
        email: "pedro.martins@fornecedord.com",
        phone: "(41) 99876-5432",
      },
    ],
  },
  {
    supplier: {
      name: "Fornecedor E",
      cnpj: "56.789.012/0001-34",
      email: "emaildofornecedorabcdefghi@gmail.com",
      phone: "(00) 00000-0000",
      stateRegistration: "5678901234",
      address: "Avenida Ipiranga, 202",
      neighborhood: "Independência",
      city: "Porto Alegre",
      federativeUnit: "RS",
      cep: "90030-000",
    },
    contacts: [
      {
        name: "Ricardo Almeida",
        role: { name: "Estoquista", value: "Estoquista" },
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
