export const sidebarButtons = {
  "Configurações Gerais": [
    { name: "Dashboard", iconSource: "dashboard", linkRef: "/" },
    {
      name: "Cadastro de Empresas",
      iconSource: "cadastro-empresas",
      linkRef: "/ConfiguracoesGerais/CadastroDeEmpresas",
    },
    {
      name: "Cadastro de Fornecedores",
      iconSource: "cadastro-fornecedores",
      linkRef: "/ConfiguracoesGerais/CadastroDeFornecedores",
    },
    {
      name: "Cadastro de Produtos",
      iconSource: "cadastro-produtos",
      linkRef: "/ConfiguracoesGerais/CadastroDeProdutos",
    },
    {
      name: "Cadastro de Estoques",
      iconSource: "cadastro-estoques",
      linkRef: "/ConfiguracoesGerais/CadastroDeEstoques",
    },
    {
      name: "Cadastro de Parâmetros Gerais",
      iconSource: "cadastro-parametros-gerais",
      linkRef: "/ConfiguracoesGerais/CadastroDeParametrosGerais",
    },
  ],
  "Controle de Acesso": [
    {
      name: "Cadastro de Usuários",
      iconSource: "cadastro-usuarios",
      linkRef: "/ControleDeAcesso/CadastroDeUsuarios",
    },
    {
      name: "Cadastro de Perfis de Acesso",
      iconSource: "cadastro-perfis-acesso",
      linkRef: "/ControleDeAcesso/CadastroDePerfisDeAcesso",
    },
  ],
  "Gestão de Estoque": [
    {
      name: "Importação de Notas Fiscais",
      iconSource: "importacao-nfs",
      linkRef: "/GestaoDeEstoque/ImportacaoDeNFs",
    },
    {
      name: "Entrada de Mercadorias",
      iconSource: "entrada-mercadorias",
      linkRef: "/GestaoDeEstoque/EntradaDeMercadorias",
    },
    {
      name: "Saída de Mercadorias",
      iconSource: "saida-mercadorias",
      linkRef: "/GestaoDeEstoque/SaidaDeMercadorias",
    },
    {
      name: "Compra de Mercadorias",
      iconSource: "compra-mercadorias",
      linkRef: "/GestaoDeEstoque/CompraDeMercadorias",
    },
    {
      name: "Inventários de Estoque",
      iconSource: "inventarios-estoque",
      linkRef: "/GestaoDeEstoque/InventariosDeEstoque",
    },
    {
      name: "Ajustes de Estoque",
      iconSource: "ajustes-estoque",
      linkRef: "/GestaoDeEstoque/AjustesDeEstoque",
    },
  ],
  "Requisição de Mercadoria": [
    {
      name: "Solicitação de Mercadorias",
      iconSource: "solicitacao-mercadorias",
      linkRef: "/RequisicaoDeMercadoria/SolicitacaoDeMercadorias",
    },
    {
      name: "Status de Solicitações",
      iconSource: "status-solicitacoes",
      linkRef: "/RequisicaoDeMercadoria/StatusDeSolicitacoes",
    },
  ],
  Relatórios: [
    {
      name: "Avisos de Estoque",
      iconSource: "avisos-estoque",
      linkRef: "/Relatorios/AvisosDeEstoque",
    },
    // {
    //   name: "Relatórios Personalizados",
    //   iconSource: "relatorios-personalizados",
    //   linkRef: "/Relatorios/RelatoriosPersonalizados",
    // },
    {
      name: "Histórico de Operações",
      iconSource: "historico-operacoes",
      linkRef: "/Relatorios/HistoricoDeOperacoes",
    },
    {
      name: "Histórico de Pagamentos",
      iconSource: "historico-pagamentos",
      linkRef: "/Relatorios/HistoricoDePagamentos",
    },
  ],
};
