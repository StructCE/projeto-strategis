"use client";
import { useEffect, useState } from "react";
import { ProductRegister } from "./_components/createProducts/productRegister";
import ManageProductsTable from "./_components/manageProducts/manageProducts";

export default function ProductsRegister() {
  const [selectCompanyId, setSelectCompanyId] = useState<string>("");

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("selectCompanyId");
    if (storedCompanyId) {
      setSelectCompanyId(storedCompanyId);
    }
  }, [selectCompanyId]);

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <ProductRegister />
      <ManageProductsTable />
    </div>
  );
}
