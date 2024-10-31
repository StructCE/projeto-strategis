// "use client";
// import {
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "~/components/ui/accordion";
// import { default as DocumentTypeRegister } from "./_components/createProject/projectRegister";
// import { useProjectForm } from "./_components/createProject/useProjectForm";
// import { ManageProjectsTable } from "./_components/manageProjects/manageProjects";

// export default function Projects() {
//   const { form, onSubmit } = useProjectForm();

//   return (
//     <AccordionItem value="item-12" className="border-vinho_strategis px-0">
//       <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
//         Projetos
//       </AccordionTrigger>
//       <AccordionContent>
//         <p className="pb-2 text-[16px] font-medium">Cadastrar novo projeto:</p>
//         <DocumentTypeRegister form={form} onSubmit={onSubmit} />
//         <p className="py-2 text-[16px] font-medium">Projetos já cadastrados:</p>
//         <ManageProjectsTable />
//       </AccordionContent>
//     </AccordionItem>
//   );
// }
