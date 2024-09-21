type Produto = {
  codigo: number;
  nome: string;
  unidade: string;
  estoque_atual: number;
  estoque_min: number;
  estoque_max: number;
};

type Requisicao = {
  data: string;
  requisitante: string;
  descricao: string;
  produtos: Produto[];
  quant_solicitada_unidade: number;
  quant_solicitada_fardo: 1;
  quant_confirmada: null;
};

export const requisicoes: Requisicao[] = [
  {
    data: "01/02/2024",
    requisitante: "Pedro Silva",
    descricao: "Alcatra, Picanha, Limão...",
    produtos: [
      {
        codigo: 101,
        nome: "Alcatra",
        unidade: "kg",
        estoque_atual: 50,
        estoque_min: 10,
        estoque_max: 100,
      },
      {
        codigo: 102,
        nome: "Picanha",
        unidade: "kg",
        estoque_atual: 30,
        estoque_min: 5,
        estoque_max: 50,
      },
      {
        codigo: 103,
        nome: "Limão",
        unidade: "unidade",
        estoque_atual: 200,
        estoque_min: 50,
        estoque_max: 500,
      },
    ],
    quant_solicitada_unidade: 15,
    quant_solicitada_fardo: 1,
    quant_confirmada: null,
  },
  {
    data: "02/02/2024",
    requisitante: "Thiago Santos",
    descricao: "Alface, Abóbora, Tomate...",
    produtos: [
      {
        codigo: 201,
        nome: "Alface",
        unidade: "unidade",
        estoque_atual: 100,
        estoque_min: 20,
        estoque_max: 200,
      },
      {
        codigo: 202,
        nome: "Abóbora",
        unidade: "kg",
        estoque_atual: 60,
        estoque_min: 10,
        estoque_max: 80,
      },
      {
        codigo: 203,
        nome: "Tomate",
        unidade: "kg",
        estoque_atual: 150,
        estoque_min: 30,
        estoque_max: 300,
      },
    ],
    quant_solicitada_unidade: 25,
    quant_solicitada_fardo: 1,
    quant_confirmada: null,
  },
  {
    data: "03/02/2024",
    requisitante: "Pedro Silva",
    descricao: "Cerveja, Vodka, Catuaba...",
    produtos: [
      {
        codigo: 301,
        nome: "Cerveja",
        unidade: "L",
        estoque_atual: 500,
        estoque_min: 100,
        estoque_max: 1000,
      },
      {
        codigo: 302,
        nome: "Vodka",
        unidade: "L",
        estoque_atual: 200,
        estoque_min: 50,
        estoque_max: 400,
      },
      {
        codigo: 303,
        nome: "Catuaba",
        unidade: "L",
        estoque_atual: 300,
        estoque_min: 80,
        estoque_max: 600,
      },
    ],
    quant_solicitada_unidade: 12,
    quant_solicitada_fardo: 1,
    quant_confirmada: null,
  },
];

export const saidas = [
  {
    numero: 1,
    data: "01/01/2024",
    responsavel: "João Pedro",
    requisitante: "Pedro Silva",
    area: "Área x",
  },
  {
    numero: 2,
    data: "02/01/2024",
    responsavel: "João Pedro",
    requisitante: "Thiago Santos",
    area: "Área x",
  },
  {
    numero: 3,
    data: "03/01/2024",
    responsavel: "João Pedro",
    requisitante: "Pedro Silva",
    area: "Área x",
  },
  {
    numero: 4,
    data: "04/01/2024",
    responsavel: "João Pedro",
    requisitante: "Pedro Silva",
    area: "Área x",
  },
];
