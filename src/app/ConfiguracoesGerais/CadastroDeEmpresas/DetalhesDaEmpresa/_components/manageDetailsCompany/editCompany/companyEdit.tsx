"use client";
import { Upload } from "lucide-react";
import { useState } from "react";
import {
  companies,
  type Company,
} from "~/app/ConfiguracoesGerais/CadastroDeEmpresas/_components/companiesData";
import { FormComponent } from "~/components/forms/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { MultiSelect } from "~/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  roles,
  states,
  suppliers,
} from "../../../../../CadastroDeFornecedores/_components/supplierData";
import { useCompanyForm } from "./useCompanyForm";

type CompanyEditProps = {
  company: Company;
};

export const CompanyEdit = (props: CompanyEditProps) => {
  const editCompanyForm = useCompanyForm(props.company);
  const [companyType, setCompanyType] = useState<string>(
    props.company.company_type,
  );

  return (
    <Form {...editCompanyForm.form}>
      <form
        onSubmit={editCompanyForm.form.handleSubmit(
          editCompanyForm.onSubmitEdit,
        )}
      >
        <FormComponent>
          <FormComponent.Title>{props.company.name}</FormComponent.Title>
          <FormComponent.Label>
            Utilize os campos abaixo para editar os dados da empresa ou o botão
            para remover
          </FormComponent.Label>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Empresa</FormComponent.Label>
              <FormField
                control={editCompanyForm.form.control}
                name="name"
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
                control={editCompanyForm.form.control}
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
              <FormComponent.Label>Fornecedores</FormComponent.Label>
              <FormField
                control={editCompanyForm.form.control}
                name="suppliers"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultiSelect
                        options={suppliers.flatMap((supplier) => ({
                          label: supplier.name,
                          value: supplier.name,
                        }))}
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? []}
                        placeholder="Selecione um ou mais fornecedores"
                        variant="inverted"
                        maxCount={2}
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
                control={editCompanyForm.form.control}
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
                control={editCompanyForm.form.control}
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
                control={editCompanyForm.form.control}
                name="state_registration"
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
          </FormComponent.Line>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Tipo de Empresa</FormComponent.Label>
              <FormField
                control={editCompanyForm.form.control}
                name="company_type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        setCompanyType(value);
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Matriz">Matriz</SelectItem>
                        <SelectItem value="Filial">Filial</SelectItem>
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
                control={editCompanyForm.form.control}
                name="company_headquarters.name"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={companyType !== "Filial"}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione uma matriz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies.map((company, index) => (
                          <SelectItem value={company.name} key={index}>
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
              <FormComponent.Label>Regime Tributário</FormComponent.Label>
              <FormField
                control={editCompanyForm.form.control}
                name="tax_regime"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um tipo de regime tributário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Lucro Real (LR)">
                          Lucro Real (LR)
                        </SelectItem>
                        <SelectItem value="Lucro Presumido (LP)">
                          Lucro Presumido (LP)
                        </SelectItem>
                        <SelectItem value="Simples Nacional (SN)">
                          Simples Nacional (SN)
                        </SelectItem>
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
                control={editCompanyForm.form.control}
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
                control={editCompanyForm.form.control}
                name="neighborhood"
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
                control={editCompanyForm.form.control}
                name="city"
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
                control={editCompanyForm.form.control}
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
                control={editCompanyForm.form.control}
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
            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Nome</FormComponent.Label>
                <FormField
                  control={editCompanyForm.form.control}
                  name={`legal_representative.name`}
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
                  control={editCompanyForm.form.control}
                  name={`legal_representative.role`}
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
                  control={editCompanyForm.form.control}
                  name={`legal_representative.email`}
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
                  control={editCompanyForm.form.control}
                  name={`legal_representative.phone`}
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
              <FormComponent.Label>
                Endereço Local dos Arquivos XML
              </FormComponent.Label>
              <FormField
                control={editCompanyForm.form.control}
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
            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_login"
              handlePress={editCompanyForm.form.handleSubmit(
                editCompanyForm.onSubmitRemove,
              )}
            >
              Remover Empresa
            </FormComponent.Button>
            <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
              Editar Empresa
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};