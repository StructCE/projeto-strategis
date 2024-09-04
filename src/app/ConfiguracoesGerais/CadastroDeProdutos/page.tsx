import { ProductsRegister as ProductsRegisterTable } from "./_components/productsRegister";
import { productsTable } from "./_components/productsRegisterData";

export default function ProductsRegister() {
  return (
    <div className="h-screen w-full">
      <ProductsRegisterTable productsTable={productsTable} />
    </div>
  );
}
