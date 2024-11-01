#!/bin/bash

# Nome da controller vindo como argumento
CONTROLLER_NAME=$1
CONTROLLER_NAME_CAPITALIZED=$(echo "${CONTROLLER_NAME^}")

# Verifica se o nome da controller foi passado
if [ -z "$CONTROLLER_NAME" ]; then
  echo "Você precisa fornecer o nome da controller como argumento."
  exit 1
fi

# Caminhos das pastas
INTERFACE_DIR="./src/server/interfaces/$CONTROLLER_NAME"
REPOSITORY_DIR="./src/server/repositories/"
ROUTER_DIR="./src/server/api/routers/"

# Criação das pastas e arquivos
mkdir -p "$INTERFACE_DIR"
mkdir -p "$REPOSITORY_DIR"

# Adiciona conteúdo no arquivo repository interfaces
cat <<EOL > "$INTERFACE_DIR/$CONTROLLER_NAME.repository.interfaces.ts"
import z from "zod"

export const ${CONTROLLER_NAME}RepositorySchema = {

} 

export type ${CONTROLLER_NAME_CAPITALIZED}RepositoryInterfaces = {

}
EOL

# Adiciona conteúdo no arquivo route interfaces
cat <<EOL > "$INTERFACE_DIR/$CONTROLLER_NAME.route.interfaces.ts"
export type ${CONTROLLER_NAME_CAPITALIZED}RouteInterfaces = {

}
EOL

# Adiciona conteúdo no arquivo do repository
cat <<EOL > "$REPOSITORY_DIR/$CONTROLLER_NAME.repository.ts"
import { db } from "../db"

export const ${CONTROLLER_NAME}Repository = {
}
EOL

# Adiciona conteúdo no arquivo da rota
cat <<EOL > "$ROUTER_DIR/$CONTROLLER_NAME.ts"
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const ${CONTROLLER_NAME}Router = createTRPCRouter({
})
EOL

# Mensagem de sucesso
echo "Estrutura criada com sucesso para a controller: $CONTROLLER_NAME"
