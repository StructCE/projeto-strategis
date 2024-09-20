import { StockRegister } from "./_components/createStock/stockRegister";
import { ManageStocksTable } from "./_components/manageStocks/manageStocks";

export default function StocksRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <StockRegister />
      <ManageStocksTable />
    </div>
  );
}
