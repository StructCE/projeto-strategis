import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type UseSector } from "~/server/interfaces/useSector/useSector.route.interfaces";
import { useSectorForm } from "./useSectorForm";

type SectorEditForm = {
  sector: UseSector;
};

export const SectorEdit = (props: SectorEditForm) => {
  const sectorEditForm = useSectorForm(props.sector);

  return (
    <Form {...sectorEditForm.form}>
      <form
        onSubmit={sectorEditForm.form.handleSubmit(sectorEditForm.onSubmitEdit)}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Setor de Utilização</FormComponent.Label>
              <FormField
                control={sectorEditForm.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome da categoria de produtos"
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
                    sectorEditForm.onSubmitRemove();
                  }
                }}
              >
                Excluir
              </FormComponent.Button>
              <FormComponent.Button
                className="bg-verde_botao hover:bg-hover_verde_botao"
                handlePress={sectorEditForm.form.handleSubmit(
                  sectorEditForm.onSubmitEdit,
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
