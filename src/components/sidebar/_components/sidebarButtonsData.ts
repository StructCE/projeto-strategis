export const sidebarButtons = {
  "Configurações Gerais": [
    { name: "Dashboard", iconSource: "dashboard", linkRef: "/" },
    {
      name: "Cadastro de Empresa",
      iconSource: "cadastro-empresa",
      linkRef: "/ConfiguracoesGerais/CadastroDeEmpresa",
    },
    {
      name: "Cadastro de Fornecedor",
      iconSource: "cadastro-fornecedor",
      linkRef: "/ConfiguracoesGerais/CadastroDeFornecedor",
    },
    {
      name: "Cadastro de Produto",
      iconSource: "cadastro-produto",
      linkRef: "/ConfiguracoesGerais/CadastroDeProduto",
    },
    {
      name: "Cadastro de Estoque",
      iconSource: "cadastro-estoque",
      linkRef: "/ConfiguracoesGerais/CadastroDeEstoque",
    },
    {
      name: "Cadastro de Parâmetros Gerais",
      iconSource: "cadastro-parametros-gerais",
      linkRef: "/ConfiguracoesGerais/CadastroDeParametrosGerais",
    },
  ],
  "Controle de Acesso": [
    {
      name: "Cadastro de Usuário",
      iconSource: "cadastro-usuario",
      linkRef: "/ControleDeAcesso/CadastroDeUsuario",
    },
    {
      name: "Cadastro de Perfil de Acesso",
      iconSource: "cadastro-perfil-acesso",
      linkRef: "/ControleDeAcesso/CadastroDePerfilDeAcesso",
    },
  ],
  "Gestão de Estoque": [
    {
      name: "Importação de Notas Fiscais",
      iconSource: "importacao-nfs",
      linkRef: "/GestaoDeEstoque/ImportacaoDeNFs",
    },
    // {
    //   name: "Recebimento de Mercadoria",
    //   iconSource: "recebimento-mercadoria",
    //   linkRef: "/GestaoDeEstoque/",
    // },
    // {
    //   name: "Separação de Mercadoria Solicitada",
    //   iconSource: "separacao-mercadoria-solicitada",
    //, linkRef: "/GestaoDeEstoque/" },
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
      name: "Inventário de Estoque",
      iconSource: "inventario-estoque",
      linkRef: "/GestaoDeEstoque/InventarioDeEstoque",
    },
    {
      name: "Ajuste de Estoque",
      iconSource: "ajuste-estoque",
      linkRef: "/GestaoDeEstoque/AjusteDeEstoque",
    },
  ],
  "Requisição de Mercadoria": [
    {
      name: "Solicitação de Mercadorias",
      iconSource: "solicitacao-mercadorias",
      linkRef: "/RequisicaoDeMercadoria/SolicitacaDeMercadorias",
    },
    // { name: "Separação de Mercadorias", iconSource: "separacao-mercadorias", linkRef: "/RequisicaoDeMercadoria/" },
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
    {
      name: "Relatórios Personalizados",
      iconSource: "relatorios-personalizados",
      linkRef: "/Relatorios/RelatoriosPersonalizados",
    },
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
