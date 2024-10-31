// import { type Bank } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
// import { FormComponent } from "~/components/forms";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "~/components/ui/form";
// import { Input } from "~/components/ui/input";
// import { useBankForm } from "./useBankForm";

// type BankEditForm = {
//   bank: Bank;
// };

// export const BankEdit = (props: BankEditForm) => {
//   const bankEditForm = useBankForm(props.bank);

//   return (
//     <Form {...bankEditForm.form}>
//       <form
//         onSubmit={bankEditForm.form.handleSubmit(bankEditForm.onSubmitEdit)}
//       >
//         <FormComponent>
//           <FormComponent.Line>
//             <FormComponent.Frame>
//               <FormComponent.Label>Banco</FormComponent.Label>
//               <FormField
//                 control={bankEditForm.form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
//                         placeholder="Nome do banco"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </FormComponent.Frame>
//           </FormComponent.Line>

//           <FormComponent.ButtonLayout>
//             <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
//               Editar Banco
//             </FormComponent.Button>
//             <FormComponent.Button
//               className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2"
//               handlePress={bankEditForm.form.handleSubmit(
//                 bankEditForm.onSubmitRemove,
//               )}
//             >
//               Remover Banco
//             </FormComponent.Button>
//           </FormComponent.ButtonLayout>
//         </FormComponent>
//       </form>
//     </Form>
//   );
// };
