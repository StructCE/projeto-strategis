import {
  Building2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  ClipboardPlus,
  FileInput,
  FilePlus2,
  FileText,
  FolderCog,
  FolderSearch,
  House,
  Info,
  PackageCheck,
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

export default function SidebarIcon({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  switch (src) {
    // Configurações Gerais
    case "dashboard":
      return <House width={width} height={height} name={alt} />;
    case "cadastro-empresa":
      return <Building2 width={width} height={height} name={alt} />;
    case "cadastro-fornecedores":
      return <Truck width={width} height={height} name={alt} />;
    case "cadastro-produtos":
      return <ShoppingBasket width={width} height={height} name={alt} />;
    case "cadastro-estoque":
      return <PackageOpen width={width} height={height} name={alt} />;
    case "cadastro-dados":
      return <Info width={width} height={height} name={alt} />;

    //Controle de Acesso
    case "cadastro-usuarios":
      return <Users width={width} height={height} name={alt} />;
    case "perfis-acesso":
      return <UserCog width={width} height={height} name={alt} />;

    //Gestão de Estoque
    case "importacao-nfs":
      return <FileInput width={width} height={height} name={alt} />;
    case "recebimento-mercadoria":
      return <FilePlus2 width={width} height={height} name={alt} />;
    case "separacao-mercadoria-solicitada":
      return <PackageCheck width={width} height={height} name={alt} />;
    case "entrada-mercadoria":
      return <PackagePlus width={width} height={height} name={alt} />;
    case "saida-mercadoria":
      return <PackageMinus width={width} height={height} name={alt} />;
    case "compra-mercadoria":
      return <CircleDollarSign width={width} height={height} name={alt} />;
    case "inventario-estoque":
      return <FolderSearch width={width} height={height} name={alt} />;
    case "ajuste-estoque":
      return <FolderCog width={width} height={height} name={alt} />;

    //Requisição de Mercadoria
    case "solicitacao-mercadoria":
      return <ClipboardPlus width={width} height={height} name={alt} />;
    case "separacao-mercadorias":
      return <ClipboardList width={width} height={height} name={alt} />;
    case "status-solicitacoes":
      return <ClipboardCheck width={width} height={height} name={alt} />;

    //Relatórios
    case "avisos-estoque":
      return <TriangleAlert width={width} height={height} name={alt} />;
    case "relatorios-personalizados":
      return <SlidersHorizontal width={width} height={height} name={alt} />;
    case "historico-operacoes":
      return <Settings width={width} height={height} name={alt} />;
    case "historico-pagamentos":
      return <FileText width={width} height={height} name={alt} />;
    default:
      return <ChevronRight width={width} height={height} name={alt} />;
  }
}
