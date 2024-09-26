import { type UseFormReturn } from "react-hook-form";
import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type CreateReasonFormValues } from "./reasonRegisterFormSchema";

type ReasonRegisterProps = {
  form: UseFormReturn<CreateReasonFormValues>;
  onSubmit: (data: CreateReasonFormValues) => void;
};

export default function ReasonRegister(props: ReasonRegisterProps) {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <FormComponent>
          <FormComponent.Line className="px-1">
            <FormComponent.Frame>
              <FormComponent.Label>Motivo</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição do motivo de ajuste de estoque"
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
            <FormComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao">
              Criar Motivo
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
}
