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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
import { useUserForm } from "./useUserForm";

export const UserRegister = () => {
  const userForm = useUserForm();

  const { data: companies = [] } = api.company.getAllCompanies.useQuery();
  const { data: roles = [] } = api.role.getAll.useQuery();

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Form {...userForm.form}>
      <form onSubmit={userForm.form.handleSubmit(userForm.onSubmit)}>
        <FormComponent>
          <FormComponent.Title>Cadastro de Usuário</FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Nome</FormComponent.Label>
              <FormField
                control={userForm.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Nome completo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Email</FormComponent.Label>
              <FormField
                control={userForm.form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Endereço de email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Telefone</FormComponent.Label>
              <FormField
                control={userForm.form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="(XX)XXXXX-XXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Empresa</FormComponent.Label>
              <FormField
                control={userForm.form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione uma empresa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies.map((company, index) => (
                          <SelectItem value={company.id} key={index}>
                            {capitalizeFirstLetter(company.name)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Cargo</FormComponent.Label>
              <FormField
                control={userForm.form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role, index) => (
                          <SelectItem value={role.id} key={index}>
                            {capitalizeFirstLetter(role.name)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao">
              Criar Usuário
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
