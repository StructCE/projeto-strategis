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
import { useEffect, useState } from "react";

export default function SidebarIcon({
  src,
  // width,
  // height,
  // alt,
}: {
  src: string;
  // width: number;
  // height: number;
  // alt: string;
}) {
  const [size, setSize] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSize(30);
      } else {
        setSize(20);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  switch (src) {
    // Configurações Gerais
    case "dashboard":
      return <House width={size} height={size} name={src} />;
    case "cadastro-empresa":
      return <Building2 width={size} height={size} name={src} />;
    case "cadastro-fornecedores":
      return <Truck width={size} height={size} name={src} />;
    case "cadastro-produtos":
      return <ShoppingBasket width={size} height={size} name={src} />;
    case "cadastro-estoque":
      return <PackageOpen width={size} height={size} name={src} />;
    case "cadastro-dados":
      return <Info width={size} height={size} name={src} />;

    //Controle de Acesso
    case "cadastro-usuarios":
      return <Users width={size} height={size} name={src} />;
    case "perfis-acesso":
      return <UserCog width={size} height={size} name={src} />;

    //Gestão de Estoque
    case "importacao-nfs":
      return <FileInput width={size} height={size} name={src} />;
    case "recebimento-mercadoria":
      return <FilePlus2 width={size} height={size} name={src} />;
    case "separacao-mercadoria-solicitada":
      return <PackageCheck width={size} height={size} name={src} />;
    case "entrada-mercadoria":
      return <PackagePlus width={size} height={size} name={src} />;
    case "saida-mercadoria":
      return <PackageMinus width={size} height={size} name={src} />;
    case "compra-mercadoria":
      return <CircleDollarSign width={size} height={size} name={src} />;
    case "inventario-estoque":
      return <FolderSearch width={size} height={size} name={src} />;
    case "ajuste-estoque":
      return <FolderCog width={size} height={size} name={src} />;

    //Requisição de Mercadoria
    case "solicitacao-mercadoria":
      return <ClipboardPlus width={size} height={size} name={src} />;
    case "separacao-mercadorias":
      return <ClipboardList width={size} height={size} name={src} />;
    case "status-solicitacoes":
      return <ClipboardCheck width={size} height={size} name={src} />;

    //Relatórios
    case "avisos-estoque":
      return <TriangleAlert width={size} height={size} name={src} />;
    case "relatorios-personalizados":
      return <SlidersHorizontal width={size} height={size} name={src} />;
    case "historico-operacoes":
      return <Settings width={size} height={size} name={src} />;
    case "historico-pagamentos":
      return <FileText width={size} height={size} name={src} />;
    default:
      return <ChevronRight width={size} height={size} name={src} />;
  }
}
