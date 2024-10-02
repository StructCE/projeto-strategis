"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { default as DocumentTypeRegister } from "./_components/createAccountPlan/accountPlanRegister";
import { useAccountPlanForm } from "./_components/createAccountPlan/useAccountPlanForm";
import { ManageAccountPlansTable } from "./_components/manageAccountPlans/manageAccountPlans";

export default function AccountPlans() {
  const { form, onSubmit } = useAccountPlanForm();

  return (
    <AccordionItem value="item-13" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Planos de Contas
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">
          Cadastrar novo plano de contas:
        </p>
        <DocumentTypeRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">
          Planos de Contas já cadastrados:
        </p>
        <ManageAccountPlansTable />
      </AccordionContent>
    </AccordionItem>
  );
}
