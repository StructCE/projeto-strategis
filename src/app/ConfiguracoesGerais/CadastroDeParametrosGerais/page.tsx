import { Accordion } from "~/components/ui/accordion";
import ProductCategories from "./_components/Products/ProductCategories";
import SectorsOfUse from "./_components/Products/SectorsOfUse";
import TypesOfControl from "./_components/Products/TypeOfControl";
import Units from "./_components/Products/Units";
import Places from "./_components/Stocks/Places";
import Shelves from "./_components/Stocks/Shelves";
import Storages from "./_components/Stocks/Storages";

export default function GeneralParametersRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <h1 className="text-[32px] font-medium">Parâmetros Gerais de Produtos</h1>
      <Accordion type="single" collapsible>
        <TypesOfControl />
        <ProductCategories />
        <SectorsOfUse />
        <Units />
        <h1 className="mt-8 text-[32px] font-medium">
          Parâmetros Gerais de Estoques
        </h1>
        <Places />
        <Storages />
        <Shelves />
      </Accordion>
    </div>
  );
}
