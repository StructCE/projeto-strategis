import { type UseFormReturn } from "react-hook-form";
import { FormComponent } from "~/components/forms/formsContainer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { MultiSelect } from "~/components/ui/multi-select";
import { modules, type Role } from "../accessProfilesData";
import { type EditAccessProfileFormValues } from "./accessProfileEditFormSchema";

type AccessProfileEditProps = {
  form: UseFormReturn<EditAccessProfileFormValues>;
  onSubmitEdit: (data: EditAccessProfileFormValues) => void;
  onSubmitRemove: (data: EditAccessProfileFormValues) => void;
  selectedModule: string[];
  setSelectedModule: React.Dispatch<React.SetStateAction<string[]>>;
  role: Role;
};

export const AccessProfileEdit = (props: AccessProfileEditProps) => {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmitEdit)}>
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Nome</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Nome do 'cargo'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Módulos de acesso</FormComponent.Label>
              {/* <FormField
                control={props.form.control}
                name="modules"
                render={({ field }) => (
                  <FormItem>
                    <MultiSelect
                      options={modules}
                      onValueChange={props.setSelectedModule}
                      defaultValue={props.selectedModule}
                      placeholder="Selecione um ou mais conteúdos para o cargo ter acesso"
                      variant="inverted"
                      maxCount={2}
                    />
                    <FormMessage />
                    </FormItem>
                    )}
                    /> */}
              <MultiSelect
                options={modules}
                onValueChange={props.setSelectedModule}
                defaultValue={props.selectedModule}
                placeholder="Selecione um ou mais conteúdos para o cargo ter acesso"
                variant="inverted"
                maxCount={2}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
              Editar Usuário
            </FormComponent.Button>
            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_login"
              handlePress={props.form.handleSubmit(props.onSubmitRemove)}
            >
              Remover Usuário
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
