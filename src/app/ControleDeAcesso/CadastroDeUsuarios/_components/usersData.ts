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
    empresa: "Alimentos WCW",
    cargo: "Administrador",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 1,
  },
  {
    nome: "Nome do Usuário 2",
    email: "usuario2@gmail.com",
    empresa: "TechNova Filial",
    cargo: "Operador",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 2,
  },
  {
    nome: "Nome do Usuário 3",
    email: "usuario3@gmail.com",
    empresa: "Quantum Dynamics",
    cargo: "Estoquista",
    senha: "12345678",
    senhaConfirmacao: "12345678",
    telefone: "61999999999",
    cargoId: 3,
  },
  {
    nome: "Nome do Usuário 4",
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

export const Empresas = [
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
