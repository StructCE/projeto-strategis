import { FormComponent } from "~/components/forms/formsContainer";

export default function Home() {
  return (
    <div className="flex flex-col gap-[8px] p-[32px]">
      {/* <h1 className="">STRATEGIS</h1> */}
      <FormComponent>
        <FormComponent.Title>Cadastrar Usuário</FormComponent.Title>
        <FormComponent.Line>
          <FormComponent.Frame>
            <FormComponent.Label>Email</FormComponent.Label>
            <FormComponent.Input
              placeholder="Endereço de email"
              type="email"
            ></FormComponent.Input>
          </FormComponent.Frame>
          <FormComponent.Frame>
            <FormComponent.Label>Senha</FormComponent.Label>
            <FormComponent.Input
              placeholder="Crie uma senha para acesso ao sistema"
              type="password"
            ></FormComponent.Input>
          </FormComponent.Frame>
          <FormComponent.Frame>
            <FormComponent.Label>Confirmar Senha</FormComponent.Label>
            <FormComponent.Input
              placeholder="Confirme a senha"
              type="password"
            ></FormComponent.Input>
          </FormComponent.Frame>
        </FormComponent.Line>

        <FormComponent.Line>
          <FormComponent.Frame>
            <FormComponent.Label>Nome</FormComponent.Label>
            <FormComponent.Input placeholder="Nome completo"></FormComponent.Input>
          </FormComponent.Frame>
          <FormComponent.Frame>
            <FormComponent.Label>Telefone</FormComponent.Label>
            <FormComponent.Input
              placeholder="(XX) XXXXX-XXXX"
              type="tel"
            ></FormComponent.Input>
          </FormComponent.Frame>
          <FormComponent.Frame>
            <FormComponent.Label>Empresa</FormComponent.Label>
            <FormComponent.Select
              placeholder="Selecione uma empresa"
              values={[
                "Empresa 1",
                "Empresa 2",
                "Empresa 3",
                "Empresa 4",
                "Empresa 5",
              ]}
            ></FormComponent.Select>
          </FormComponent.Frame>
          <FormComponent.Frame>
            <FormComponent.Label>Cargo</FormComponent.Label>
            <FormComponent.Select
              placeholder="Selecione um cargo"
              values={[
                "Administrador",
                "Operador",
                "Estoquista",
                "Requisitante",
                "Personalizado",
              ]}
            ></FormComponent.Select>
          </FormComponent.Frame>
        </FormComponent.Line>

        <FormComponent.Line>
          <FormComponent.Frame>
            <FormComponent.Label>Empresa</FormComponent.Label>
            <FormComponent.Input placeholder="Nome da empresa"></FormComponent.Input>
          </FormComponent.Frame>
          <FormComponent.Frame>
            <FormComponent.Label>CNPJ</FormComponent.Label>
            <FormComponent.Input placeholder="XX.XXX.XXX/XXXX-XX"></FormComponent.Input>
          </FormComponent.Frame>
          <FormComponent.Frame>
            <FormComponent.Label>Tipo de Empresa</FormComponent.Label>
            <FormComponent.Select
              placeholder="Selecione um cargo"
              values={["Matriz", "Filial"]}
            ></FormComponent.Select>
          </FormComponent.Frame>
        </FormComponent.Line>
        <FormComponent.ButtonLayout>
          <FormComponent.Button className="bg-[#28A745] hover:bg-[#309147]">
            Criar Usuário
          </FormComponent.Button>
        </FormComponent.ButtonLayout>
      </FormComponent>
    </div>
  );
}
