import { type SectorOfUse } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useSectorForm } from "./useSectorForm";

type SectorEditForm = {
  sector: SectorOfUse;
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
                name="description"
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
            <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
              Editar Setor
            </FormComponent.Button>
            <FormComponent.Button
              className="hover:bg-hover_vermelho_botao_2 bg-vermelho_botao_2"
              handlePress={sectorEditForm.form.handleSubmit(
                sectorEditForm.onSubmitRemove,
              )}
            >
              Remover Setor
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
