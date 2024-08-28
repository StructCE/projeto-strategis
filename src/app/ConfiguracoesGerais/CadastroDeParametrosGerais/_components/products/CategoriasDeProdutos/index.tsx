"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import CategoryRegister from "./_components/createCategories/categoryRegister";
import { useCategoryForm } from "./_components/createCategories/useCategoryForm";
import { ManageCategoriesTable } from "./_components/manageCategories/manageCategories";

export default function CategoriasDeProdutos() {
  const { form, onSubmit } = useCategoryForm();

  return (
    <AccordionItem value="item-2" className="border-cinza_borda_acordeao px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Categorias de Produtos
      </AccordionTrigger>
      <AccordionContent>
        <CategoryRegister form={form} onSubmit={onSubmit} />
        <p className="pb-2 text-[16px]">
          Categorias de Produtos já cadastradas:
        </p>
        <ManageCategoriesTable />
      </AccordionContent>
    </AccordionItem>
  );
}
