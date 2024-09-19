"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import CategoryRegister from "./_components/createCategories/categoryRegister";
import { useCategoryForm } from "./_components/createCategories/useCategoryForm";
import { ManageCategoriesTable } from "./_components/manageCategories/manageCategories";

export default function ProductCategories() {
  const { form, onSubmit } = useCategoryForm();

  return (
    <AccordionItem value="item-2" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Categorias de Produtos
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">
          Cadastrar nova categoria de produtos:
        </p>
        <CategoryRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">
          Categorias de produtos já cadastradas:
        </p>
        <ManageCategoriesTable />
      </AccordionContent>
    </AccordionItem>
  );
}
