import { Accordion } from "~/components/ui/accordion";
import Banks from "./_components/Payments/Banks";
import DocumentTypes from "./_components/Payments/DocumentTypes";
import Groups from "./_components/Payments/Groups";
import ProductCategories from "./_components/Products/ProductCategories";
import Reasons from "./_components/Products/Reasons";
import SectorsOfUse from "./_components/Products/SectorsOfUse";
import TypesOfControl from "./_components/Products/TypeOfControl";
import Units from "./_components/Products/Units";
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
        <Reasons />

        <h1 className="mt-8 text-[32px] font-medium">
          Parâmetros Gerais de Estoques
        </h1>
        <Storages />
        <Shelves />

        <h1 className="mt-8 text-[32px] font-medium">
          Parâmetros Gerais de Pagamentos
        </h1>
        <DocumentTypes />
        {/* <AccountPlans /> */}
        {/* <Projects /> */}
        <Banks />
        <Groups />
      </Accordion>
    </div>
  );
}
