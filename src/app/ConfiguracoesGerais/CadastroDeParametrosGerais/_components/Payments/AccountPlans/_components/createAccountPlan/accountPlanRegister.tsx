// import { type UseFormReturn } from "react-hook-form";
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
// import { type CreateAccountPlanFormValues } from "./accountPlanRegisterFormSchema";

// type AccountPlanRegisterProps = {
//   form: UseFormReturn<CreateAccountPlanFormValues>;
//   onSubmit: (data: CreateAccountPlanFormValues) => void;
// };

// export default function AccountPlanRegister(props: AccountPlanRegisterProps) {
//   return (
//     <Form {...props.form}>
//       <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
//         <FormComponent>
//           <FormComponent.Line className="px-1">
//             <FormComponent.Frame>
//               <FormComponent.Label>Plano de Contas</FormComponent.Label>
//               <FormField
//                 control={props.form.control}
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
//                 control={props.form.control}
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
//                 control={props.form.control}
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
//                       placeholder="Selecione um ou mais contas"
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
//             <FormComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao">
//               Criar Plano de Contas
//             </FormComponent.Button>
//           </FormComponent.ButtonLayout>
//         </FormComponent>
//       </form>
//     </Form>
//   );
// }
