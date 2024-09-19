export type User = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  roleId: number;
  role: string;
  company: string;
};

export const users = [
  {
    name: "Nome do Usuário 1",
    email: "usuario1@gmail.com",
    empresa: "Alimentos WCW",
    cargo: "Administrador",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 1,
  },
  {
    name: "Nome do Usuário 2",
    email: "usuario2@gmail.com",
    empresa: "TechNova Filial",
    cargo: "Operador",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 2,
  },
  {
    name: "Nome do Usuário 3",
    email: "usuario3@gmail.com",
    empresa: "Quantum Dynamics",
    cargo: "Estoquista",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 3,
  },
  {
    name: "Nome do Usuário 4",
    email: "usuario4@gmail.com",
    empresa: "Apex Innovations Filial",
    cargo: "Requisitante",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 4,
  },
  {
    nome: "Nome do Usuário 5",
    email: "usuario5@gmail.com",
    empresa: "Alimentos WCW",
    cargo: "Requisitante",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 4,
  },
];

export const companies = [
  {
    nome: "Alimentos WCW",
    value: "Alimentos WCW",
  },
  {
    nome: "TechNova Filial",
    value: "TechNova Filial",
  },
  {
    nome: "Quantum Dynamics",
    value: "Quantum Dynamics",
  },
  {
    nome: "Apex Innovations Filial",
    value: "Apex Innovations Filial",
  },
  {
    nome: "FusionWare",
    value: "FusionWare",
  },
];

export const roles = [
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
