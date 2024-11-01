export const modules: {
  name: string;
  code: number;
  pagePath: string;
  allowedRouter: string;
}[] = [
  // Configurações Gerais
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
  // Controle de Acesso
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
  // Gestão de Estoque
  {
    name: "Importar Notas Fiscais",
    code: 8,
    pagePath: "/GestaoDeEstoque/ImportacaoDeNFs",
    allowedRouter: "invoice",
  },
  {
    name: "Comprar Mercadorias",
    code: 9,
    pagePath: "/GestaoDeEstoque/CompraDeMercadorias",
    allowedRouter: "order",
  },
  {
    name: "Fazer Inventários",
    code: 10,
    pagePath: "/GestaoDeEstoque/InventariosDeEstoque",
    allowedRouter: "inventory",
  },
  {
    name: "Fazer Ajustes de Estoque",
    code: 11,
    pagePath: "/GestaoDeEstoque/AjustesDeEstoque",
    allowedRouter: "adjust",
  },
  // Requisição de Mercadorias
  {
    name: "Requisitar Mercadorias do Estoque",
    code: 12,
    pagePath: "/RequisicaoDeMercadoria/RequisitarMercadorias",
    allowedRouter: "request",
  },
  {
    name: "Dar Aceite de Mercadorias",
    code: 13,
    pagePath: "/RequisicaoDeMercadoria/RequisicoesDeMercadorias",
    allowedRouter: "request",
  },
  {
    name: "Checar Status de Requisições",
    code: 14,
    pagePath: "/RequisicaoDeMercadoria/StatusDeRequisicoes",
    allowedRouter: "request",
  },
  // Relatórios
  {
    name: "Gerar Relatórios de Aviso de Estoque",
    code: 15,
    pagePath: "/Relatorios/AvisosDeEstoque",
    allowedRouter: "",
  },
  {
    name: "Gerar Relatórios Personalizados de Estoque",
    code: 16,
    pagePath: "/Relatorios/RelatoriosPersonalizados",
    allowedRouter: "",
  },
  {
    name: "Checar Histórico de Operações",
    code: 17,
    pagePath: "/Relatorios/HistoricoDeOperacoes",
    allowedRouter: "operation",
  },
  {
    name: "Checar Histórico de Pagamentos",
    code: 18,
    pagePath: "/Relatorios/HistoricoDePagamentos",
    allowedRouter: "invoice",
  },
];
