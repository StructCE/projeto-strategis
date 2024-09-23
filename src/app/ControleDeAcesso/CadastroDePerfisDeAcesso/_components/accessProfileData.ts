export const modules: Module[] = [
  { value: "cadastrar_empresas", label: "Cadastrar Empresas" },
  { value: "cadastrar_fornecedores", label: "Cadastrar Fornecedores" },
  { value: "cadastrar_produtos", label: "Cadastrar Produtos" },
  { value: "cadastrar_estoques", label: "Cadastrar Estoques" },
  {
    value: "cadastrar_parametros_gerais",
    label: "Cadastrar Parâmetros Gerais",
  },
  { value: "cadastrar_usuarios", label: "Cadastrar Usuários" },
  { value: "cadastrar_perfis", label: "Cadastrar Perfis" },
  { value: "dar_permissoes_de_acesso", label: "Dar Permissões de Acesso" },
  {
    value: "importar_nfs_de_qualquer_empresa",
    label: "Importar NFs de Qualquer Empresa",
  },
  {
    value: "importar_nfs_da_sua_empresa",
    label: "Importar NFs da Sua Empresa",
  },
  { value: "dar_entrada_de_mercadorias", label: "Dar Entrada de Mercadorias" },
  { value: "dar_saida_de_mercadorias", label: "Dar Saída de Mercadorias" },
  { value: "comprar_mercadorias", label: "Comprar Mercadorias" },
  { value: "fazer_inventarios", label: "Fazer Inventários" },
  { value: "fazer_ajustes_de_estoque", label: "Fazer Ajustes de Estoque" },
  {
    value: "requisitar_mercadorias_do_estoque",
    label: "Requisitar Mercadorias do Estoque",
  },
  {
    value: "dar_aceite_de_mercadorias_recebidas",
    label: "Dar Aceite de Mercadorias Recebidas",
  },
  {
    value: "gerar_relatorios_de_estoque",
    label: "Gerar Relatórios de Estoque",
  },
  { value: "visualizar_historicos", label: "Visualizar Históricos" },
];

export type Module = {
  value: string;
  label: string;
};

export type Role = {
  name: string;
  modules: Module[];
};

export const roles: Role[] = [
  {
    name: "Administrador",
    modules: [
      { value: "cadastrar_empresas", label: "Cadastrar Empresas" },
      { value: "cadastrar_fornecedores", label: "Cadastrar Fornecedores" },
      { value: "cadastrar_produtos", label: "Cadastrar Produtos" },
      { value: "cadastrar_estoques", label: "Cadastrar Estoques" },
      {
        value: "cadastrar_parametros_gerais",
        label: "Cadastrar Parâmetros Gerais",
      },
      { value: "cadastrar_usuarios", label: "Cadastrar Usuários" },
      { value: "cadastrar_perfis", label: "Cadastrar Perfis" },
      { value: "dar_permissoes_de_acesso", label: "Dar Permissões de Acesso" },
      {
        value: "importar_nfs_de_qualquer_empresa",
        label: "Importar NFs de Qualquer Empresa",
      },
      {
        value: "importar_nfs_da_sua_empresa",
        label: "Importar NFs da Sua Empresa",
      },
      {
        value: "dar_entrada_de_mercadorias",
        label: "Dar Entrada de Mercadorias",
      },
      { value: "dar_saida_de_mercadorias", label: "Dar Saída de Mercadorias" },
      { value: "comprar_mercadorias", label: "Comprar Mercadorias" },
      { value: "fazer_inventarios", label: "Fazer Inventários" },
      { value: "fazer_ajustes_de_estoque", label: "Fazer Ajustes de Estoque" },
      {
        value: "requisitar_mercadorias_do_estoque",
        label: "Requisitar Mercadorias do Estoque",
      },
      {
        value: "dar_aceite_de_mercadorias_recebidas",
        label: "Dar Aceite de Mercadorias Recebidas",
      },
      {
        value: "gerar_relatorios_de_estoque",
        label: "Gerar Relatórios de Estoque",
      },
      { value: "visualizar_historicos", label: "Visualizar Históricos" },
    ],
  },
  {
    name: "Operador",
    modules: [
      { value: "cadastrar_usuarios", label: "Cadastrar Usuários" },
      {
        value: "importar_nfs_de_qualquer_empresa",
        label: "Importar NFs de Qualquer Empresa",
      },
      {
        value: "cadastrar_parametros_gerais",
        label: "Cadastrar Parâmetros Gerais",
      },
      {
        value: "gerar_relatorios_de_estoque",
        label: "Gerar Relatórios de Estoque",
      },
    ],
  },
  {
    name: "Estoquista",
    modules: [
      {
        value: "dar_entrada_de_mercadorias",
        label: "Dar Entrada de Mercadorias",
      },
      { value: "cadastrar_fornecedores", label: "Cadastrar Fornecedores" },
      {
        value: "gerar_relatorios_de_estoque",
        label: "Gerar Relatórios de Estoque",
      },
      { value: "dar_saida_de_mercadorias", label: "Dar Saída de Mercadorias" },
      { value: "fazer_inventarios", label: "Fazer Inventários" },
      { value: "fazer_ajustes_de_estoque", label: "Fazer Ajustes de Estoque" },
      {
        value: "importar_nfs_da_sua_empresa",
        label: "Importar NFs da Sua Empresa",
      },
    ],
  },
  {
    name: "Requisitante",
    modules: [
      {
        value: "requisitar_mercadorias_do_estoque",
        label: "Requisitar Mercadorias do Estoque",
      },
      {
        value: "dar_aceite_de_mercadorias_recebidas",
        label: "Dar Aceite de Mercadorias Recebidas",
      },
    ],
  },
  {
    name: "Personalizado 1",
    modules: [
      { value: "cadastrar_empresas", label: "Cadastrar Empresas" },
      { value: "cadastrar_fornecedores", label: "Cadastrar Fornecedores" },
      { value: "cadastrar_produtos", label: "Cadastrar Produtos" },
      { value: "cadastrar_estoques", label: "Cadastrar Estoques" },
      {
        value: "cadastrar_parametros_gerais",
        label: "Cadastrar Parâmetros Gerais",
      },
      { value: "cadastrar_usuarios", label: "Cadastrar Usuários" },
      { value: "cadastrar_perfis", label: "Cadastrar Perfis" },
    ],
  },
];
