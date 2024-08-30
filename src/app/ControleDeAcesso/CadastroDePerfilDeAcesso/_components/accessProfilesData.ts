export type Module = {
  label: string;
  value: string;
};

export const modules: Module[] = [
  {
    label: "Cadastrar Empresas",
    value: "cadastrar_empresa",
  },
  {
    label: "Cadastrar Perfis",
    value: "cadastrar_perfis",
  },
  {
    label: "Cadastrar Usuários",
    value: "cadastrar_usuarios",
  },
  {
    label: "Dar Permissões de Acesso",
    value: "dar_permissoes_acesso",
  },
  {
    label: "Importar NFs",
    value: "importar_nfs",
  },
  {
    label: "Validar Dados Cadastrados",
    value: "validar_dados_cadastrados",
  },
  {
    label: "Dar Entrada de Mercadorias",
    value: "dar_entrada_mercadorias",
  },
  {
    label: "Cadastrar Fornecedores",
    value: "cadastrar_fornecedores",
  },
  {
    label: "Gerar Relatórios de Estoque",
    value: "gerar_relatorios_estoque",
  },
  {
    label: "Dar Saída de Mercadorias",
    value: "dar_saida_mercadorias",
  },
  {
    label: "Fazer Inventário",
    value: "fazer_inventario",
  },
  {
    label: "Fazer Ajuste de Estoque",
    value: "fazer_ajuste_estoque",
  },
  {
    label: "Requisitar Mercadorias do Estoque",
    value: "requisitar_mercadorias_estoque",
  },
  {
    label: "Dar Aceite de Mercadorias Recebidas",
    value: "dar_aceite_mercadorias_recebidas",
  },
];

export type Role = {
  name: string;
  modules: Module[];
};

export const roles: Role[] = [
  {
    name: "Administrador",
    modules: [
      {
        label: "Cadastrar Empresas",
        value: "cadastrar_empresa",
      },
      {
        label: "Cadastrar Perfis",
        value: "cadastrar_perfis",
      },
      {
        label: "Cadastrar Usuários",
        value: "cadastrar_usuarios",
      },
      {
        label: "Dar Permissões de Acesso",
        value: "dar_permissoes_acesso",
      },
      {
        label: "Importar NFs de Qualquer Empresa",
        value: "importar_nfs_qualquer_empresa",
      },
      {
        label: "Validar Dados Cadastrados",
        value: "validar_dados_cadastrados",
      },
      {
        label: "Gerar Relatórios",
        value: "gerar_relatorios",
      },
      {
        label: "Dar Entrada de Mercadorias",
        value: "dar_entrada_mercadorias",
      },
      {
        label: "Cadastrar Fornecedores",
        value: "cadastrar_fornecedores",
      },
      {
        label: "Gerar Relatórios de Estoque",
        value: "gerar_relatorios_estoque",
      },
      {
        label: "Dar Saída de Mercadorias",
        value: "dar_saida_mercadorias",
      },
      {
        label: "Fazer Inventário",
        value: "fazer_inventario",
      },
      {
        label: "Fazer Ajuste de Estoque",
        value: "fazer_ajuste_estoque",
      },
      {
        label: "Importar NFs da Sua Empresa",
        value: "importar_nfs_sua_empresa",
      },
      {
        label: "Requisitar Mercadorias do Estoque",
        value: "requisitar_mercadorias_estoque",
      },
      {
        label: "Dar Aceite de Mercadorias Recebidas",
        value: "dar_aceite_mercadorias_recebidas",
      },
    ],
  },
  {
    name: "Operador",
    modules: [
      {
        label: "Cadastrar Usuários",
        value: "cadastrar_usuarios",
      },
      {
        label: "Importar NFs de Qualquer Empresa",
        value: "importar_nfs_qualquer_empresa",
      },
      {
        label: "Validar Dados Cadastrados",
        value: "validar_dados_cadastrados",
      },
      {
        label: "Gerar Relatórios",
        value: "gerar_relatorios",
      },
    ],
  },
  {
    name: "Estoquista",
    modules: [
      {
        label: "Dar Entrada de Mercadorias",
        value: "dar_entrada_mercadorias",
      },
      {
        label: "Cadastrar Fornecedores",
        value: "cadastrar_fornecedores",
      },
      {
        label: "Gerar Relatórios de Estoque",
        value: "gerar_relatorios_estoque",
      },
      {
        label: "Dar Saída de Mercadorias",
        value: "dar_saida_mercadorias",
      },
      {
        label: "Fazer Inventário",
        value: "fazer_inventario",
      },
      {
        label: "Fazer Ajuste de Estoque",
        value: "fazer_ajuste_estoque",
      },
      {
        label: "Importar NFs da Sua Empresa",
        value: "importar_nfs_sua_empresa",
      },
    ],
  },
  {
    name: "Requisitante",
    modules: [
      {
        label: "Requisitar Mercadorias do Estoque",
        value: "requisitar_mercadorias_estoque",
      },
      {
        label: "Dar Aceite de Mercadorias Recebidas",
        value: "dar_aceite_mercadorias_recebidas",
      },
    ],
  },
  {
    name: "Personalizado 1",
    modules: [
      {
        label: "Dar Entrada de Mercadorias",
        value: "dar_entrada_mercadorias",
      },
      {
        label: "Cadastrar Fornecedores",
        value: "cadastrar_fornecedores",
      },
      {
        label: "Gerar Relatórios de Estoque",
        value: "gerar_relatorios_estoque",
      },
      {
        label: "Dar Saída de Mercadorias",
        value: "dar_saida_mercadorias",
      },
      {
        label: "Fazer Inventário",
        value: "fazer_inventario",
      },
      {
        label: "Fazer Ajuste de Estoque",
        value: "fazer_ajuste_estoque",
      },
      {
        label: "Importar NFs da Sua Empresa",
        value: "importar_nfs_sua_empresa",
      },
      {
        label: "Requisitar Mercadorias do Estoque",
        value: "requisitar_mercadorias_estoque",
      },
      {
        label: "Dar Aceite de Mercadorias Recebidas",
        value: "dar_aceite_mercadorias_recebidas",
      },
    ],
  },
];
