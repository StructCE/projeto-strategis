"use client";
import { useSession } from "next-auth/react";
import { TableButtonComponent } from "~/components/tableButton";

export default function Home() {
  const session = useSession();

  function hasAccessToPage(link: string) {
    return session?.data?.user?.allowedPagesPath.includes(link);
  }

  return (
    <div className="flex w-full flex-col bg-fundo_branco">
      {session ? (
        <h1 className="mb-3 text-2xl font-medium sm:mb-6 sm:text-3xl">
          Bem vindo, {session.data?.user.name}.
        </h1>
      ) : (
        <></>
      )}
      <div className="flex w-full flex-col flex-wrap gap-6 sm:flex-row sm:gap-12">
        <div className="flex flex-col gap-6 sm:gap-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-normal sm:text-2xl">
              Configurações Gerais
            </h1>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Cadastro de Empresas"
                link_ref="/ConfiguracoesGerais/CadastroDeEmpresas"
                isAccessible={hasAccessToPage(
                  "/ConfiguracoesGerais/CadastroDeEmpresas",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Cadastro de Fornecedores"
                link_ref="/ConfiguracoesGerais/CadastroDeFornecedores"
                isAccessible={hasAccessToPage(
                  "/ConfiguracoesGerais/CadastroDeFornecedores",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Cadastro de Produtos"
                link_ref="/ConfiguracoesGerais/CadastroDeProdutos"
                isAccessible={hasAccessToPage(
                  "/ConfiguracoesGerais/CadastroDeProdutos",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Cadastro de Estoques"
                link_ref="/ConfiguracoesGerais/CadastroDeEstoques"
                isAccessible={hasAccessToPage(
                  "/ConfiguracoesGerais/CadastroDeEstoques",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Cadastro de Parâmetros Gerais"
                link_ref="/ConfiguracoesGerais/CadastroDeParametrosGerais"
                isAccessible={hasAccessToPage(
                  "/ConfiguracoesGerais/CadastroDeParametrosGerais",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-normal sm:text-2xl">
              Controle de Acesso
            </h1>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Cadastro de Usuários"
                link_ref="/ControleDeAcesso/CadastroDeUsuarios"
                isAccessible={hasAccessToPage(
                  "/ControleDeAcesso/CadastroDeUsuarios",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Cadastro de Perfis de Acesso"
                link_ref="/ControleDeAcesso/CadastroDePerfisDeAcesso"
                isAccessible={hasAccessToPage(
                  "/ControleDeAcesso/CadastroDePerfisDeAcesso",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-normal sm:text-2xl">
              Gestão de Estoque
            </h1>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Importação de Notas Fiscais"
                link_ref="/GestaoDeEstoque/ImportacaoDeNFs"
                isAccessible={hasAccessToPage(
                  "/GestaoDeEstoque/ImportacaoDeNFs",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Compra de Mercadorias"
                link_ref="/GestaoDeEstoque/CompraDeMercadorias"
                isAccessible={hasAccessToPage(
                  "/GestaoDeEstoque/CompraDeMercadorias",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Inventários de Estoque"
                link_ref="/GestaoDeEstoque/InventariosDeEstoque"
                isAccessible={hasAccessToPage(
                  "/GestaoDeEstoque/InventariosDeEstoque",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Ajustes de Estoque"
                link_ref="/GestaoDeEstoque/AjustesDeEstoque"
                isAccessible={hasAccessToPage(
                  "/GestaoDeEstoque/AjustesDeEstoque",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-normal sm:text-2xl">
              Requisição de Mercadorias
            </h1>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Requisições de Mercadorias"
                link_ref="/RequisicaoDeMercadoria/RequisicoesDeMercadorias"
                isAccessible={hasAccessToPage(
                  "/RequisicaoDeMercadoria/RequisicoesDeMercadorias",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Requisitar Mercadorias"
                link_ref="/RequisicaoDeMercadoria/RequisitarMercadorias"
                isAccessible={hasAccessToPage(
                  "/RequisicaoDeMercadoria/RequisitarMercadorias",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
            <TableButtonComponent className="justify-start pt-0 sm:pt-0">
              <TableButtonComponent.HomepageLink
                placeholder="Status de Requisições"
                link_ref="/RequisicaoDeMercadoria/StatusDeRequisicoes"
                isAccessible={hasAccessToPage(
                  "/RequisicaoDeMercadoria/StatusDeRequisicoes",
                )}
              ></TableButtonComponent.HomepageLink>
            </TableButtonComponent>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-normal sm:text-2xl">Relatórios</h1>
          <TableButtonComponent className="justify-start pt-0 sm:pt-0">
            <TableButtonComponent.HomepageLink
              placeholder="Avisos de Estoque"
              link_ref="/Relatorios/AvisosDeEstoque"
              isAccessible={hasAccessToPage("/Relatorios/AvisosDeEstoque")}
            ></TableButtonComponent.HomepageLink>
          </TableButtonComponent>
          <TableButtonComponent className="justify-start pt-0 sm:pt-0">
            <TableButtonComponent.HomepageLink
              placeholder="Histórico de Operações"
              link_ref="/Relatorios/HistoricoDeOperacoes"
              isAccessible={hasAccessToPage("/Relatorios/HistoricoDeOperacoes")}
            ></TableButtonComponent.HomepageLink>
          </TableButtonComponent>
          <TableButtonComponent className="justify-start pt-0 sm:pt-0">
            <TableButtonComponent.HomepageLink
              placeholder="Histórico de Pagamentos"
              link_ref="/Relatorios/HistoricoDePagamentos"
              isAccessible={hasAccessToPage(
                "/Relatorios/HistoricoDePagamentos",
              )}
            ></TableButtonComponent.HomepageLink>
          </TableButtonComponent>
          <TableButtonComponent className="justify-start pt-0 sm:pt-0">
            <TableButtonComponent.HomepageLink
              placeholder="Relatórios Personalizados"
              link_ref="/Relatorios/RelatoriosPersonalizados"
              isAccessible={hasAccessToPage(
                "/Relatorios/RelatoriosPersonalizados",
              )}
            ></TableButtonComponent.HomepageLink>
          </TableButtonComponent>
        </div>
      </div>
    </div>
  );
}
