"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import StorageRegister from "./_components/createStorages/storageRegister";
import { useStorageForm } from "./_components/createStorages/useStoregeForm";
import { ManageStoragesTable } from "./_components/manageStorages/manageStorages";

export default function Storages() {
  const { form, onSubmit } = useStorageForm();

  return (
    <AccordionItem value="item-5" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Armários/Zonas
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">
          Cadastrar novo Armário ou Zona:
        </p>
        <StorageRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">
          Armários/Zonas já cadastrados, seus locais associados e suas
          prateleiras pertencentes:
        </p>
        <ManageStoragesTable />
      </AccordionContent>
    </AccordionItem>
  );
}
