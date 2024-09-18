import { StockRegister } from "./_components/createStock/stockRegister";
import { ManageStocksTable } from "./_components/manageStocks/manageStocks";

export default function StocksRegister() {
  return (
    <>
      <StockRegister />
      <ManageStocksTable />
    </>
  );
}
