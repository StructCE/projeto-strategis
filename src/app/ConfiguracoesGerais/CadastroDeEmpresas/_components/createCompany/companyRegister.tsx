"use client";
import { Upload } from "lucide-react";
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
import {
  EmpresaMatriz,
  RegimeTribuario,
  TipoEmpresa,
} from "../manageCompany/companiesData";
import { useCompanies } from "./useCompaniesRegister";

import {
  roles,
  states,
} from "../../../CadastroDeFornecedores/_components/supplierData";

export const CompanyRegister = () => {
  const companyForm = useCompanies();

  return (
    <Form {...companyForm.form}>
      <form onSubmit={companyForm.form.handleSubmit(companyForm.onSubmit)}>
        <FormComponent>
          <FormComponent.Title>Cadastro de Empresa</FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Empresa</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Nome da empresa"
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
                control={companyForm.form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="XX.XXX.XXX/XXXX-XX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Tipo de Empresa</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name="tipo_empresa"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TipoEmpresa.map((tipo, index) => (
                          <SelectItem value={tipo.value} key={index}>
                            {tipo.nome}
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
              <FormComponent.Label>Matriz da Empresa</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name="matriz_empresa"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione uma matriz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EmpresaMatriz.map((matriz, index) => (
                          <SelectItem value={matriz.value} key={index}>
                            {matriz.nome}
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
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Email</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
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
                control={companyForm.form.control}
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
              <FormComponent.Label>Inscrição Estadual</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name="inscricao_estadual"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="XXXXXXXXXXXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Regime Tributário</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name="regime_tributario"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="LR/LP/SN" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RegimeTribuario.map((regimeTribuario, index) => (
                          <SelectItem value={regimeTribuario.value} key={index}>
                            {regimeTribuario.tributo}
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
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Endereço</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="ex: SQS 410 Bl. E"
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
                control={companyForm.form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="ex: Asa Norte"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Município</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name="municipio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="ex: Brasília"
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
                control={companyForm.form.control}
                name="uf"
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
                control={companyForm.form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
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

          <FormComponent.BoxSpecify boxName="Responsável Legal">
            {companyForm.fieldsArray.map((contact, index) => (
              <FormComponent.Line key={contact.id}>
                <FormComponent.Frame>
                  <FormComponent.Label>Nome</FormComponent.Label>
                  <FormField
                    control={companyForm.form.control}
                    name={`legalRepresentative.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                            placeholder="Nome do Responsável Legal"
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
                    control={companyForm.form.control}
                    name={`legalRepresentative.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                              <SelectValue placeholder="Cargo" />
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
                    control={companyForm.form.control}
                    name={`legalRepresentative.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                            placeholder="email@email.com"
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
                    control={companyForm.form.control}
                    name={`legalRepresentative.${index}.phone`}
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
              <FormComponent.Label>
                Endereço Local dos Arquivos XML
              </FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name={"address_file_XML"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex max-w-full items-center">
                        <Input
                          type="file"
                          className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                          placeholder="Endereço"
                          {...field}
                        />
                        <Upload className="absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>
          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao">
              Cadastrar Empresa
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
