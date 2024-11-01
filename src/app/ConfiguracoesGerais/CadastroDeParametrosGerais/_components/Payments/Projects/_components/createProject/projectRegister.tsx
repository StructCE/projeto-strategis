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
// import { type CreateProjectFormValues } from "./projectRegisterFormSchema";

// type ProjectRegisterProps = {
//   form: UseFormReturn<CreateProjectFormValues>;
//   onSubmit: (data: CreateProjectFormValues) => void;
// };

// export default function ProjectRegister(props: ProjectRegisterProps) {
//   return (
//     <Form {...props.form}>
//       <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
//         <FormComponent>
//           <FormComponent.Line className="px-1">
//             <FormComponent.Frame>
//               <FormComponent.Label>Projeto</FormComponent.Label>
//               <FormField
//                 control={props.form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
//                         placeholder="Descrição/nome do projeto"
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
//             <FormComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao">
//               Criar Projeto
//             </FormComponent.Button>
//           </FormComponent.ButtonLayout>
//         </FormComponent>
//       </form>
//     </Form>
//   );
// }
