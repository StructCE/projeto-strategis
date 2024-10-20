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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { states } from "../../../CadastroDeFornecedores/_components/supplierData";
import { useCompanyForm } from "./useCompanyForm";
import { api } from "~/trpc/react";

export const CompanyRegister = () => {
  const companyForm = useCompanyForm();
  const suppliers = api.supplier.getAll.useQuery();
  const users = api.user.getAll.useQuery();
  const companies = api.company.getAllCompanies.useQuery();

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
              <FormComponent.Label>Fornecedores</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name="suppliers"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {suppliers.data && (
                        <MultiSelect
                          options={suppliers.data?.map((supplier) => ({
                            label: supplier.name,
                            value: supplier.id,
                          }))}
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? []}
                          placeholder="Selecione um ou mais fornecedores"
                          variant="inverted"
                          maxCount={3}
                        />
                      )}
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
                name="stateRegistration"
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
              <FormComponent.Label>Representante Legal</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name="legalResponsibleId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um usuário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.data?.map((user, index) => (
                          <SelectItem
                            about={user.name}
                            value={user.id}
                            key={index}
                          >
                            {user.name}
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
              <FormComponent.Label>Tipo de Empresa</FormComponent.Label>
              <FormField
                control={companyForm.form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        // setCompanyType(value);
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
                control={companyForm.form.control}
                name="headquarters"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      // disabled={companyType !== "Filial"}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione uma matriz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies.data?.map((company, index) => (
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
                control={companyForm.form.control}
                name="taxRegime"
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
                control={companyForm.form.control}
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
                control={companyForm.form.control}
                name="federativeUnit"
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

          {/* <FormComponent.Line>
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
          </FormComponent.Line> */}

          <FormComponent.ButtonLayout>
            <FormComponent.Button
              className="bg-verde_botao hover:bg-hover_verde_botao"
              handlePress={() => companyForm.onSubmit}
            >
              Cadastrar Empresa
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
