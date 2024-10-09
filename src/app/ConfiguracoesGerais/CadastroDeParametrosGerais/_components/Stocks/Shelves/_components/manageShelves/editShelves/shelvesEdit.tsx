import { type Shelf } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useShelfForm } from "./useShelvesForm";

type ShelfEditForm = {
  shelf: Shelf;
};

export const ShelfEdit = (props: ShelfEditForm) => {
  const shelfEditForm = useShelfForm(props.shelf);

  return (
    <Form {...shelfEditForm.form}>
      <form
        onSubmit={shelfEditForm.form.handleSubmit(shelfEditForm.onSubmitEdit)}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Prateleira</FormComponent.Label>
              <FormField
                control={shelfEditForm.form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome do armário/zona"
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
              Editar Prateleira
            </FormComponent.Button>
            <FormComponent.Button
              className="hover:bg-hover_vermelho_botao_2 bg-vermelho_botao_2"
              handlePress={shelfEditForm.form.handleSubmit(
                shelfEditForm.onSubmitRemove,
              )}
            >
              Remover Prateleira
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
