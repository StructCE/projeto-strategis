export const user = {
  name: "Nome do Usuário 1",
  phone: "(XX) XXXXX-XXXX",
  role: "Administrador",
  company: "Empresa 1",
};

export type User = typeof user;

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

export type Company = typeof companies;
