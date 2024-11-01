// "use client";
// import {
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "~/components/ui/accordion";
// import { default as DocumentTypeRegister } from "./_components/createDocumentType/documentTypeRegister";
// import { useDocumentTypeForm } from "./_components/createDocumentType/useDocumentTypeForm";
// import { ManageDocumentTypesTable } from "./_components/manageDocumentTypes/manageDocumentTypes";

// export default function DocumentTypes() {
//   const { form, onSubmit } = useDocumentTypeForm();

//   return (
//     <AccordionItem value="item-9" className="border-vinho_strategis px-0">
//       <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
//         Tipos de Documento
//       </AccordionTrigger>
//       <AccordionContent>
//         <p className="pb-2 text-[16px] font-medium">
//           Cadastrar novo tipo de documento:
//         </p>
//         <DocumentTypeRegister form={form} onSubmit={onSubmit} />
//         <p className="py-2 text-[16px] font-medium">
//           Tipos de documentos já cadastrados:
//         </p>
//         <ManageDocumentTypesTable />
//       </AccordionContent>
//     </AccordionItem>
//   );
// }
