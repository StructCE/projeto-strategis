# Projeto Strategis

Sistema Web que tem como funcionalidade a automação de partes do processo de registro e confirmação de produtos para o estoque de restaurantes/negócios.

## Stack

Para a construção desse site, está sendo utilizada a Stack T3 que possui tecnologias como [Next.js](https://nextjs.org), [Prisma](https://prisma.io), [NextAuth.js](https://next-auth.js.org) e [tRPC](https://trpc.io), juntamente com as bibliotecas externas [shadcn](https://ui.shadcn.com/docs), [lucide-icons](https://lucide.dev/icons/), [Cloudinary](https://next.cloudinary.dev/) e [Framer motion](https://www.framer.com/motion/).

## Avisos

> [!NOTE]
> Por favor, quando for realizar alguma issue crie uma branch com um nome identificável e seguindo a norma `feat/nome` para novos elementos e `fix/nome` para correções.

## Rodando o Projeto

```bash
pnpm i
pnpm prisma migrate reset -f # isso apaga todo conteúdo do banco de dados, cuidado para não apagar dados que não estão na seed
pnpm db:push
pnpm db:seed
pnpm dev
```
