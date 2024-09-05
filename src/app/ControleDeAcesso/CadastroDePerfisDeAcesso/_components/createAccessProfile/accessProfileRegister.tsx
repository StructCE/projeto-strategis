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
import { modules } from "./accessProfileData";
import { useAccessProfileForm } from "./useAccessProfileForm";

export const AccessProfilesRegister = () => {
  const accessProfileForm = useAccessProfileForm();

  return (
    <Form {...accessProfileForm.form}>
      <form
        onSubmit={accessProfileForm.form.handleSubmit(
          accessProfileForm.onSubmit,
        )}
      >
        <FormComponent>
          <FormComponent.Title>
            Cadastro de Perfil de Acesso
          </FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Nome</FormComponent.Label>
              <FormField
                control={accessProfileForm.form.control}
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
                control={accessProfileForm.form.control}
                name="modules"
                render={({ field }) => (
                  <FormItem>
                    <MultiSelect
                      options={modules}
                      onValueChange={accessProfileForm.setSelectedModules}
                      defaultValue={accessProfileForm.selectedModules}
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
            <FormComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao">
              Criar Perfil de Acesso
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
