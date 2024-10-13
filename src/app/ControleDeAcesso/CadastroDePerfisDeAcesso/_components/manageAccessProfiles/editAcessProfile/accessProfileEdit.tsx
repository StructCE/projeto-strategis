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
import { type RoleWithModules } from "~/server/interfaces/role/role.route.interfaces";
import { modules } from "../../accessProfileData";
import { useAccessProfileForm } from "./useAccessProfileForm";

type AccessProfileEditForm = {
  role: RoleWithModules;
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
                      options={modules.flatMap((module) => ({
                        label: module.name,
                        value: module.code.toString(),
                      }))}
                      onValueChange={field.onChange}
                      defaultValue={
                        Array.isArray(field.value)
                          ? field.value.map(String)
                          : []
                      }
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
            <FormComponent.ButtonLayout>
              <FormComponent.Button
                className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2"
                handlePress={() => {
                  const confirmed = window.confirm(
                    "Tem certeza que deseja excluir este cargo? Esta ação não pode ser desfeita.",
                  );
                  if (confirmed) {
                    accessProfileEditForm.onSubmitRemove();
                  }
                }}
              >
                Excluir
              </FormComponent.Button>
              <FormComponent.Button
                className="bg-verde_botao hover:bg-hover_verde_botao"
                handlePress={accessProfileEditForm.form.handleSubmit(
                  accessProfileEditForm.onSubmitEdit,
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
