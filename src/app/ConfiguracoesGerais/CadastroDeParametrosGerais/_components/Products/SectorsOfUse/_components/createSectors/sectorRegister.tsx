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
import { type CreateSectorFormValues } from "./sectorRegisterFormSchema";

type SectorRegisterProps = {
  form: UseFormReturn<CreateSectorFormValues>;
  onSubmit: (data: CreateSectorFormValues) => void;
};

export default function SectorRegister(props: SectorRegisterProps) {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <FormComponent>
          <FormComponent.Line className="px-1">
            <FormComponent.Frame>
              <FormComponent.Label>Setor de Utilização</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome do setor de utilização"
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
              Criar Setor
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
}
