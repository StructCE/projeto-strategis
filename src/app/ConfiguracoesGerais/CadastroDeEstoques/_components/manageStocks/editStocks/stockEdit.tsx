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
import { roles } from "../../../../CadastroDeFornecedores/_components/supplierData";
import {
  shelfs,
  stockCompanies,
  stocksAddress,
  zones,
  type Stock,
} from "../../stockData";
import { useStockForm } from "./useStockForm";

type StockEditProps = {
  stock: Stock;
};

export const StockEdit = (props: StockEditProps) => {
  const form = useStockForm(props.stock);
  return (
    <Form {...form.form}>
      <form onSubmit={form.form.handleSubmit(form.onSubmitEdit)}>
        <FormComponent>
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
              <FormComponent.Line>
                <FormComponent.Frame>
                  <FormComponent.Label>Empresa</FormComponent.Label>
                  <FormField
                    control={form.form.control}
                    name={`company`}
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
                                {company.nome}
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
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.BoxSpecify boxName="Responsável pelo Estoque">
            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Nome</FormComponent.Label>
                <FormField
                  control={form.form.control}
                  name={`stockRepresentative.name`}
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
                  name={`stockRepresentative.role`}
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
                  name={`stockRepresentative.email`}
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
                  name={`stockRepresentative.phone`}
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
          </FormComponent.BoxSpecify>

          <FormComponent.Line>
            <FormComponent.Frame>
              {form.fieldsArray.map((stockAddress, index) => (
                <FormComponent.Line key={stockAddress.id}>
                  <FormComponent.Frame>
                    <FormComponent.Label>
                      Endereço do Estoque
                    </FormComponent.Label>
                    <FormField
                      control={form.form.control}
                      name={`stockAddress.${index}.nameStockAddress`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                                <SelectValue placeholder="Selecione um endereço" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {stocksAddress.map((address, index) => (
                                <SelectItem value={address.value} key={index}>
                                  {address.nome}
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
              ))}
            </FormComponent.Frame>

            <FormComponent.Frame>
              {form.fieldsArray.map((zone, index) => (
                <FormComponent.Line key={zone.id}>
                  <FormComponent.Frame>
                    <FormComponent.Label>Armários/Zonas</FormComponent.Label>
                    <FormField
                      control={form.form.control}
                      name={`zone.${index}.nameZone`}
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
                </FormComponent.Line>
              ))}
            </FormComponent.Frame>

            <FormComponent.Frame>
              {form.fieldsArray.map((shelf, index) => (
                <FormComponent.Line key={shelf.id}>
                  <FormComponent.Frame>
                    <FormComponent.Label>Prateleiras</FormComponent.Label>
                    <FormField
                      control={form.form.control}
                      name={`shelf.${index}.nameShelf`}
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
              ))}
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
              Editar Estoque
            </FormComponent.Button>

            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_login"
              handlePress={form.form.handleSubmit(form.onSubmitRemove)}
            >
              Remover Estoque
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
