export const sidebarButtons = {
  "Configurações Gerais": [
    { name: "Dashboard", icon: "dashboard", linkRef: "/" },
    {
      name: "Cadastro de Empresa",
      icon: "cadastro-empresa",
      linkRef: "/ConfiguracoesGerais/CadastroDeEmpresa",
    },
    {
      name: "Cadastro de Fornecedor",
      icon: "cadastro-fornecedor",
      linkRef: "/ConfiguracoesGerais/CadastroDeFornecedor",
    },
    {
      name: "Cadastro de Produto",
      icon: "cadastro-produto",
      linkRef: "/ConfiguracoesGerais/CadastroDeProduto",
    },
    {
      name: "Cadastro de Estoque",
      icon: "cadastro-estoque",
      linkRef: "/ConfiguracoesGerais/CadastroDeEstoque",
    },
    {
      name: "Cadastro de Parâmetros Gerais",
      icon: "cadastro-parametros-gerais",
      linkRef: "/ConfiguracoesGerais/CadastroDeParametrosGerais",
    },
  ],
  "Controle de Acesso": [
    {
      name: "Cadastro de Usuário",
      icon: "cadastro-usuario",
      linkRef: "/ControleDeAcesso/CadastroDeUsuario",
    },
    {
      name: "Cadastro de Perfil de Acesso",
      icon: "cadastro-perfil-acesso",
      linkRef: "/ControleDeAcesso/CadastroDePerfilDeAcesso",
    },
  ],
  "Gestão de Estoque": [
    {
      name: "Importação de Notas Fiscais",
      icon: "importacao-nfs",
      linkRef: "/GestaoDeEstoque/ImportacaoDeNFs",
    },
    // {
    //   name: "Recebimento de Mercadoria",
    //   icon: "recebimento-mercadoria",
    //   linkRef: "/GestaoDeEstoque/",
    // },
    // {
    //   name: "Separação de Mercadoria Solicitada",
    //   icon: "separacao-mercadoria-solicitada",
    //, linkRef: "/GestaoDeEstoque/" },
    {
      name: "Entrada de Mercadorias",
      icon: "entrada-mercadorias",
      linkRef: "/GestaoDeEstoque/EntradaDeMercadorias",
    },
    {
      name: "Saída de Mercadorias",
      icon: "saida-mercadorias",
      linkRef: "/GestaoDeEstoque/SaidaDeMercadorias",
    },
    {
      name: "Compra de Mercadorias",
      icon: "compra-mercadorias",
      linkRef: "/GestaoDeEstoque/CompraDeMercadorias",
    },
    {
      name: "Inventário de Estoque",
      icon: "inventario-estoque",
      linkRef: "/GestaoDeEstoque/InventarioDeEstoque",
    },
    {
      name: "Ajuste de Estoque",
      icon: "ajuste-estoque",
      linkRef: "/GestaoDeEstoque/AjusteDeEstoque",
    },
  ],
  "Requisição de Mercadoria": [
    {
      name: "Solicitação de Mercadorias",
      icon: "solicitacao-mercadorias",
      linkRef: "/RequisicaoDeMercadoria/SolicitacaDeMercadorias",
    },
    // { name: "Separação de Mercadorias", icon: "separacao-mercadorias", linkRef: "/RequisicaoDeMercadoria/" },
    {
      name: "Status de Solicitações",
      icon: "status-solicitacoes",
      linkRef: "/RequisicaoDeMercadoria/StatusDeSolicitacoes",
    },
  ],
  Relatórios: [
    {
      name: "Avisos de Estoque",
      icon: "avisos-estoque",
      linkRef: "/Relatorios/AvisosDeEstoque",
    },
    {
      name: "Relatórios Personalizados",
      icon: "relatorios-personalizados",
      linkRef: "/Relatorios/RelatoriosPersonalizados",
    },
    {
      name: "Histórico de Operações",
      icon: "historico-operacoes",
      linkRef: "/Relatorios/HistoricoDeOperacoes",
    },
    {
      name: "Histórico de Pagamentos",
      icon: "historico-pagamentos",
      linkRef: "/Relatorios/HistoricoDePagamentos",
    },
  ],
};
