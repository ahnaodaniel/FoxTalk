FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Expor porta 5000
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"] 