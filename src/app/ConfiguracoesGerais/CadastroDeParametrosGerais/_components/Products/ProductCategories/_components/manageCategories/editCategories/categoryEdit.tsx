import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type ProductCategory } from "~/server/interfaces/productCategory/productCategory.route.interfaces";
import { useCategoryForm } from "./useCategoryForm";

type CategoryEditForm = {
  category: ProductCategory;
};

export const CategoryEdit = (props: CategoryEditForm) => {
  const categoryEditForm = useCategoryForm(props.category);

  return (
    <Form {...categoryEditForm.form}>
      <form
        onSubmit={categoryEditForm.form.handleSubmit(
          categoryEditForm.onSubmitEdit,
        )}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Categoria do Produto</FormComponent.Label>
              <FormField
                control={categoryEditForm.form.control}
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
                    "Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita!",
                  );
                  if (confirmed) {
                    categoryEditForm.onSubmitRemove();
                  }
                }}
              >
                Excluir
              </FormComponent.Button>
              <FormComponent.Button
                className="bg-verde_botao hover:bg-hover_verde_botao"
                handlePress={categoryEditForm.form.handleSubmit(
                  categoryEditForm.onSubmitEdit,
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
