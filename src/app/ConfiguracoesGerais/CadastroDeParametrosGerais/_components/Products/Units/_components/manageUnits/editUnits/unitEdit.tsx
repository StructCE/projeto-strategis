import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type Unit } from "~/server/interfaces/unit/unit.route.interfaces";
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
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                    "Tem certeza que deseja excluir esta unidade? Esta ação não pode ser desfeita!",
                  );
                  if (confirmed) {
                    unitEditForm.onSubmitRemove();
                  }
                }}
              >
                Excluir
              </FormComponent.Button>
              <FormComponent.Button
                className="bg-verde_botao hover:bg-hover_verde_botao"
                handlePress={unitEditForm.form.handleSubmit(
                  unitEditForm.onSubmitEdit,
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
