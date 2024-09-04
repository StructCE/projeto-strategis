import { SupplierRegister } from "./_components/createSuppliers/supplierRegister";
import { ManageSuppliersTable } from "./_components/manageSuppliers/manageSuppliers";

export default function SuppliersRegister() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <SupplierRegister />
      <ManageSuppliersTable />
    </div>
  );
}
