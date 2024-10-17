export const modules: {
  name: string;
  code: number;
  pagePath: string;
  allowedRouter: string;
}[] = [
  {
    name: "Cadastrar Empresas",
    code: 1,
    pagePath: "/ConfiguracoesGerais/CadastroDeEmpresas",
    allowedRouter: "company",
  },
  {
    name: "Cadastrar Fornecedores",
    code: 2,
    pagePath: "/ConfiguracoesGerais/CadastroDeFornecedores",
    allowedRouter: "supplier",
  },
  {
    name: "Cadastrar Produtos",
    code: 3,
    pagePath: "/ConfiguracoesGerais/CadastroDeProdutos",
    allowedRouter: "product",
  },
  {
    name: "Cadastrar Estoques",
    code: 4,
    pagePath: "/ConfiguracoesGerais/CadastroDeEstoques",
    allowedRouter: "stock",
  },
  {
    name: "Cadastrar Parâmetros Gerais",
    code: 5,
    pagePath: "/ConfiguracoesGerais/CadastroDeParametrosGerais",
    allowedRouter: "generalParameters",
  },
  {
    name: "Cadastrar Usuários",
    code: 6,
    pagePath: "/ControleDeAcesso/CadastroDeUsuarios",
    allowedRouter: "user",
  },
  {
    name: "Cadastrar Perfis de Acesso",
    code: 7,
    pagePath: "/ControleDeAcesso/CadastroDePerfisDeAcesso",
    allowedRouter: "role",
  },
  {
    name: "Importar NFs de Qualquer Empresa",
    code: 8,
    pagePath: "/GestaoDeEstoque/ImportacaoDeNFs",
    allowedRouter: "",
  },
  {
    name: "Dar Entrada de Mercadorias",
    code: 9,
    pagePath: "/GestaoDeEstoque/EntradaDeMercadorias",
    allowedRouter: "",
  },
  {
    name: "Dar Saída de Mercadorias",
    code: 10,
    pagePath: "/GestaoDeEstoque/SaidaDeMercadorias",
    allowedRouter: "",
  },
  {
    name: "Comprar Mercadorias",
    code: 11,
    pagePath: "/GestaoDeEstoque/CompraDeMercadorias",
    allowedRouter: "",
  },
  {
    name: "Fazer Inventários",
    code: 12,
    pagePath: "/GestaoDeEstoque/InventariosDeEstoque",
    allowedRouter: "inventory",
  },
  {
    name: "Fazer Ajustes de Estoque",
    code: 13,
    pagePath: "/GestaoDeEstoque/AjustesDeEstoque",
    allowedRouter: "",
  },
  {
    name: "Requisitar Mercadorias do Estoque",
    code: 14,
    pagePath: "/RequisicaoDeMercadoria/RequisitarMercadorias",
    allowedRouter: "",
  },
  {
    name: "Dar Aceite de Mercadorias Recebidas",
    code: 15,
    pagePath: "/RequisicaoDeMercadoria/RequisicoesDeMercadorias",
    allowedRouter: "",
  },
  {
    name: "Checar Status de Requisições",
    code: 16,
    pagePath: "/RequisicaoDeMercadoria/StatusDeRequisicoes",
    allowedRouter: "",
  },
  {
    name: "Gerar Relatórios de Aviso de Estoque",
    code: 17,
    pagePath: "/Relatorios/AvisosDeEstoque",
    allowedRouter: "",
  },
  {
    name: "Gerar Relatórios Personalizados de Estoque",
    code: 18,
    pagePath: "/Relatorios/RelatoriosPersonalizados",
    allowedRouter: "",
  },
  {
    name: "Checar Histórico de Operações",
    code: 19,
    pagePath: "/Relatorios/HistoricoDeOperacoes",
    allowedRouter: "",
  },
  {
    name: "Checar Histórico de Pagamentos",
    code: 20,
    pagePath: "/Relatorios/HistoricoDePagamentos",
    allowedRouter: "",
  },
];
