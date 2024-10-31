// import { TableComponent } from "~/components/table";
// import { Button } from "~/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "~/components/ui/dialog";
// import { groups } from "../../../../GeneralParametersData";
// import { GroupEdit } from "./editGroup/groupEdit";

// export const ManageGroupsTable = () => {
//   return (
//     <TableComponent>
//       <TableComponent.Table>
//         <TableComponent.LineTitle className="grid-cols-[1fr_130px]">
//           <TableComponent.ValueTitle>Grupo</TableComponent.ValueTitle>
//           <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
//         </TableComponent.LineTitle>

//         {groups.map((group, index) => (
//           <TableComponent.Line
//             className={`grid-cols-[1fr_130px] ${
//               index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
//             }`}
//             key={index}
//           >
//             <TableComponent.Value>{group.name}</TableComponent.Value>
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
//                   Detalhes
//                 </Button>
//               </DialogTrigger>
//               <DialogContent
//                 aria-describedby={undefined}
//                 className="sm:max-w-7xl"
//               >
//                 <DialogHeader>
//                   <DialogTitle className="pb-1.5">
//                     Utilize o campo abaixo para editar o grupo ou o botão para
//                     remover
//                   </DialogTitle>

//                   <GroupEdit group={group} />
//                   <DialogDescription></DialogDescription>
//                 </DialogHeader>
//               </DialogContent>
//             </Dialog>
//           </TableComponent.Line>
//         ))}
//       </TableComponent.Table>
//     </TableComponent>
//   );
// };
