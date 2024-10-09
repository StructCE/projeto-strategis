import { type Group } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useGroupForm } from "./useGroupForm";

type GroupEditForm = {
  group: Group;
};

export const GroupEdit = (props: GroupEditForm) => {
  const groupEditForm = useGroupForm(props.group);

  return (
    <Form {...groupEditForm.form}>
      <form
        onSubmit={groupEditForm.form.handleSubmit(groupEditForm.onSubmitEdit)}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Grupo</FormComponent.Label>
              <FormField
                control={groupEditForm.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome do grupo"
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
              Editar Grupo
            </FormComponent.Button>
            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2"
              handlePress={groupEditForm.form.handleSubmit(
                groupEditForm.onSubmitRemove,
              )}
            >
              Remover Grupo
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
