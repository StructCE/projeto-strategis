import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
import { useShelfForm } from "./useShelvesForm";

export const ShelfRegister = () => {
  const shelvesForm = useShelfForm();

  const { data: cabinets = [] } =
    api.generalParameters.cabinet.getAll.useQuery();

  return (
    <Form {...shelvesForm.form}>
      <form onSubmit={shelvesForm.form.handleSubmit(shelvesForm.onSubmit)}>
        <FormComponent>
          <FormComponent.Line className="px-1">
            <FormComponent.Frame>
              <FormComponent.Label>Armário/Zona</FormComponent.Label>
              <FormField
                control={shelvesForm.form.control}
                name="cabinetId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione o armário/zona da prateleira" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cabinets.map((cabinet, index) => (
                          <SelectItem value={cabinet.id} key={index}>
                            {cabinet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Prateleira</FormComponent.Label>
              <FormField
                control={shelvesForm.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
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
              Criar Prateleira
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
