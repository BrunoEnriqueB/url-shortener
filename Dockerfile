# Set the base image from Docker repository to build our app. In this case we want to use node image to run our node app
FROM node:22.11.0-alpine as base

WORKDIR /app

# Copiar apenas o package.json e package-lock.json (caso exista) para o cache de dependências
COPY package*.json ./

# Then, we need to install the dependencies inside the base image
RUN npm i --verbose --force

# Copiar o restante do código-fonte
COPY . .

# Expose port 3000, and start the app.
EXPOSE 3000

CMD ["npm", "run", "dev"]