import { Accordion } from "~/components/ui/accordion";
import CategoriasDeProdutos from "./_components/products/CategoriasDeProdutos";
import SetoresDeUtilizacao from "./_components/products/SetoresDeUtilizacao";
import TiposDeControle from "./_components/products/TiposDeControle";
import ArmariosZonas from "./_components/stocks/ArmariosZonas";
import Locais from "./_components/stocks/Locais";
import Prateleiras from "./_components/stocks/Prateleiras";

export default function ParametersRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <h1 className="text-[32px] font-medium">Parâmetros Gerais de Produtos</h1>
      <Accordion type="single" collapsible>
        <TiposDeControle />
        <CategoriasDeProdutos />
        <SetoresDeUtilizacao />
        <h1 className="mt-8 text-[32px] font-medium">
          Parâmetros Gerais de Estoques
        </h1>
        <Locais />
        <ArmariosZonas />
        <Prateleiras />
      </Accordion>
    </div>
  );
}
