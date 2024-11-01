# Projeto Strategis

Sistema Web que tem como funcionalidade a automação de partes do processo de registro e confirmação de produtos para o estoque de restaurantes/negócios.

## Stack

Para a construção desse site, foi utilizada a Stack T3 que possui tecnologias como [Next.js](https://nextjs.org), [Prisma](https://prisma.io), [NextAuth.js](https://next-auth.js.org) e [tRPC](https://trpc.io), juntamente com as bibliotecas externas [shadcn](https://ui.shadcn.com/docs) e [lucide-icons](https://lucide.dev/icons/).

## Rodando o Projeto

```bash
pnpm i
npx prisma db push --force-reset # isso apaga todo conteúdo do banco de dados, cuidado para não apagar dados que não estão na seed
pnpm db:push
pnpm tsx prisma/seed.ts
pnpm dev
```
