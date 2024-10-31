// import { type Project } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
// import { FormComponent } from "~/components/forms";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "~/components/ui/form";
// import { Input } from "~/components/ui/input";
// import { useProjectForm } from "./useProjectForm";

// type ProjectEditForm = {
//   project: Project;
// };

// export const ProjectEdit = (props: ProjectEditForm) => {
//   const projectEditForm = useProjectForm(props.project);

//   return (
//     <Form {...projectEditForm.form}>
//       <form
//         onSubmit={projectEditForm.form.handleSubmit(
//           projectEditForm.onSubmitEdit,
//         )}
//       >
//         <FormComponent>
//           <FormComponent.Line>
//             <FormComponent.Frame>
//               <FormComponent.Label>Projeto</FormComponent.Label>
//               <FormField
//                 control={projectEditForm.form.control}
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
//             <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
//               Editar Projeto
//             </FormComponent.Button>
//             <FormComponent.Button
//               className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2"
//               handlePress={projectEditForm.form.handleSubmit(
//                 projectEditForm.onSubmitRemove,
//               )}
//             >
//               Remover Projeto
//             </FormComponent.Button>
//           </FormComponent.ButtonLayout>
//         </FormComponent>
//       </form>
//     </Form>
//   );
// };
