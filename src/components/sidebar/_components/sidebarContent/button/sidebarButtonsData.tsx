import {
  type LucideProps,
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardPlus,
  FileInput,
  FileText,
  FolderCog,
  FolderSearch,
  Home,
  Info,
  PackageMinus,
  PackageOpen,
  PackagePlus,
  Settings,
  ShoppingBasket,
  SlidersHorizontal,
  TriangleAlert,
  Truck,
  UserCog,
  Users,
} from "lucide-react";
import type React from "react";

type SidebarButton = {
  name: string;
  refLink: string;
  icon: (props: LucideProps) => React.ReactNode;
};

export const sidebarButtons: Record<string, SidebarButton[]> = {
  "Configurações Gerais": [
    // { name: "Dashboard", icon: (props) => <Home {...props} />, refLink: "/" },
    {
      name: "Cadastro de Empresas",
      icon: (props) => <Building2 {...props} />,
      refLink: "/ConfiguracoesGerais/CadastroDeEmpresas",
    },
    {
      name: "Cadastro de Fornecedores",
      icon: (props) => <Truck {...props} />,
      refLink: "/ConfiguracoesGerais/CadastroDeFornecedores",
    },
    {
      name: "Cadastro de Produtos",
      icon: (props) => <ShoppingBasket {...props} />,
      refLink: "/ConfiguracoesGerais/CadastroDeProdutos",
    },
    {
      name: "Cadastro de Estoques",
      icon: (props) => <PackageOpen {...props} />,
      refLink: "/ConfiguracoesGerais/CadastroDeEstoques",
    },
    {
      name: "Cadastro de Parâmetros Gerais",
      icon: (props) => <Info {...props} />,
      refLink: "/ConfiguracoesGerais/CadastroDeParametrosGerais",
    },
  ],
  "Controle de Acesso": [
    {
      name: "Cadastro de Usuários",
      icon: (props) => <Users {...props} />,
      refLink: "/ControleDeAcesso/CadastroDeUsuarios",
    },
    {
      name: "Cadastro de Perfis de Acesso",
      icon: (props) => <UserCog {...props} />,
      refLink: "/ControleDeAcesso/CadastroDePerfisDeAcesso",
    },
  ],
  "Gestão de Estoque": [
    {
      name: "Importação de Notas Fiscais",
      icon: (props) => <FileInput {...props} />,
      refLink: "/GestaoDeEstoque/ImportacaoDeNFs",
    },
    {
      name: "Entrada de Mercadorias",
      icon: (props) => <PackagePlus {...props} />,
      refLink: "/GestaoDeEstoque/EntradaDeMercadorias",
    },
    {
      name: "Saída de Mercadorias",
      icon: (props) => <PackageMinus {...props} />,
      refLink: "/GestaoDeEstoque/SaidaDeMercadorias",
    },
    {
      name: "Compra de Mercadorias",
      icon: (props) => <CircleDollarSign {...props} />,
      refLink: "/GestaoDeEstoque/CompraDeMercadorias",
    },
    {
      name: "Inventários de Estoque",
      icon: (props) => <FolderSearch {...props} />,
      refLink: "/GestaoDeEstoque/InventariosDeEstoque",
    },
    {
      name: "Ajustes de Estoque",
      icon: (props) => <FolderCog {...props} />,
      refLink: "/GestaoDeEstoque/AjustesDeEstoque",
    },
  ],
  "Requisição de Mercadoria": [
    {
      name: "Solicitação de Mercadorias",
      icon: (props) => <ClipboardPlus {...props} />,
      refLink: "/RequisicaoDeMercadoria/SolicitacaDeMercadorias",
    },
    {
      name: "Status de Solicitações",
      icon: (props) => <ClipboardCheck {...props} />,
      refLink: "/RequisicaoDeMercadoria/StatusDeSolicitacoes",
    },
  ],
  Relatórios: [
    {
      name: "Avisos de Estoque",
      icon: (props) => <TriangleAlert {...props} />,
      refLink: "/Relatorios/AvisosDeEstoque",
    },
    {
      name: "Relatórios Personalizados",
      icon: (props) => <SlidersHorizontal {...props} />,
      refLink: "/Relatorios/RelatoriosPersonalizados",
    },
    {
      name: "Histórico de Operações",
      icon: (props) => <Settings {...props} />,
      refLink: "/Relatorios/HistoricoDeOperacoes",
    },
    {
      name: "Histórico de Pagamentos",
      icon: (props) => <FileText {...props} />,
      refLink: "/Relatorios/HistoricoDePagamentos",
    },
  ],
};
