# Etapa 1: Build
FROM node:18-alpine

# Cria diretório e define como diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta usada pelo seu app
EXPOSE 8000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
