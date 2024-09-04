import type React from "react";
import {
  type LucideProps,
  Home,
  Building2,
  Truck,
  ShoppingBasket,
  PackageOpen,
  Info,
  Users,
  UserCog,
  FileInput,
  PackagePlus,
  PackageMinus,
  CircleDollarSign,
  FolderSearch,
  FolderCog,
  ClipboardPlus,
  ClipboardCheck,
  TriangleAlert,
  SlidersHorizontal,
  Settings,
  FileText,
} from "lucide-react";

type SidebarButton = {
  name: string;
  refLink: string;
  icon: (props: LucideProps) => React.ReactNode;
};

export const sidebarButtons: Record<string, SidebarButton[]> = {
  "Configurações Gerais": [
    { name: "Dashboard", icon: (props) => <Home {...props} />, refLink: "/" },
    {
      name: "Cadastro de Empresa",
      icon: (props) => <Building2 {...props} />,
      refLink: "/ConfiguracoesGerais/CadastroDeEmpresa",
    },
    {
      name: "Cadastro de Fornecedor",
      icon: (props) => <Truck {...props} />,
      refLink: "/ConfiguracoesGerais/CadastroDeFornecedor",
    },
    {
      name: "Cadastro de Produto",
      icon: (props) => <ShoppingBasket {...props} />,
      refLink: "/ConfiguracoesGerais/CadastroDeProduto",
    },
    {
      name: "Cadastro de Estoque",
      icon: (props) => <PackageOpen {...props} />,
      refLink: "/ConfiguracoesGerais/CadastroDeEstoque",
    },
    {
      name: "Cadastro de Parâmetros Gerais",
      icon: (props) => <Info {...props} />,
      refLink: "/ConfiguracoesGerais/CadastroDeParametrosGerais",
    },
  ],
  "Controle de Acesso": [
    {
      name: "Cadastro de Usuário",
      icon: (props) => <Users {...props} />,
      refLink: "/ControleDeAcesso/CadastroDeUsuario",
    },
    {
      name: "Cadastro de Perfil de Acesso",
      icon: (props) => <UserCog {...props} />,
      refLink: "/ControleDeAcesso/CadastroDePerfilDeAcesso",
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
      name: "Inventário de Estoque",
      icon: (props) => <FolderSearch {...props} />,
      refLink: "/GestaoDeEstoque/InventarioDeEstoque",
    },
    {
      name: "Ajuste de Estoque",
      icon: (props) => <FolderCog {...props} />,
      refLink: "/GestaoDeEstoque/AjusteDeEstoque",
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
