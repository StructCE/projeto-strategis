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
import { type Prateleira } from "../../../../GeneralParametersData";
import { type EditShelfFormValues } from "./shelvesEditFormSchema";

type ShelfEditProps = {
  form: UseFormReturn<EditShelfFormValues>;
  onSubmitEdit: (data: EditShelfFormValues) => void;
  onSubmitRemove: (data: EditShelfFormValues) => void;
  prateleira: Prateleira;
};

export const ShelfEdit = (props: ShelfEditProps) => {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmitEdit)}>
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Prateleira</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="descricao"
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
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_login"
              handlePress={props.form.handleSubmit(props.onSubmitRemove)}
            >
              Remover Prateleira
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
