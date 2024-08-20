import Link from "next/link";
import SidebarIcon from "./sidebar-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import SidebarButton from "./sidebar-button";

const sidebarButtons = {
  "Configurações Gerais": [
    { name: "Dashboard", src: "dashboard" },
    { name: "Cadastro de Empresa", src: "cadastro-empresa" },
    { name: "Cadastro de Fornecedores", src: "cadastro-fornecedores" },
    { name: "Cadastro de Produtos", src: "cadastro-produtos" },
    { name: "Cadastro de Estoque", src: "cadastro-estoque" },
    { name: "Cadastro de Dados", src: "cadastro-dados" },
  ],
  "Controle de Acesso": [
    { name: "Cadastro de Usuários", src: "cadastro-usuarios" },
    { name: "Perfis de Acesso", src: "perfis-acesso" },
  ],
  "Gestão de Estoque": [
    { name: "Importação de NFs", src: "importacao-nfs" },
    { name: "Recebimento de Mercadoria", src: "recebimento-mercadoria" },
    {
      name: "Separação de Mercadoria Solicitada",
      src: "separacao-mercadoria-solicitada",
    },
    { name: "Entrada de Mercadoria", src: "entrada-mercadoria" },
    { name: "Saída de Mercadoria", src: "saida-mercadoria" },
    { name: "Compra de Mercadoria", src: "compra-mercadoria" },
    { name: "Inventário de Estoque", src: "inventario-estoque" },
    { name: "Ajuste de Estoque", src: "ajuste-estoque" },
  ],
  "Requisição de Mercadoria": [
    { name: "Solicitação de Mercadoria", src: "solicitacao-mercadoria" },
    { name: "Separação de Mercadorias", src: "separacao-mercadorias" },
    { name: "Status de Solicitações", src: "status-solicitacoes" },
  ],
  Relatórios: [
    { name: "Avisos de Estoque", src: "avisos-estoque" },
    { name: "Relatórios Personalizados", src: "relatorios-personalizados" },
    { name: "Histórico de Operações", src: "historico-operacoes" },
    { name: "Histórico de Pagamentos", src: "historico-pagamentos" },
  ],
};

export function Sidebar() {
  return (
    <aside className="fixed top-0 h-screen w-1/5 bg-fundo_sidebar text-white">
      <div className="flex h-fit w-full items-center justify-center p-4">
        <Link href="/">
          <Image src="/logo-strategis.svg" width={180} height={54} alt="logo" />
        </Link>
      </div>

      <ScrollArea className="w-full overflow-y-auto">
        <Accordion type="multiple" className="max-h-screen w-full">
          {Object.entries(sidebarButtons).map(([category, items], index) => (
            <AccordionItem className="" key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-base">
                {category}
              </AccordionTrigger>

              {items.map((item, itemIndex) => (
                <AccordionContent className="flex-row p-1" key={itemIndex}>
                  <SidebarButton
                    src={item.src}
                    name={item.name}
                    disabled={false} //TODO: logica para habilitar o botão
                  />
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </aside>
  );
}
