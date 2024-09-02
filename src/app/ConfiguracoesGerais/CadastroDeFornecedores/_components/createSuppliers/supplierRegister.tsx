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
import { states } from "../supplierData";
import { type CreateSupplierFormValues } from "./supplierRegisterFormSchema";

type SupplierRegisterProps = {
  form: UseFormReturn<CreateSupplierFormValues>;
  onSubmit: (data: CreateSupplierFormValues) => void;
};

export const SupplierRegister = (props: SupplierRegisterProps) => {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <FormComponent>
          <FormComponent.Title>Cadastro de Fornecedor</FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Nome</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Nome do fornecedor/empresa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
            <FormComponent.Frame>
              <FormComponent.Label>CNPJ</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="XX.XXX.XXX/XXXX-XX"
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
              <FormComponent.Label>Email</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
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
                control={props.form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="(XX) XXXX-XXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
            <FormComponent.Frame>
              <FormComponent.Label>Inscrição Estadual</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="state_registration"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="XXXXXXXXXXXXX"
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
              <FormComponent.Label>Endereço</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Endereço do fornecedor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Bairro</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Bairro do fornecedor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
            <FormComponent.Frame>
              <FormComponent.Label>Município/Cidade</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Cidade do fornecedor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
            <FormComponent.Frame>
              <FormComponent.Label>Unidade Federativa</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione uma UF" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state, index) => (
                          <SelectItem value={state.value} key={index}>
                            {state.name}
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
              <FormComponent.Label>CEP</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="XXXXX-XXX"
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
            <FormComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao">
              Criar Fornecedor
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
