import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type Unit } from "../../../../../GeneralParametersData";
import { useUnitForm } from "./useUnitForm";

type UnitEditForm = {
  unit: Unit;
};

export const UnitEdit = (props: UnitEditForm) => {
  const unitEditForm = useUnitForm(props.unit);

  return (
    <Form {...unitEditForm.form}>
      <form
        onSubmit={unitEditForm.form.handleSubmit(unitEditForm.onSubmitEdit)}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Unidade</FormComponent.Label>
              <FormField
                control={unitEditForm.form.control}
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

            <FormComponent.Frame>
              <FormComponent.Label>Sigla</FormComponent.Label>
              <FormField
                control={unitEditForm.form.control}
                name="abbreviation"
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

            <FormComponent.Frame>
              <FormComponent.Label>
                Unidades por Pacote/Fardo
              </FormComponent.Label>
              <FormField
                control={unitEditForm.form.control}
                name="unitsPerPack"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Unidades por pacote/fardo"
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
              Editar Unidade
            </FormComponent.Button>
            <FormComponent.Button
              className="hover:bg-hover_vermelho_botao_2 bg-vermelho_botao_2"
              handlePress={unitEditForm.form.handleSubmit(
                unitEditForm.onSubmitRemove,
              )}
            >
              Remover Unidade
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
