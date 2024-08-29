import { Accordion } from "~/components/ui/accordion";
import CategoriasDeProdutos from "./_components/products/CategoriasDeProdutos";
import SetoresDeUtilizacao from "./_components/products/SetoresDeUtilizacao";
import TiposDeControle from "./_components/products/TiposDeControle";
import ArmariosZonas from "./_components/stocks/ArmariosZonas";
import Locais from "./_components/stocks/Locais";

export default function UsersRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <h1 className="text-[32px] font-medium">Parâmetros Gerais - Produtos</h1>
      <Accordion type="single" collapsible>
        <TiposDeControle />
        <CategoriasDeProdutos />
        <SetoresDeUtilizacao />
        <h1 className="mt-8 text-[32px] font-medium">
          Parâmetros Gerais - Estoques
        </h1>
        <Locais />
        <ArmariosZonas />
        {/* <Prateleiras /> */}
      </Accordion>
    </div>
  );
}
