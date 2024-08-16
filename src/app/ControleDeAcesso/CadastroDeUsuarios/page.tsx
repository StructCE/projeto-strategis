"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const createUserFormSchema = z
  .object({
    email: z
      .string({
        required_error: "Por favor digite um email.",
      })
      .email({
        message: "Email inválido.",
      }),
    password: z
      .string({
        required_error: "Por favor digite uma senha.",
      })
      .min(8, {
        message: "A senha deve ter pelo menos 8 caracteres.",
      })
      .max(128, {
        message: "A senha deve ter no máximo 128 caracteres.",
      }),
    password_confirmation: z.string({
      required_error: "Por favor confirme a senha.",
    }),
    username: z
      .string()
      .min(3, {
        message: "Nome deve ter pelo menos 3 caracteres.",
      })
      .max(60, {
        message: "Nome deve ter no máximo 60 caracteres.",
      }),
    phone: z
      .string()
      .min(8, {
        message:
          "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
      })
      .max(16, {
        message:
          "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
      })
      .optional(),
    empresa: z.string({
      required_error: "Por favor selecione uma empresa.",
    }),
    cargo: z.string({
      required_error: "Por favor selecione um cargo.",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem.",
    path: ["password_confirmation"],
  });

type CreateUserFormValues = z.infer<typeof createUserFormSchema>;

export default function Home() {
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateUserFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar usuário
  }

  return (
    <div className="m-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormComponent>
            <FormComponent.Title>Cadastro de Usuário</FormComponent.Title>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Email</FormComponent.Label>
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
    </div>
  );
}
