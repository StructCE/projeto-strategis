"use client";
import { FormComponent } from "~/components/forms/index";
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
import { roles } from "../../../CadastroDeFornecedores/_components/supplierData";
import { shelfs, stockCompanies, zones } from "../stockData";
import { useStockForm } from "./useStockForm";

export const StockRegister = () => {
  const form = useStockForm();
  return (
    <Form {...form.form}>
      <form onSubmit={form.form.handleSubmit(form.onSubmit)}>
        <FormComponent>
          <FormComponent.Title>Cadastrar Estoque</FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Código</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Código do Estoque"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
            <FormComponent.Frame>
              <FormComponent.Label>Nome</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Nome do estoque"
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
                control={form.form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Empresa do estoque" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stockCompanies.map((company, index) => (
                          <SelectItem value={company.value} key={index}>
                            {company.value}
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

          <FormComponent.BoxSpecify boxName="Responsável pelo Estoque">
            {form.fieldsArray.map((stockRepresentative, index) => (
              <FormComponent.Line key={stockRepresentative.id}>
                <FormComponent.Frame>
                  <FormComponent.Label>Nome</FormComponent.Label>
                  <FormField
                    control={form.form.control}
                    name={`stockRepresentative.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                            placeholder="Nome do contato"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormComponent.Frame>

                <FormComponent.Frame>
                  <FormComponent.Label>Cargo</FormComponent.Label>
                  <FormField
                    control={form.form.control}
                    name={`stockRepresentative.${index}.role`}
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
                            {roles.map((role, i) => (
                              <SelectItem value={role.value} key={i}>
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

                <FormComponent.Frame>
                  <FormComponent.Label>Email</FormComponent.Label>
                  <FormField
                    control={form.form.control}
                    name={`stockRepresentative.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                            placeholder="Endereço de email do responsável"
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
                    control={form.form.control}
                    name={`stockRepresentative.${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                            placeholder="(XX) XXXXX-XXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormComponent.Frame>
              </FormComponent.Line>
            ))}
          </FormComponent.BoxSpecify>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Endereço do Estoque</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="stockAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Selecione um Endereço"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Armários/Zonas</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="zone"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um ou mais Armários/Zonas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {zones.map((zone, index) => (
                          <SelectItem value={zone.value} key={index}>
                            {zone.nome}
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
              <FormComponent.Label>Prateleiras</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="shelf"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione uma ou mais Prateleiras" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shelfs.map((shelf, index) => (
                          <SelectItem value={shelf.value} key={index}>
                            {shelf.nome}
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
              Cadastrar Estoque
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
