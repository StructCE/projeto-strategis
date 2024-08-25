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
  iconSource,
  // width,
  // height,
  // alt,
}: {
  iconSource: string;
  // width: number;
  // height: number;
  // alt: string;
}) {
  const [size, setSize] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSize(20);
      } else {
        setSize(20);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  switch (iconSource) {
    // Configurações Gerais
    case "dashboard":
      return <House width={size} height={size} name={iconSource} />;
    case "cadastro-empresa":
      return <Building2 width={size} height={size} name={iconSource} />;
    case "cadastro-fornecedor":
      return <Truck width={size} height={size} name={iconSource} />;
    case "cadastro-produto":
      return <ShoppingBasket width={size} height={size} name={iconSource} />;
    case "cadastro-estoque":
      return <PackageOpen width={size} height={size} name={iconSource} />;
    case "cadastro-parametros-gerais":
      return <Info width={size} height={size} name={iconSource} />;

    //Controle de Acesso
    case "cadastro-usuario":
      return <Users width={size} height={size} name={iconSource} />;
    case "cadastro-perfil-acesso":
      return <UserCog width={size} height={size} name={iconSource} />;

    //Gestão de Estoque
    case "importacao-nfs":
      return <FileInput width={size} height={size} name={iconSource} />;
    // case "recebimento-mercadorias":
    //   return <FilePlus2 width={size} height={size} name={iconSource} />;
    // case "separacao-mercadoria-solicitada":
    //   return <PackageCheck width={size} height={size} name={iconSource} />;
    case "entrada-mercadorias":
      return <PackagePlus width={size} height={size} name={iconSource} />;
    case "saida-mercadorias":
      return <PackageMinus width={size} height={size} name={iconSource} />;
    case "compra-mercadorias":
      return <CircleDollarSign width={size} height={size} name={iconSource} />;
    case "inventario-estoque":
      return <FolderSearch width={size} height={size} name={iconSource} />;
    case "ajuste-estoque":
      return <FolderCog width={size} height={size} name={iconSource} />;

    //Requisição de Mercadoria
    case "solicitacao-mercadorias":
      return <ClipboardPlus width={size} height={size} name={iconSource} />;
    // case "separacao-mercadorias":
    //   return <ClipboardList width={size} height={size} name={iconSource} />;
    case "status-solicitacoes":
      return <ClipboardCheck width={size} height={size} name={iconSource} />;

    //Relatórios
    case "avisos-estoque":
      return <TriangleAlert width={size} height={size} name={iconSource} />;
    case "relatorios-personalizados":
      return <SlidersHorizontal width={size} height={size} name={iconSource} />;
    case "historico-operacoes":
      return <Settings width={size} height={size} name={iconSource} />;
    case "historico-pagamentos":
      return <FileText width={size} height={size} name={iconSource} />;
    default:
      return <ChevronRight width={size} height={size} name={iconSource} />;
  }
}
