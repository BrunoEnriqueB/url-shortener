FROM node:22.11.0-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm i --verbose --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev:docker"]