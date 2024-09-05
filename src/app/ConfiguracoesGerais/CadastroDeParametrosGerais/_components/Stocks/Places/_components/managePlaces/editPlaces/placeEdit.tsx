import { type Place } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import { FormComponent } from "~/components/forms/formsContainer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { usePlaceForm } from "./usePlaceForm";

type PlaceEditForm = {
  place: Place;
};

export const PlaceEdit = (props: PlaceEditForm) => {
  const placeEditForm = usePlaceForm(props.place);

  return (
    <Form {...placeEditForm.form}>
      <form
        onSubmit={placeEditForm.form.handleSubmit(placeEditForm.onSubmitEdit)}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Local</FormComponent.Label>
              <FormField
                control={placeEditForm.form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome do local"
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
              Editar Local
            </FormComponent.Button>
            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_login"
              handlePress={placeEditForm.form.handleSubmit(
                placeEditForm.onSubmitRemove,
              )}
            >
              Remover Local
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
