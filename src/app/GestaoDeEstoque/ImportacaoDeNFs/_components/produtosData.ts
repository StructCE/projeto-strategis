type Produto = {
  nome: string | null;
  ncm: number | null;
  cfop: number | null;
  unidade_compra: string | null;
  quantidade_compra: number | null;
  valor_unidade: number | null;
  valor_total: number | null;
  grupo_despesa: string | null;
  tipo_despesa: string | null;
  setor: string | null;
  categoria_produto: string | null;
  tipo_produto: string | null;
  estoque: string | null;
  local: string | null;
  zona: string | null;
  prateleira: string | null;
  descricao: string | null;
};

export const produtos: Produto[] = [
  {
    nome: "Tomate",
    ncm: 7031020,
    cfop: 5102,
    unidade_compra: "kg",
    quantidade_compra: 10,
    valor_unidade: 5.5,
    valor_total: 55.0,
    grupo_despesa: null,
    tipo_despesa: null,
    setor: null,
    categoria_produto: null,
    tipo_produto: null,
    estoque: null,
    local: null,
    zona: null,
    prateleira: null,
    descricao: null,
  },
  {
    nome: "Alface",
    ncm: 7070000,
    cfop: 5102,
    unidade_compra: "unidade",
    quantidade_compra: 30,
    valor_unidade: 2.0,
    valor_total: 60.0,
    grupo_despesa: null,
    tipo_despesa: null,
    setor: null,
    categoria_produto: null,
    tipo_produto: null,
    estoque: null,
    local: null,
    zona: null,
    prateleira: null,
    descricao: null,
  },
  {
    nome: "Batata",
    ncm: 7019000,
    cfop: 5102,
    unidade_compra: "kg",
    quantidade_compra: 20,
    valor_unidade: 3.2,
    valor_total: 64.0,
    grupo_despesa: null,
    tipo_despesa: null,
    setor: null,
    categoria_produto: null,
    tipo_produto: null,
    estoque: null,
    local: null,
    zona: null,
    prateleira: null,
    descricao: null,
  },
  {
    nome: "Cenoura",
    ncm: 7020000,
    cfop: 5102,
    unidade_compra: "kg",
    quantidade_compra: 15,
    valor_unidade: 4.0,
    valor_total: 60.0,
    grupo_despesa: null,
    tipo_despesa: null,
    setor: null,
    categoria_produto: null,
    tipo_produto: null,
    estoque: null,
    local: null,
    zona: null,
    prateleira: null,
    descricao: null,
  },
  {
    nome: "Abobrinha",
    ncm: 7079900,
    cfop: 5102,
    unidade_compra: "kg",
    quantidade_compra: 8,
    valor_unidade: 6.0,
    valor_total: 48.0,
    grupo_despesa: null,
    tipo_despesa: null,
    setor: null,
    categoria_produto: null,
    tipo_produto: null,
    estoque: null,
    local: null,
    zona: null,
    prateleira: null,
    descricao: null,
  },
];

export const grupos_despesa: string[] = ["Grupo 1", "Grupo 2 "];
export const tipos_despesa: string[] = ["Tipo 1", "Tipo 2"];

export const setores_produto: string[] = ["Setor 1", "Setor 2"];
export const categorias_produto: string[] = ["Categoria 1", "Categoria 2"];
export const tipos_produto: string[] = ["Tipo 1", "Tipo 2"];

export const estoques: string[] = ["Estoque 1", "Estoque 2"];
export const locais: string[] = ["Local 1", "Local 2"];
export const armarios: string[] = ["A001", "A002"];
export const prateleiras: string[] = ["P001", "P002"];
