export type User = {
  nome: string;
  email: string;
  senha: string;
  senhaConfirmacao: string;
  telefone: string;
  cargoId: number;
  cargo: string;
  empresa: string;
};

export const Usuarios = [
  {
    nome: "Nome do Usuário 1",
    email: "usuario1@gmail.com",
    empresa: "Empresa 1",
    cargo: "Administrador",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 1,
  },
  {
    nome: "Nome do Usuário 2",
    email: "usuario2@gmail.com",
    empresa: "Empresa 2",
    cargo: "Operador",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 2,
  },
  {
    nome: "Nome do Usuário 3",
    email: "usuario3@gmail.com",
    empresa: "Empresa 3",
    cargo: "Estoquista",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 3,
  },
  {
    nome: "Nome do Usuário 4",
    email: "usuario4@gmail.com",
    empresa: "Empresa 4",
    cargo: "Requisitante",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 4,
  },
];

export const Empresas = [
  {
    nome: "Empresa 1",
    value: "Empresa 1",
  },
  {
    nome: "Empresa 2",
    value: "Empresa 2",
  },
  {
    nome: "Empresa 3",
    value: "Empresa 3",
  },
  {
    nome: "Empresa 4",
    value: "Empresa 4",
  },
  {
    nome: "Empresa 5",
    value: "Empresa 5",
  },
];

export const Cargos = [
  {
    nome: "Administrador",
    value: "Administrador",
  },
  {
    nome: "Operador",
    value: "Operador",
  },
  {
    nome: "Estoquista",
    value: "Estoquista",
  },
  {
    nome: "Requisitante",
    value: "Requisitante",
  },
  {
    nome: "Personalizado 1",
    value: "Personalizado 1",
  },
];
