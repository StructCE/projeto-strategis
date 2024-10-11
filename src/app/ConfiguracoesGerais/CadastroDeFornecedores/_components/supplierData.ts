export type Contact = {
  name: string;
  email: string;
  phone: string | null;
};

export type Supplier = {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string | null;
  stateRegistration: string;
  address: string;
  neighborhood: string;
  city: string;
  federativeUnit: string;
  cep: string;
  contacts?: Contact[];
};

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
