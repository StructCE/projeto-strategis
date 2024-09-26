export type User = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  role: string;
  company: string;
};

export const users: User[] = [
  {
    name: "Nome do Usuário 1",
    email: "usuario1@gmail.com",
    company: "Alimentos WCW",
    role: "Administrador",
    password: "12345678",
    password_confirmation: "12345678",
    phone: "61999999999",
  },
  {
    name: "Nome do Usuário 2",
    email: "usuario2@gmail.com",
    company: "TechNova Filial",
    role: "Operador",
    password: "12345678",
    password_confirmation: "12345678",
    phone: "61999999999",
  },
  {
    name: "Nome do Usuário 3",
    email: "usuario3@gmail.com",
    company: "Quantum Dynamics",
    role: "Estoquista",
    password: "12345678",
    password_confirmation: "12345678",
    phone: "61999999999",
  },
  {
    name: "Nome do Usuário 4",
    email: "usuario4@gmail.com",
    company: "Apex Innovations Filial",
    role: "Requisitante",
    password: "12345678",
    password_confirmation: "12345678",
    phone: "61999999999",
  },
  {
    name: "Nome do Usuário 5",
    email: "usuario5@gmail.com",
    company: "Alimentos WCW",
    role: "Requisitante",
    password: "12345678",
    password_confirmation: "12345678",
    phone: "61999999999",
  },
];

export const companies = [
  {
    name: "Alimentos WCW",
    value: "Alimentos WCW",
  },
  {
    name: "TechNova Filial",
    value: "TechNova Filial",
  },
  {
    name: "Quantum Dynamics",
    value: "Quantum Dynamics",
  },
  {
    name: "Apex Innovations Filial",
    value: "Apex Innovations Filial",
  },
  {
    name: "FusionWare",
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
