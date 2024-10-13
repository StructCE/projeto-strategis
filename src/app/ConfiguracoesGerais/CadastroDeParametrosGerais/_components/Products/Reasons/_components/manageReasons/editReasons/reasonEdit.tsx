import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type AdjustReason } from "~/server/interfaces/adjustReason/adjustReason.route.interfaces";
import { useReasonForm } from "./useReasonForm";

type ReasonEditForm = {
  reason: AdjustReason;
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
                name="name"
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
            <FormComponent.ButtonLayout>
              <FormComponent.Button
                className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2"
                handlePress={() => {
                  const confirmed = window.confirm(
                    "Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.",
                  );
                  if (confirmed) {
                    reasonEditForm.onSubmitRemove();
                  }
                }}
              >
                Excluir
              </FormComponent.Button>
              <FormComponent.Button
                className="bg-verde_botao hover:bg-hover_verde_botao"
                handlePress={reasonEditForm.form.handleSubmit(
                  reasonEditForm.onSubmitEdit,
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
