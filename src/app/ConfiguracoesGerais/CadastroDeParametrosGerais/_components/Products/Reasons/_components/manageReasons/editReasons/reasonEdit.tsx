import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type AdjustmentReason } from "../../../../../GeneralParametersData";
import { useReasonForm } from "./useReasonForm";

type ReasonEditForm = {
  reason: AdjustmentReason;
};

export const ReasonEdit = (props: ReasonEditForm) => {
  const reasonEditForm = useReasonForm(props.reason);

  return (
    <Form {...reasonEditForm.form}>
      <form
        onSubmit={reasonEditForm.form.handleSubmit(reasonEditForm.onSubmitEdit)}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Motivo</FormComponent.Label>
              <FormField
                control={reasonEditForm.form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome da unidade"
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
              Editar Motivo
            </FormComponent.Button>
            <FormComponent.Button
              className="hover:bg-hover_vermelho_botao_2 bg-vermelho_botao_2"
              handlePress={reasonEditForm.form.handleSubmit(
                reasonEditForm.onSubmitRemove,
              )}
            >
              Remover Motivo
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
