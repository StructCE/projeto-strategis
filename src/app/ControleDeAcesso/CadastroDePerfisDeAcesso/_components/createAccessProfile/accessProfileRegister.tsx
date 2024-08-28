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
import { type CreateAccessProfileFormValues } from "./accessProfileRegisterFormSchema";
import { Modulos } from "./accessProfilesData";

type AccessProfileRegisterProps = {
  form: UseFormReturn<CreateAccessProfileFormValues>;
  onSubmit: (data: CreateAccessProfileFormValues) => void;
  selectedFrameworks: string[];
  setSelectedFrameworks: React.Dispatch<React.SetStateAction<string[]>>;
};

export const AccessProfileRegister = (props: AccessProfileRegisterProps) => {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <FormComponent>
          <FormComponent.Title>
            Cadastro de Perfil de Acesso
          </FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Nome</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="nome"
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
              <FormField
                control={props.form.control}
                name="modulos"
                render={({ field }) => (
                  <FormItem>
                    <MultiSelect
                      options={Modulos}
                      onValueChange={props.setSelectedFrameworks}
                      defaultValue={props.selectedFrameworks}
                      placeholder="Selecione um ou mais conteúdos para o cargo ter acesso"
                      variant="inverted"
                      maxCount={2}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao">
              Criar Perfil de Acesso
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
