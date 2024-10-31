// import { FormComponent } from "~/components/forms";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "~/components/ui/form";
// import { Input } from "~/components/ui/input";
// import { MultiSelect } from "~/components/ui/multi-select";
// import { useAccountPlanForm } from "./useAccountPlanForm";

// type AccountPlanEditForm = {
//   accountPlan: AccountPlan;
// };

// export const AccountPlanEdit = (props: AccountPlanEditForm) => {
//   const accountPlanEditForm = useAccountPlanForm(props.accountPlan);

//   return (
//     <Form {...accountPlanEditForm.form}>
//       <form
//         onSubmit={accountPlanEditForm.form.handleSubmit(
//           accountPlanEditForm.onSubmitEdit,
//         )}
//       >
//         <FormComponent>
//           <FormComponent.Line>
//             <FormComponent.Frame>
//               <FormComponent.Label>Plano de Contas</FormComponent.Label>
//               <FormField
//                 control={accountPlanEditForm.form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
//                         placeholder="Descrição/nome do plano de contas"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </FormComponent.Frame>

//             <FormComponent.Frame>
//               <FormComponent.Label>Sigla</FormComponent.Label>
//               <FormField
//                 control={accountPlanEditForm.form.control}
//                 name="abbreviation"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
//                         placeholder="Sigla do plano de contas"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </FormComponent.Frame>
//           </FormComponent.Line>

//           <FormComponent.Line>
//             <FormComponent.Frame>
//               <FormComponent.Label>Contas</FormComponent.Label>
//               <FormField
//                 control={accountPlanEditForm.form.control}
//                 name="accounts"
//                 render={({ field }) => (
//                   <FormItem>
//                     <MultiSelect
//                       options={accounts.flatMap((account) => ({
//                         label: account.name,
//                         value: account.name,
//                       }))}
//                       onValueChange={(values) => {
//                         field.onChange(
//                           values.map((value) => ({
//                             name: value,
//                           })),
//                         );
//                       }}
//                       defaultValue={
//                         field.value
//                           ? field.value.map((account) => account.name)
//                           : []
//                       }
//                       placeholder="Selecione uma ou mais contas"
//                       variant="inverted"
//                       maxCount={6}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </FormComponent.Frame>
//           </FormComponent.Line>

//           <FormComponent.ButtonLayout>
//             <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
//               Editar Plano de Contas
//             </FormComponent.Button>
//             <FormComponent.Button
//               className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2"
//               handlePress={accountPlanEditForm.form.handleSubmit(
//                 accountPlanEditForm.onSubmitRemove,
//               )}
//             >
//               Remover Plano de Contas
//             </FormComponent.Button>
//           </FormComponent.ButtonLayout>
//         </FormComponent>
//       </form>
//     </Form>
//   );
// };
