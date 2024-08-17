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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type CreateUserFormValues } from "./formSchema";

type UserRegisterProps = {
  form: UseFormReturn<CreateUserFormValues>;
  onSubmit: (data: CreateUserFormValues) => void;
};

export const UserRegister = (props: UserRegisterProps) => {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <FormComponent>
          <FormComponent.Title>Cadastro de Usuário</FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Email</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-[#DEE2E6] bg-white placeholder:text-[#ADB5BD]"
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
                control={props.form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-[#DEE2E6] bg-white placeholder:text-[#ADB5BD]"
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
                control={props.form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-[#DEE2E6] bg-white placeholder:text-[#ADB5BD]"
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
                control={props.form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-[#DEE2E6] bg-white placeholder:text-[#ADB5BD]"
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
                control={props.form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-[#DEE2E6] bg-white placeholder:text-[#ADB5BD]"
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
                control={props.form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-[#DEE2E6] bg-white placeholder-[#ADB5BD]">
                          <SelectValue placeholder="Selecione uma empresa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Empresa 1">Empresa 1</SelectItem>
                        <SelectItem value="Empresa 2">Empresa 2</SelectItem>
                        <SelectItem value="Empresa 3">Empresa 3</SelectItem>
                        <SelectItem value="Empresa 4">Empresa 4</SelectItem>
                        <SelectItem value="Empresa 5">Empresa 5</SelectItem>
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
                control={props.form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-[#DEE2E6] bg-white placeholder-[#ADB5BD]">
                          <SelectValue placeholder="Selecione um cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Administrador">
                          Administrador
                        </SelectItem>
                        <SelectItem value="Operador">Operador</SelectItem>
                        <SelectItem value="Estoquista">Estoquista</SelectItem>
                        <SelectItem value="Requisitante">
                          Requisitante
                        </SelectItem>
                        <SelectItem value="Personalizado">
                          Personalizado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-[#28A745] hover:bg-[#309147]">
              Criar Usuário
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
