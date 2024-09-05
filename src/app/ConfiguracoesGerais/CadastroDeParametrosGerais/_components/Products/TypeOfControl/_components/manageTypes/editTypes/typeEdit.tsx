import { type TypeOfControl } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import { FormComponent } from "~/components/forms/formsContainer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useTypeForm } from "./useTypeForm";

type TypeEditForm = {
  type_of_control: TypeOfControl;
};

export const TypeEdit = (props: TypeEditForm) => {
  const typeEditForm = useTypeForm(props.type_of_control);

  return (
    <Form {...typeEditForm.form}>
      <form
        onSubmit={typeEditForm.form.handleSubmit(typeEditForm.onSubmitEdit)}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Tipo de Controle</FormComponent.Label>
              <FormField
                control={typeEditForm.form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome da categoria de produtos"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
              Editar Tipo
            </FormComponent.Button>
            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_login"
              handlePress={typeEditForm.form.handleSubmit(
                typeEditForm.onSubmitRemove,
              )}
            >
              Remover Tipo
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
