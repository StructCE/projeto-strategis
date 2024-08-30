import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { locais } from "../../../../GeneralParametersData";
import { type CreateShelfFormValues } from "./shelvesRegisterFormSchema";

type ShelfRegisterProps = {
  form: UseFormReturn<CreateShelfFormValues>;
  onSubmit: (data: CreateShelfFormValues) => void;
};

export default function ShelfRegister(props: ShelfRegisterProps) {
  const [selectedLocal, setSelectedLocal] = useState<string | undefined>(
    undefined,
  );

  // Filtrar os armários/zonas com base no local selecionado
  const filteredArmariosZonas = selectedLocal
    ? (locais.find((local) => local.descricao === selectedLocal)
        ?.armariosZonas ?? [])
    : [];

  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <FormComponent>
          <FormComponent.Line className="px-1">
            <FormComponent.Frame>
              <FormComponent.Label>Local</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="local"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedLocal(value); // Atualiza o estado do local selecionado
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um local" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locais.map((local, index) => (
                          <SelectItem value={local.descricao} key={index}>
                            {local.descricao}
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
              <FormComponent.Label>Armário/Zona</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="armarioZona"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um armário/zona associado ao local selecionado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredArmariosZonas.map((armarioZona, index) => (
                          <SelectItem value={armarioZona.descricao} key={index}>
                            {armarioZona.descricao}
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
                control={props.form.control}
                name="descricao"
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
}
