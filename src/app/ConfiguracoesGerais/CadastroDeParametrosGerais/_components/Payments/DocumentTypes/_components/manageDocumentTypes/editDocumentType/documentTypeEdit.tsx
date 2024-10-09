import {
  type DocumentType,
} from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useDocumentTypeForm } from "./useDocumentTypeForm";

type DocumentTypeEditForm = {
  documentType: DocumentType;
};

export const DocumentTypeEdit = (props: DocumentTypeEditForm) => {
  const documentTypeEditForm = useDocumentTypeForm(props.documentType);

  return (
    <Form {...documentTypeEditForm.form}>
      <form
        onSubmit={documentTypeEditForm.form.handleSubmit(
          documentTypeEditForm.onSubmitEdit,
        )}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Tipo de Documento</FormComponent.Label>
              <FormField
                control={documentTypeEditForm.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-0.5 border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Descrição/nome do tipo de documento"
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
              Editar Tipo de Documento
            </FormComponent.Button>
            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2"
              handlePress={documentTypeEditForm.form.handleSubmit(
                documentTypeEditForm.onSubmitRemove,
              )}
            >
              Remover Tipo de Documento
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
