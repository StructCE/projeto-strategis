"use client";
import { FormComponent } from "~/components/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { MultiSelect } from "~/components/ui/multi-select";
import { modules, type Role } from "../../accessProfileData";
import { useAccessProfileForm } from "./useAccessProfileForm";

type AccessProfileEditForm = {
  role: Role;
};

export const AccessProfileEdit = (props: AccessProfileEditForm) => {
  const accessProfileEditForm = useAccessProfileForm(props.role);

  return (
    <Form {...accessProfileEditForm.form}>
      <form
        onSubmit={accessProfileEditForm.form.handleSubmit(
          accessProfileEditForm.onSubmitEdit,
        )}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Nome</FormComponent.Label>
              <FormField
                control={accessProfileEditForm.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Nome do 'cargo'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Módulos de acesso</FormComponent.Label>
              <FormField
                control={accessProfileEditForm.form.control}
                name="modules"
                render={({ field }) => (
                  <FormItem>
                    <MultiSelect
                      options={modules}
                      onValueChange={accessProfileEditForm.setSelectedModules}
                      defaultValue={accessProfileEditForm.selectedModules}
                      placeholder="Selecione um ou mais conteúdos para o cargo ter acesso"
                      variant="inverted"
                      maxCount={2}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
              Editar Perfil de Acesso
            </FormComponent.Button>
            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_login"
              handlePress={accessProfileEditForm.form.handleSubmit(
                accessProfileEditForm.onSubmitRemove,
              )}
            >
              Remover Perfil de Acesso
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
