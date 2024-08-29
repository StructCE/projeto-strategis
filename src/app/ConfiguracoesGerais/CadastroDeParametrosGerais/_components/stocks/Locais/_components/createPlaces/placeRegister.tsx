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
import { type CreatePlaceFormValues } from "./placeRegisterFormSchema";

type PlaceRegisterProps = {
  form: UseFormReturn<CreatePlaceFormValues>;
  onSubmit: (data: CreatePlaceFormValues) => void;
};

export default function PlaceRegister(props: PlaceRegisterProps) {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Local</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="local"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome do local"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
            <FormComponent.Frame>
              <FormComponent.Label>Armário/Zona</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="armarioZona"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome do armário/zona"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
            <FormComponent.Frame>
              <FormComponent.Label>Prateleira</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="prateleira"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome da prateleira"
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
              Criar Endereço
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
}
