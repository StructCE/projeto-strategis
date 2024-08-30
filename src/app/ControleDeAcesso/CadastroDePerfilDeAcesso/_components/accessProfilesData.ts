export type Module = {
  label: string;
  value: string;
};

export const modules: Module[] = [
  {
    // Administrador
    label: "Cadastrar Empresas",
    value: "cadastrar_empresa",
  },
  {
    // Administrador e Estoquista
    label: "Cadastrar Fornecedores",
    value: "cadastrar_fornecedores",
  },
  {
    // Administrador e Estoquista
    label: "Cadastrar Produtos",
    value: "cadastrar_produtos",
  },
  {
    // Administrador e Operador
    label: "Cadastrar Estoques",
    value: "cadastrar_estoques",
  },
  {
    // Administrador e Operador
    label: "Cadastrar Parâmetros Gerais",
    value: "cadastrar_parametros_gerais",
  },
  {
    // Administrador e Operador
    label: "Cadastrar Usuários",
    value: "cadastrar_usuarios",
  },
  {
    // Administrador
    label: "Cadastrar Perfis",
    value: "cadastrar_perfis",
  },
  {
    // Administrador
    label: "Dar Permissões de Acesso",
    value: "dar_permissoes_acesso",
  },
  {
    // Administrador e Operador
    label: "Importar NFs de Qualquer Empresa",
    value: "importar_nfs_qualquer_empresa",
  },
  {
    // Administrador e Estoquista
    label: "Importar NFs da Sua Empresa",
    value: "importar_nfs_sua_empresa",
  },
  {
    // Administrador e Estoquista
    label: "Dar Entrada de Mercadorias",
    value: "dar_entrada_mercadorias",
  },
  {
    // Administrador e Estoquista
    label: "Dar Saída de Mercadorias",
    value: "dar_saida_mercadorias",
  },
  {
    // Administrador, Operador e Estoquista
    label: "Comprar Mercadorias",
    value: "comprar_mercadorias",
  },
  {
    // Administrador e Estoquista
    label: "Fazer Inventários",
    value: "fazer_inventarios",
  },
  {
    // Administrador e Estoquista
    label: "Fazer Ajustes de Estoque",
    value: "fazer_ajustes_estoque",
  },
  {
    // Administrador e Requisitante
    label: "Requisitar Mercadorias do Estoque",
    value: "requisitar_mercadorias_estoque",
  },
  {
    // Administrador e Requisitante
    label: "Dar Aceite de Mercadorias Recebidas",
    value: "dar_aceite_mercadorias_recebidas",
  },
  {
    // Administrador, Operador e Estoquista
    label: "Gerar Relatórios de Estoque",
    value: "gerar_relatorios_estoque",
  },
  {
    // Administrador
    label: "Visualizar Históricos",
    value: "visualizar_historicos",
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
        label: "Cadastrar Fornecedores",
        value: "cadastrar_fornecedores",
      },
      {
        label: "Cadastrar Produtos",
        value: "cadastrar_produtos",
      },
      {
        label: "Cadastrar Estoques",
        value: "cadastrar_estoques",
      },
      {
        label: "Cadastrar Parâmetros Gerais",
        value: "cadastrar_parametros_gerais",
      },
      {
        label: "Cadastrar Usuários",
        value: "cadastrar_usuarios",
      },
      {
        label: "Cadastrar Perfis",
        value: "cadastrar_perfis",
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
        label: "Importar NFs da Sua Empresa",
        value: "importar_nfs_sua_empresa",
      },
      {
        label: "Dar Entrada de Mercadorias",
        value: "dar_entrada_mercadorias",
      },
      {
        label: "Dar Saída de Mercadorias",
        value: "dar_saida_mercadorias",
      },
      {
        label: "Comprar Mercadorias",
        value: "comprar_mercadorias",
      },
      {
        label: "Fazer Inventários",
        value: "fazer_inventarios",
      },
      {
        label: "Fazer Ajustes de Estoque",
        value: "fazer_ajustes_estoque",
      },
      {
        label: "Requisitar Mercadorias do Estoque",
        value: "requisitar_mercadorias_estoque",
      },
      {
        label: "Dar Aceite de Mercadorias Recebidas",
        value: "dar_aceite_mercadorias_recebidas",
      },
      {
        label: "Gerar Relatórios de Estoque",
        value: "gerar_relatorios_estoque",
      },
      {
        label: "Visualizar Históricos",
        value: "visualizar_historicos",
      },
    ],
  },
  {
    name: "Operador",
    modules: [
      {
        label: "Cadastrar Estoques",
        value: "cadastrar_estoques",
      },
      {
        label: "Cadastrar Parâmetros Gerais",
        value: "cadastrar_parametros_gerais",
      },
      {
        label: "Cadastrar Usuários",
        value: "cadastrar_usuarios",
      },
      {
        label: "Importar NFs de Qualquer Empresa",
        value: "importar_nfs_qualquer_empresa",
      },
      {
        label: "Comprar Mercadorias",
        value: "comprar_mercadorias",
      },
      {
        label: "Gerar Relatórios de Estoque",
        value: "gerar_relatorios_estoque",
      },
    ],
  },
  {
    name: "Estoquista",
    modules: [
      {
        label: "Cadastrar Fornecedores",
        value: "cadastrar_fornecedores",
      },
      {
        label: "Cadastrar Produtos",
        value: "cadastrar_produtos",
      },
      {
        label: "Importar NFs da Sua Empresa",
        value: "importar_nfs_sua_empresa",
      },
      {
        label: "Dar Entrada de Mercadorias",
        value: "dar_entrada_mercadorias",
      },
      {
        label: "Dar Saída de Mercadorias",
        value: "dar_saida_mercadorias",
      },
      {
        label: "Comprar Mercadorias",
        value: "comprar_mercadorias",
      },
      {
        label: "Fazer Inventários",
        value: "fazer_inventarios",
      },
      {
        label: "Fazer Ajustes de Estoque",
        value: "fazer_ajustes_estoque",
      },
      {
        label: "Gerar Relatórios de Estoque",
        value: "gerar_relatorios_estoque",
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
        label: "Fazer Inventários",
        value: "fazer_inventarios",
      },
      {
        label: "Fazer Ajustes de Estoque",
        value: "fazer_ajustes_estoque",
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
