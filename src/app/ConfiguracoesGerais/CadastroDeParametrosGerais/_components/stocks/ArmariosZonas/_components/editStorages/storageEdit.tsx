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
import { type ArmarioZona } from "../../../../GeneralParametersData";
import { type EditStorageFormValues } from "./storageEditFormSchema";

type StorageEditProps = {
  form: UseFormReturn<EditStorageFormValues>;
  onSubmitEdit: (data: EditStorageFormValues) => void;
  onSubmitRemove: (data: EditStorageFormValues) => void;
  armarioZona: ArmarioZona;
};

export const StorageEdit = (props: StorageEditProps) => {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmitEdit)}>
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Armário/Zona</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="descricao"
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
          </FormComponent.Line>

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
              Editar Armário/Zona
            </FormComponent.Button>
            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_login"
              handlePress={props.form.handleSubmit(props.onSubmitRemove)}
            >
              Remover Armário/Zona
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
