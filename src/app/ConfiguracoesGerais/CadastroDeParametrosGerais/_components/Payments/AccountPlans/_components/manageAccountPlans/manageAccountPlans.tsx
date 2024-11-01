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
// import { AccountPlanEdit } from "./editAccountPlan/accountPlanEdit";

// export const ManageAccountPlansTable = () => {
//   return (
//     <TableComponent>
//       <TableComponent.Table>
//         <TableComponent.LineTitle className="grid-cols-[1fr_50px_2fr_130px] gap-12">
//           <TableComponent.ValueTitle>Plano de Contas</TableComponent.ValueTitle>
//           <TableComponent.ValueTitle className="text-center">
//             Sigla
//           </TableComponent.ValueTitle>
//           <TableComponent.ValueTitle>Contas</TableComponent.ValueTitle>
//           <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
//         </TableComponent.LineTitle>

//         {account_plans.map((account_plan, index) => (
//           <TableComponent.Line
//             className={`grid-cols-[1fr_50px_2fr_130px] gap-12 ${
//               index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
//             }`}
//             key={index}
//           >
//             <TableComponent.Value>{account_plan.name}</TableComponent.Value>
//             <TableComponent.Value className="text-center">
//               {account_plan.abbreviation}
//             </TableComponent.Value>
//             <TableComponent.Value>
//               {account_plan.accounts.length > 3
//                 ? `${account_plan.accounts
//                     .slice(0, 3)
//                     .map((account) => account.name)
//                     .join(", ")}...`
//                 : account_plan.accounts
//                     .map((account) => account.name)
//                     .join(", ")}
//             </TableComponent.Value>
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
//                     Utilize o campo abaixo para editar o plano de contas ou o
//                     botão para remover
//                   </DialogTitle>

//                   <AccountPlanEdit accountPlan={account_plan} />
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
