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
import { companies, roles } from "../usersData";
import { useUserForm } from "./useUserForm";

export const UserRegister = () => {
  const userForm = useUserForm();
  return (
    <Form {...userForm.form}>
      <form onSubmit={userForm.form.handleSubmit(userForm.onSubmit)}>
        <FormComponent>
          <FormComponent.Title>Cadastro de Usuário</FormComponent.Title>

          <FormComponent.Line>
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
              <FormComponent.Label>Senha</FormComponent.Label>
              <FormField
                control={userForm.form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Crie uma senha para acesso ao sistema"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Confirme a senha</FormComponent.Label>
              <FormField
                control={userForm.form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Confirme a senha"
                        type="password"
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
              <FormComponent.Label>Nome</FormComponent.Label>
              <FormField
                control={userForm.form.control}
                name="username"
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
                          <SelectItem value={company.value} key={index}>
                            {company.name}
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
                          <SelectItem value={role.value} key={index}>
                            {role.name}
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
