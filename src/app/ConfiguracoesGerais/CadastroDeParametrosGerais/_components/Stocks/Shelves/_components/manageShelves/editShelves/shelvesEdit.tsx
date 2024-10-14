import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type Shelf } from "~/server/interfaces/cabinet/cabinet.route.interfaces";
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
                name="name"
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
            <FormComponent.ButtonLayout>
              <FormComponent.Button
                className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2"
                handlePress={() => {
                  const confirmed = window.confirm(
                    "Tem certeza que deseja excluir esta prateleira? Esta ação não pode ser desfeita.",
                  );
                  if (confirmed) {
                    shelfEditForm.onSubmitRemove();
                  }
                }}
              >
                Excluir
              </FormComponent.Button>
              <FormComponent.Button
                className="bg-verde_botao hover:bg-hover_verde_botao"
                handlePress={shelfEditForm.form.handleSubmit(
                  shelfEditForm.onSubmitEdit,
                )}
              >
                Salvar
              </FormComponent.Button>
            </FormComponent.ButtonLayout>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
