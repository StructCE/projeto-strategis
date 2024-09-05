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
    company: "Empresa 1",
    role: "Administrador",
    password: "12345678",
    password_confirmation: "12345678",
    phone: "61999999999",
    roleId: 1,
  },
  {
    name: "Nome do Usuário 2",
    email: "usuario2@gmail.com",
    company: "Empresa 2",
    role: "Operador",
    password: "12345678",
    password_confirmation: "12345678",
    phone: "61999999999",
    roleId: 2,
  },
  {
    name: "Nome do Usuário 3",
    email: "usuario3@gmail.com",
    company: "Empresa 3",
    role: "Estoquista",
    password: "12345678",
    password_confirmation: "12345678",
    phone: "61999999999",
    roleId: 3,
  },
  {
    name: "Nome do Usuário 4",
    email: "usuario4@gmail.com",
    company: "Empresa 4",
    role: "Requisitante",
    password: "12345678",
    password_confirmation: "12345678",
    phone: "61999999999",
    roleId: 4,
  },
];

export const companies = [
  {
    name: "Empresa 1",
    value: "Empresa 1",
  },
  {
    name: "Empresa 2",
    value: "Empresa 2",
  },
  {
    name: "Empresa 3",
    value: "Empresa 3",
  },
  {
    name: "Empresa 4",
    value: "Empresa 4",
  },
  {
    name: "Empresa 5",
    value: "Empresa 5",
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
